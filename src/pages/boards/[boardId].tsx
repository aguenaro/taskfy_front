import { useState, useEffect, useCallback } from 'react';
import {
  DragDropContext,
  resetServerContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { MdAdd } from 'react-icons/md';

import {
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import wavesImg from 'assets/img/waves2.svg';
import {
  Sidebar,
  BoardColumn,
  TaskDetailsModal,
  BurndownChartModal,
  AddCardModal,
  AddColumnModal,
} from 'components/board-details';
import { Header } from 'components/Header';
import { useAuth } from 'hooks/useAuth';
import { Board } from 'interfaces/Board';
import { Column } from 'interfaces/Column';
import { IResponse } from 'interfaces/IResponse';
import { Task } from 'interfaces/Task';
import { User } from 'interfaces/User';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import api from 'services/api';

interface BoardDetailsResponse extends Board {
  lists: Column[];
  manager: User[];
  users: User[];
}

const BoardDetails: NextPage = () => {
  resetServerContext();
  const {
    isOpen: isOpenDetails,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure();
  const {
    isOpen: isOpenGraph,
    onOpen: onOpenGraph,
    onClose: onCloseGraph,
  } = useDisclosure();
  const {
    isOpen: isOpenAddCard,
    onOpen: onOpenAddCard,
    onClose: onCloseAddCard,
  } = useDisclosure();
  const {
    isOpen: isOpenAddColumn,
    onOpen: onOpenAddColumn,
    onClose: onCloseAddColumn,
  } = useDisclosure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [boardColumns, setBoardColumns] = useState<Column[]>([]);
  const [boardDetails, setBoardDetails] = useState<BoardDetailsResponse>(
    {} as BoardDetailsResponse
  );
  const router = useRouter();

  const { boardId } = router.query;

  const getBoardDetails = useCallback(async () => {
    const { data: response } = await api.get<IResponse<BoardDetailsResponse>>(
      `/boards/${boardId}`
    );
    setBoardDetails(response.data);
    setBoardColumns(response.data.lists);
    setLoading(false);
  }, [boardId]);

  useEffect(() => {
    if (boardId) getBoardDetails();
  }, [boardId, getBoardDetails]);

  function openDetailsModal(task: Task) {
    setSelectedTask(task);
    onOpenDetails();
  }

  function onDragEnd(result: DropResult) {
    const {
      draggableId,
      source: { droppableId, index },
      destination,
      type,
    } = result;

    if (!destination) return;

    if (destination.droppableId === droppableId && destination.index === index)
      return;

    if (type === 'column') {
      const newColumnsOrder = Array.from(boardColumns);
      newColumnsOrder.splice(index, 1);
      newColumnsOrder.splice(
        destination.index,
        0,
        boardColumns.find((column) => column.name === draggableId) ??
          ({} as Column)
      );

      setBoardColumns([...newColumnsOrder]);

      return;
    }

    const start = boardColumns.find((board) => droppableId === board.name);
    const finish = boardColumns.find(
      (board) => destination.droppableId === board.name
    );

    if (!start || !finish) return;

    if (start === finish) {
      const newColumnTasks = Array.from(start.tasks);

      newColumnTasks.splice(index, 1);

      newColumnTasks.splice(
        destination.index,
        0,
        start.tasks.find((task) => task.name === draggableId) ?? ({} as Task)
      );

      const startIndex = boardColumns
        .map((column) => column.name)
        .indexOf(droppableId);

      const newBoard = Array.from(boardColumns);

      newBoard[startIndex].tasks = newColumnTasks;

      setBoardColumns([...newBoard]);
    } else {
      if (finish.name === 'Finalizado' && !user?.isAdmin) return;

      const startColumnTasks = Array.from(start.tasks);

      startColumnTasks.splice(index, 1);

      const finishColumnTasks = Array.from(finish.tasks);

      finishColumnTasks.splice(
        destination.index,
        0,
        start.tasks.find((task) => task.name === draggableId) ?? ({} as Task)
      );

      const startIndex = boardColumns
        .map((column) => column.name)
        .indexOf(droppableId);

      const finishIndex = boardColumns
        .map((column) => column.name)
        .indexOf(destination.droppableId);

      const newBoard = Array.from(boardColumns);

      newBoard[startIndex].tasks = startColumnTasks;
      newBoard[finishIndex].tasks = finishColumnTasks;

      setBoardColumns([...newBoard]);
    }
  }

  const isManager = !!boardDetails.manager?.filter(
    (manager) => manager.id === user?.id
  ).length;

  return (
    <Box overflow="hidden" h="100vh">
      <Header />
      <TaskDetailsModal
        isOpen={isOpenDetails}
        onClose={onCloseDetails}
        selectedTask={selectedTask}
        membersList={boardDetails.users ?? []}
        columns={boardDetails.lists ?? []}
        refetchBoard={getBoardDetails}
      />
      <BurndownChartModal isOpen={isOpenGraph} onClose={onCloseGraph} />
      <AddCardModal
        isOpen={isOpenAddCard}
        onClose={onCloseAddCard}
        members={boardDetails.users ?? []}
        columns={boardDetails.lists ?? []}
        refetchBoard={getBoardDetails}
      />
      <AddColumnModal
        isOpen={isOpenAddColumn}
        onClose={onCloseAddColumn}
        refetchBoard={getBoardDetails}
      />
      <Flex h="calc(100% - 53px)" position="relative">
        <Sidebar
          isManager={isManager}
          membersList={boardDetails.users ?? []}
          boardId={boardDetails.id}
          boardName={boardDetails.name}
          openGraph={onOpenGraph}
        />
        {loading && (
          <Spinner
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            m="5% auto"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.700"
            size="lg"
          />
        )}
        {!loading && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {(provided: DroppableProvided) => (
                <Flex
                  id="board-columns"
                  align="start"
                  justify="space-between"
                  p="20px 30px 0"
                  spacing={7}
                  overflowX="auto"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {boardColumns.map((column, index) => (
                    <BoardColumn
                      key={column.name}
                      index={index}
                      column={column}
                      onClick={(task: Task) => openDetailsModal(task)}
                      addCard={() => onOpenAddCard()}
                      refetchBoard={getBoardDetails}
                    />
                  ))}
                  {provided.placeholder}
                  <Flex
                    align="center"
                    justify="center"
                    bg="blue.800"
                    borderRadius="30px"
                    minW="300px"
                    p={4}
                    onClick={onOpenAddColumn}
                  >
                    <Icon as={MdAdd} color="white" mr={2} />
                    <Text color="white" fontSize="sm" isTruncated>
                      adicionar coluna
                    </Text>
                  </Flex>
                </Flex>
              )}
            </Droppable>
          </DragDropContext>
        )}
        <Box position="absolute" bottom="0" zIndex="-1">
          <Image src={wavesImg} alt="Ondas" />
        </Box>
      </Flex>
      {/* <Footer /> */}
    </Box>
  );
};

export default BoardDetails;
