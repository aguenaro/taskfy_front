import { RiVipCrownFill } from 'react-icons/ri';

import { Text, Flex, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
interface BoardCardProps {
  title: string;
  bgColor: string;
  isManager: boolean;
}

export const BoardCard = ({ bgColor, title, isManager }: BoardCardProps) => {
  const router = useRouter();
  return (
    <Flex
      align="end"
      position="relative"
      borderRadius="20px"
      bgGradient={`linear(to-b, ${bgColor}, gray.900)`}
      w="30%"
      h="130px"
      m="10px"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 10px"
      cursor="pointer"
      onClick={() => router.push('/boards/1')}
    >
      <Flex align="center" w="100%" h="40%" borderRadius="0 0 20px 20px" p={1}>
        <Text color="white" ml={3} fontWeight="bold">
          {title}
        </Text>
      </Flex>
      {isManager && (
        <Icon
          as={RiVipCrownFill}
          w={3}
          h={3}
          color="yellow"
          position="absolute"
          top={4}
          right={5}
        />
      )}
    </Flex>
  );
};
