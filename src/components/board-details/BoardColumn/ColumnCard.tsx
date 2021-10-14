import { ForwardRefRenderFunction } from 'react';

import { Flex, Avatar, Text, forwardRef } from '@chakra-ui/react';
import { formatDistance, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import { Task } from 'interfaces/Task';

const MotionCardContainer = motion(Flex);

interface ColumnCardProps {
  task: Task;
}

const ColumnCardComponent: ForwardRefRenderFunction<
  HTMLDivElement,
  ColumnCardProps
> = ({ task }, ref) => {
  return (
    <MotionCardContainer
      direction="column"
      justify="space-between"
      bg="gray.900"
      h="75px"
      p={3}
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      borderRadius={5}
      cursor="grab"
      drag
      dragConstraints={{ top: 0, bottom: 0, right: 0, left: 0 }}
      dragElastic={1}
      _onDrap={{ zIndex: '5' }}
    >
      <Text color="white" fontSize="sm" isTruncated>
        {task.title}
      </Text>
      <Flex align="center">
        <Avatar
          name={task.author}
          src={`https://avatars.githubusercontent.com/${task.author}`}
          w={5}
          h={5}
          mr={2}
        />
        <Text color="white" fontSize="sm">
          {formatDistance(parseISO(task.createdAt), new Date(), {
            addSuffix: true,
          })}
        </Text>
      </Flex>
    </MotionCardContainer>
  );
};

export const ColumnCard = forwardRef(ColumnCardComponent);
