import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface BoardCardProps {
  title: string;
  bgColor: string;
}

export const BoardCard = ({ bgColor, title }: BoardCardProps) => {
  const router = useRouter();
  return (
    <Box
      borderRadius="20px"
      bg={bgColor}
      p={5}
      w="270px"
      h="130px"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 10px"
      cursor="pointer"
      onClick={() => router.push('/boards/1')}
    >
      <Text color="white">{title}</Text>
    </Box>
  );
};
