import { Flex } from '@chakra-ui/react';
import { BoardCard } from 'components/boards';
import { Board } from 'interfaces/Board';

interface BoardsGridProps {
  boards: Board[];
}

export const BoardsGrid = ({ boards }: BoardsGridProps) => {
  return (
    <Flex align="center" flexWrap="wrap" my={7}>
      {boards.map((board) => (
        <BoardCard
          key={board.id}
          id={board.id}
          title={board.name}
          bgColor={board.color}
          isManager={false}
        />
      ))}
    </Flex>
  );
};
