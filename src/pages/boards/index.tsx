import { MdAdd } from 'react-icons/md';

import { Box, Text, Flex, Icon, HStack, useDisclosure } from '@chakra-ui/react';
import wavesImg from 'assets/img/waves.svg';
import { BoardCard, CreateBoardModal } from 'components/boards';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { NextPage } from 'next';
import Image from 'next/image';

const Boards: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box overflowX="hidden">
      <Header />
      <CreateBoardModal isOpen={isOpen} onClose={onClose} />
      <Box w="100vw" h="90vh" mt="40px" position="relative">
        <Box w="75%" m="auto">
          <HStack spacing={7}>
            <Text color="white" fontSize="2xl">
              personal boards
            </Text>
            <Icon as={MdAdd} color="white" w={7} h={7} onClick={onOpen} />
          </HStack>
          <HStack spacing={8} my={7}>
            <BoardCard title="board 1" bgColor="black" />
            <BoardCard title="board 2" bgColor="purple.900" />
          </HStack>
          <HStack spacing={7}>
            <Text color="white" fontSize="2xl">
              your company boards
            </Text>
            <Icon as={MdAdd} color="white" w={7} h={7} onClick={onOpen} />
          </HStack>
          <HStack spacing={8} my={7}>
            <BoardCard title="board 1" bgColor="green.600" />
            <BoardCard title="board 2" bgColor="blue.800" />
            <BoardCard title="board 3" bgColor="red.900" />
          </HStack>
        </Box>
        <Box position="absolute" bottom="-5px" w="100vw">
          <Image src={wavesImg} alt="Ondas" />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Boards;
