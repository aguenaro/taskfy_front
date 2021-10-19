import { memo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Flex, Avatar, Text } from '@chakra-ui/react';
import { formatDistance, parseISO, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Task } from 'interfaces/Task';

interface ColumnCardProps {
  task: Task;
  index: number;
  onClick: (task: Task) => void;
}

export const ColumnCardComponent = ({
  task,
  index,
  onClick,
}: ColumnCardProps) => {
  function checkFinishDate(date: string) {
    const differenceBetweenDates = differenceInDays(parseISO(date), new Date());

    if (differenceBetweenDates > 0) {
      return 'white';
    } else if (differenceBetweenDates === 0) {
      return 'yellow.300';
    } else {
      return 'red.300';
    }
  }

  return (
    <Draggable draggableId={task.title} index={index}>
      {(provided, snapshot) => (
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
          // onClick={onClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Text color="white" fontSize="sm" isTruncated>
            {task.title}
          </Text>
          <Flex align="center">
            <Avatar
              name={task.assignedFor}
              src={`https://avatars.githubusercontent.com/${task.assignedFor}`}
              w={5}
              h={5}
              mr={2}
            />
            <Text color={checkFinishDate(task.deadline)} fontSize="sm">
              {formatDistance(parseISO(task.deadline), new Date(), {
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
