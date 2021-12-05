import React, { memo, useState } from 'react';
import {
  Draggable,
  Droppable,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { MdAdd } from 'react-icons/md';

import { Box, Flex, Text, Icon, useDisclosure } from '@chakra-ui/react';
import { Column } from 'interfaces/Column';
import { Task } from 'interfaces/Task';

import { ColumnCard } from './ColumnCard';
import { EditBoardColumnModal } from './EditBoardColumnModal';

interface BoardColumnProps {
  index: number;
  column: Column;
  onClick: (task: Task) => void;
  addCard: () => void;
  refetchBoard: () => void;
}

const BoardColumnComponent = ({
  index,
  column,
  onClick,
  addCard,
  refetchBoard,
}: BoardColumnProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedColumn, setSelectedColumn] = useState<Column>({} as Column);

  function handleEditColumn(column: Column) {
    setSelectedColumn(column);
    onOpen();
  }

  return (
    <>
      <EditBoardColumnModal
        isOpen={isOpen}
        onClose={onClose}
        column={selectedColumn}
        refetchBoard={refetchBoard}
      />
      <Draggable draggableId={column.name} index={index}>
        {(provided: DraggableProvided) => (
          <Box
            bg="blue.800"
            borderRadius="30px"
            minW="300px"
            p={6}
            mr={7}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Flex
              align="center"
              justify="center"
              mb={5}
              {...provided.dragHandleProps}
            >
              <Text
                fontSize="md"
                color="white"
                onDoubleClick={() => handleEditColumn(column)}
              >
                {column.name}
              </Text>
            </Flex>
            <Droppable droppableId={column.name} type="task">
              {(provided: DroppableProvided, snapshot) => (
                <Flex
                  direction="column"
                  spacing={3}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {column.tasks.map((task, index) => (
                    <ColumnCard
                      key={task.id}
                      column={column.name}
                      index={index}
                      task={task}
                      onClick={() => onClick(task)}
                    />
                  ))}
                  <Draggable
                    draggableId={`button-add-task-${column.name}`}
                    index={column.tasks.length}
                    isDragDisabled
                  >
                    {(provided: DraggableProvided) => (
                      <Flex
                        align="center"
                        bg="gray.900"
                        p={3}
                        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
                        borderRadius={5}
                        cursor="pointer"
                        onClick={addCard}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Icon as={MdAdd} color="white" mr={2} />
                        <Text color="white" fontSize="sm">
                          adicionar tarefa
                        </Text>
                      </Flex>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </Flex>
              )}
            </Droppable>
          </Box>
        )}
      </Draggable>
    </>
  );
};

export const BoardColumn = memo(BoardColumnComponent);
