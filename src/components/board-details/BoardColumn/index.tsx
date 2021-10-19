import React, { memo } from 'react';
import {
  Draggable,
  Droppable,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { MdAdd } from 'react-icons/md';

import { Box, Flex, Text, Stack, Icon } from '@chakra-ui/react';
import { Task } from 'interfaces/Task';

import { ColumnCard } from './ColumnCard';

interface BoardColumnProps {
  title: string;
  index: number;
  tasks: Task[];
  onClick: (task: Task) => void;
}

const BoardColumnComponent = ({
  title,
  index,
  tasks,
  onClick,
}: BoardColumnProps) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided: DraggableProvided) => (
        <Box
          bg="blue.800"
          borderRadius="30px"
          w="300px"
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
            <Text fontSize="md" color="white">
              {title}
            </Text>
          </Flex>
          <Droppable droppableId={title} type="task">
            {(provided: DroppableProvided, snapshot) => (
              <Flex
                direction="column"
                spacing={3}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <ColumnCard
                    key={task.id}
                    index={index}
                    task={task}
                    onClick={() => onClick(task)}
                  />
                ))}
                <Draggable
                  draggableId={`button-add-task-${title}`}
                  index={tasks.length}
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
  );
};

export const BoardColumn = memo(BoardColumnComponent);
