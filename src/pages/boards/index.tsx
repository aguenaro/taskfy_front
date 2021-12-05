import { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import {
  Box,
  Text,
  Icon,
  HStack,
  useDisclosure,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import wavesImg from 'assets/img/waves.svg';
import { BoardCard, CreateBoardModal, EmptyBoard } from 'components/boards';
import { Header } from 'components/Header';
import { Board } from 'interfaces/Board';
import { IResponse } from 'interfaces/IResponse';
import { NextPage } from 'next';
import Image from 'next/image';
import api from 'services/api';

interface BoardState {
  boards: {
    asUser: Board[];
    asManager: Board[];
  };
}

const Boards: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState<Board[]>([]);
  const [boardsAsManager, setBoardsAsManager] = useState<string[]>([]);

  useEffect(() => {
    const getBoards = async () => {
      const { data: response } = await api.get<IResponse<BoardState>>(
        '/boards'
      );
      setBoards(response.data.boards.asUser);
      setBoardsAsManager(
        response.data.boards.asManager.map((board) => board.id)
      );
      setLoading(false);
    };
    getBoards();
  }, []);

  return (
    <Box overflow="hidden">
      <Header />
      <CreateBoardModal
        isOpen={isOpen}
        onClose={onClose}
        addNewBoard={(board: Board) => {
          setBoards((state) => [...state, board]);
          setBoardsAsManager((state) => [...state, board.id]);
        }}
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
            {loading && (
              <Spinner
                m="5% auto"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.700"
                size="lg"
              />
            )}
            {boards.map((board, index) => (
              <BoardCard
                key={index}
                id={board.id}
                title={board.name}
                bgColor={board.color}
                isManager={boardsAsManager.includes(board.id)}
              />
            ))}
            {!loading && <EmptyBoard openModal={onOpen} />}
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
