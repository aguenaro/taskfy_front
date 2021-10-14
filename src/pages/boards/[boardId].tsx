import { useRef } from 'react';
import { GoGitPullRequest } from 'react-icons/go';
import { MdAdd } from 'react-icons/md';
import { VscIssues } from 'react-icons/vsc';

import { Box, HStack, Flex, Icon, Text } from '@chakra-ui/react';
import wavesImg from 'assets/img/waves2.svg';
import { Sidebar, BoardColumn } from 'components/board-details';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { NextPage } from 'next';
import Image from 'next/image';

const boardColumns = [
  {
    title: 'Pull Requests',
    icon: <Icon as={GoGitPullRequest} color="white" w={5} h={5} mr={2} />,
    tasks: [
      {
        author: 'eduardothsantos',
        title: 'PR #33 - landing page',
        createdAt: '2021-10-01',
      },
      {
        author: 'jacobodecal',
        title: 'PR #34 - fixing style from home',
        createdAt: '2021-10-06',
      },
      {
        author: 'aguenaro',
        title: 'PR #35 - mock api',
        createdAt: '2021-10-10',
      },
    ],
  },
  {
    title: 'Issues',
    icon: <Icon as={VscIssues} color="white" w={5} h={5} mr={2} />,
    tasks: [
      {
        author: 'eduardothsantos',
        title: "can't use chat",
        createdAt: '2021-10-12 12:30:00',
      },
    ],
  },
];

const BoardDetails: NextPage = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  return (
    <Box overflowX="hidden">
      <Header />
      <Flex w="100vw" h="90vh" position="relative">
        <Sidebar boardName="board name" />
        <HStack
          spacing={7}
          align="start"
          p="20px 30px 0"
          overflowX="auto"
          ref={boardRef}
        >
          {boardColumns.map((column, item) => (
            <BoardColumn
              key={item}
              title={column.title}
              icon={column.icon}
              tasks={column.tasks}
              boardRef={boardRef}
            />
          ))}
          <Flex
            align="center"
            bg="blue.800"
            borderRadius="30px"
            w="300px"
            p={4}
          >
            <Icon as={MdAdd} color="white" mr={2} />
            <Text color="white" fontSize="sm" isTruncated>
              add column
            </Text>
          </Flex>
        </HStack>
        <Box position="absolute" bottom="-5px" zIndex="-1">
          <Image src={wavesImg} alt="Ondas" />
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
};

export default BoardDetails;
