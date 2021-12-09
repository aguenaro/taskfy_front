import { useState } from 'react';
import {
  DragDropContext,
  resetServerContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { MdAdd } from 'react-icons/md';

import { Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
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
import { Column } from 'interfaces/Column';
import { Task } from 'interfaces/Task';
import { NextPage } from 'next';
import Image from 'next/image';

const mockedBoardColumns = [
  {
    title: 'Tarefas',
    tasks: [
      {
        id: '4f96cd03-aa6a-425c-aa9c-3f00c6d8d5d2',
        assignedFor: 'eduardothsantos',
        title: 'Correção na landing page',
        deadline: '2021-10-23',
        createdAt: '2021-10-22',
        effort: 4,
      },
      {
        id: '378c3087-022f-43f6-9549-cd40b06165ed',
        assignedFor: 'jacobodecal',
        title: 'Construção da tela de login',
        deadline: '2021-10-26',
        createdAt: '2021-10-23',
        effort: 2,
      },
      {
        id: '22b8623b-58db-4400-b3fd-6d7ba196acfa',
        assignedFor: 'aguenaro',
        title: 'Mock API',
        deadline: '2021-10-28',
        createdAt: '2021-10-17',
        effort: 2,
      },
    ],
  },
  {
    title: 'Em execução',
    tasks: [
      {
        id: '3b4c97a7-148b-4a1e-9a69-7f8d01655934',
        assignedFor: 'eduardothsantos',
        title: 'Não consigo usar o chat',
        deadline: '2021-10-30',
        createdAt: '2021-10-12',
        effort: 6,
      },
    ],
  },
  {
    title: 'Em revisão',
    tasks: [],
  },
  {
    title: 'Finalizado',
    tasks: [
      {
        id: 'cacd3745-cbb1-4ab0-84fd-ca1d5e7ecc55',
        assignedFor: 'eduardothsantos',
        title: 'Prototipagem',
        deadline: '2021-10-20',
        createdAt: '2021-10-10',
        effort: 6,
      },
    ],
  },
];

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
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [boardColumns, setBoardColumns] =
    useState<Column[]>(mockedBoardColumns);

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
        boardColumns.find((column) => column.title === draggableId) ??
          ({} as Column)
      );

      setBoardColumns([...newColumnsOrder]);

      return;
    }

    const start = boardColumns.find((board) => droppableId === board.title);
    const finish = boardColumns.find(
      (board) => destination.droppableId === board.title
    );

    if (!start || !finish) return;

    if (start === finish) {
      const newColumnTasks = Array.from(start.tasks);

      newColumnTasks.splice(index, 1);

      newColumnTasks.splice(
        destination.index,
        0,
        start.tasks.find((task) => task.title === draggableId) ?? ({} as Task)
      );

      const startIndex = boardColumns
        .map((column) => column.title)
        .indexOf(droppableId);

      const newBoard = Array.from(boardColumns);

      newBoard[startIndex].tasks = newColumnTasks;

      setBoardColumns([...newBoard]);
    } else {
      if (finish.title === 'Finalizado') return;

      const startColumnTasks = Array.from(start.tasks);

      startColumnTasks.splice(index, 1);

      const finishColumnTasks = Array.from(finish.tasks);

      finishColumnTasks.splice(
        destination.index,
        0,
        start.tasks.find((task) => task.title === draggableId) ?? ({} as Task)
      );

      const startIndex = boardColumns
        .map((column) => column.title)
        .indexOf(droppableId);

      const finishIndex = boardColumns
        .map((column) => column.title)
        .indexOf(destination.droppableId);

      const newBoard = Array.from(boardColumns);

      newBoard[startIndex].tasks = startColumnTasks;
      newBoard[finishIndex].tasks = finishColumnTasks;

      setBoardColumns([...newBoard]);
    }
  }

  return (
    <Box overflow="hidden" h="100vh">
      <Header />
      <TaskDetailsModal
        isOpen={isOpenDetails}
        onClose={onCloseDetails}
        selectedTask={selectedTask}
      />
      <BurndownChartModal isOpen={isOpenGraph} onClose={onCloseGraph} />
      <AddCardModal isOpen={isOpenAddCard} onClose={onCloseAddCard} />
      <AddColumnModal isOpen={isOpenAddColumn} onClose={onCloseAddColumn} />
      <Flex h="calc(100% - 53px)" position="relative">
        <Sidebar boardName="board name" openGraph={onOpenGraph} />
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
                    key={column.title}
                    title={column.title}
                    index={index}
                    tasks={column.tasks}
                    onClick={(task: Task) => openDetailsModal(task)}
                    addCard={() => onOpenAddCard()}
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
        <Box w="100%" position="absolute" bottom="-20px" zIndex="-1">
          <Image layout="responsive" src={wavesImg} alt="Ondas" />
        </Box>
      </Flex>
      {/* <Footer /> */}
    </Box>
  );
};

export default BoardDetails;
