import React, { RefObject } from 'react';
import { MdAdd } from 'react-icons/md';

import { Box, Flex, Text, Stack, Icon } from '@chakra-ui/react';
import { Task } from 'interfaces/Task';

import { ColumnCard } from './ColumnCard';

interface BoardColumnProps {
  title: string;
  icon: React.ReactNode;
  tasks: Task[];
  boardRef: RefObject<HTMLDivElement>;
}

export const BoardColumn = ({
  title,
  icon,
  tasks,
  boardRef,
}: BoardColumnProps) => {
  return (
    <Box bg="blue.800" borderRadius="30px" w="300px" p={6}>
      <Flex align="center" justify="center" mb={5}>
        {icon}
        <Text fontSize="md" color="white">
          {title}
        </Text>
      </Flex>
      <Stack spacing={3}>
        {tasks.map((task, index) => (
          <ColumnCard key={index} task={task} ref={boardRef} />
        ))}
        <Flex
          align="center"
          bg="gray.900"
          p={3}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          borderRadius={5}
          cursor="pointer"
        >
          <Icon as={MdAdd} color="white" mr={2} />
          <Text color="white" fontSize="sm">
            add card
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};
