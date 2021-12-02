import { Flex } from '@chakra-ui/react';
import { BoardCard } from 'components/boards';

export const BoardsGrid = () => {
  return (
    <Flex align="center" flexWrap="wrap" my={7}>
      <BoardCard
        id="1"
        title="Quadro 1"
        bgColor="lightBlue"
        isManager={false}
      />
      <BoardCard
        id="1"
        title="Quadro 2"
        bgColor="lightBlue"
        isManager={false}
      />
      <BoardCard
        id="1"
        title="Quadro 3"
        bgColor="lightBlue"
        isManager={false}
      />
    </Flex>
  );
};
