import { Text, Flex } from '@chakra-ui/react';

interface EmptyBoardProps {
  openModal: () => void;
}

export const EmptyBoard = ({ openModal }: EmptyBoardProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      borderRadius="20px"
      borderColor="white"
      borderStyle="dashed"
      borderWidth="1px"
      bg="transparent"
      w="30%"
      h="130px"
      m="10px"
      cursor="pointer"
      onClick={openModal}
    >
      <Text color="white">Criar quadro</Text>
    </Flex>
  );
};
