import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Flex, Avatar, Text } from '@chakra-ui/react';
import { formatDistance, parseISO, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Task } from 'interfaces/Task';

interface ColumnCardProps {
  task: Task;
  column: string;
  index: number;
  onClick: (task: Task) => void;
}

export const ColumnCardComponent = ({
  task,
  column,
  index,
  onClick,
}: ColumnCardProps) => {
  function checkFinishDate(date: string) {
    const differenceBetweenDates = differenceInDays(parseISO(date), new Date());

    if (column === 'Finalizado') {
      return 'green.300';
    } else if (differenceBetweenDates > 0) {
      return 'white';
    } else if (differenceBetweenDates === 0) {
      return 'yellow.300';
    } else {
      return 'red.300';
    }
  }

  return (
    <Draggable draggableId={task.name} index={index}>
      {(provided) => (
        <Flex
          direction="column"
          justify="space-between"
          bg="gray.900"
          h="75px"
          p={3}
          mb={3}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          borderRadius={5}
          cursor="grab"
          onDoubleClick={() => onClick(task)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Text color="white" fontSize="sm" isTruncated>
            {task.name}
          </Text>
          <Flex align="center">
            <Avatar name={task.taskAssignedId} w={5} h={5} mr={2} />
            <Text color={checkFinishDate(task.dueDate)} fontSize="sm">
              {formatDistance(parseISO(task.dueDate), new Date(), {
                locale: ptBR,
                addSuffix: true,
              })}
            </Text>
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
};

export const ColumnCard = memo(ColumnCardComponent);
