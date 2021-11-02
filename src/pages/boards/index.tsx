import { useState } from 'react';
import { MdAdd } from 'react-icons/md';

import { Box, Text, Icon, HStack, useDisclosure, Flex } from '@chakra-ui/react';
import wavesImg from 'assets/img/waves.svg';
import { BoardCard, CreateBoardModal, EmptyBoard } from 'components/boards';
import { Header } from 'components/Header';
import { Board } from 'interfaces/Board';
import mockedBoards from 'mock/boards.json';
import { NextPage } from 'next';
import Image from 'next/image';

const Boards: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [boards, setBoards] = useState<Board[]>(mockedBoards);
  return (
    <Box overflow="hidden">
      <Header />
      <CreateBoardModal
        isOpen={isOpen}
        onClose={onClose}
        addNewBoard={(board: Board) => setBoards((state) => [...state, board])}
      />
      <Box w="100vw" h="90vh" mt="40px" position="relative">
        <Box w="75%" m="auto">
          <HStack spacing={7}>
            <Text color="white" fontSize="2xl">
              seus quadros
            </Text>
            <Icon as={MdAdd} color="white" w={7} h={7} onClick={onOpen} />
          </HStack>
          <Flex align="center" flexWrap="wrap" spacing={8} my={7}>
            {boards.map((board, index) => (
              <BoardCard
                key={index}
                title={board.title}
                bgColor={board.bgColor}
              />
            ))}
            <EmptyBoard openModal={onOpen} />
          </Flex>
        </Box>
        <Box position="absolute" bottom="-5px" w="100vw">
          <Image src={wavesImg} alt="Ondas" />
        </Box>
      </Box>
    </Box>
  );
};

export default Boards;
