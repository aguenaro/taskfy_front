import { FaGithub, FaGoogle, FaApple } from 'react-icons/fa';

import { Flex, Icon, Box, Text } from '@chakra-ui/react';

export const SigninOAuth = () => {
  return (
    <Box>
      <Text fontSize="xl" color="white" textAlign="center" mb={5}>
        entre com
      </Text>
      <Flex align="center" justify="space-around" w="100%" h="100%" p="0 50px">
        <Icon as={FaGithub} color="white" w="60px" h="60px" />
        <Icon as={FaGoogle} color="white" w="60px" h="60px" />
        <Icon as={FaApple} color="white" w="60px" h="60px" />
      </Flex>
    </Box>
  );
};
