import { useState } from 'react';
import {
  DragDropContext,
  resetServerContext,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { MdAdd } from 'react-icons/md';

import { Box, HStack, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react';
import wavesImg from 'assets/img/waves2.svg';
import {
  Sidebar,
  BoardColumn,
  TaskDetailsModal,
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
        column: 'Tarefas',
        deadline: '2021-10-23',
        createdAt: '2021-10-22',
        effort: 4,
      },
      {
        id: '378c3087-022f-43f6-9549-cd40b06165ed',
        assignedFor: 'jacobodecal',
        title: 'Construção da tela de login',
        column: 'Tarefas',
        deadline: '2021-10-26',
        createdAt: '2021-10-23',
        effort: 2,
      },
      {
        id: '22b8623b-58db-4400-b3fd-6d7ba196acfa',
        assignedFor: 'aguenaro',
        title: 'Mock API',
        column: 'Tarefas',
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
        column: 'Em execução',
        deadline: '2021-10-30',
        createdAt: '2021-10-12',
        effort: 6,
      },
    ],
  },
];

const BoardDetails: NextPage = () => {
  resetServerContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);
  const [boardColumns, setBoardColumns] =
    useState<Column[]>(mockedBoardColumns);

  function openDetailsModal(task: Task) {
    setSelectedTask(task);
    onOpen();
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
        isOpen={isOpen}
        onClose={onClose}
        selectedTask={selectedTask}
      />
      <Flex h="calc(100% - 53px)" position="relative">
        <Sidebar boardName="board name" />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided: DroppableProvided) => (
              <Flex
                align="start"
                justify="between"
                p="20px 30px 0"
                spacing={7}
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
                  />
                ))}
                {provided.placeholder}
                <Flex
                  align="center"
                  bg="blue.800"
                  borderRadius="30px"
                  w="300px"
                  p={4}
                >
                  <Icon as={MdAdd} color="white" mr={2} />
                  <Text
                    color="white"
                    fontSize="sm"
                    isTruncated
                    onClick={() =>
                      setBoardColumns([
                        ...boardColumns,
                        {
                          title: `Nova coluna ${new Date().getMilliseconds()}`,
                          tasks: [],
                        },
                      ])
                    }
                  >
                    adicionar coluna
                  </Text>
                </Flex>
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
        <Box position="absolute" bottom="0" zIndex="-1">
          <Image src={wavesImg} alt="Ondas" />
        </Box>
      </Flex>
      {/* <Footer /> */}
    </Box>
  );
};

export default BoardDetails;
