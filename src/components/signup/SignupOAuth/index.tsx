import { FaGithub, FaGoogle, FaApple } from 'react-icons/fa';

import { Flex, Icon, Box, Text, Divider } from '@chakra-ui/react';

export const SignupOAuth = () => {
  return (
    <Box
      w="40%"
      maxW="725px"
      maxH="629px"
      bg="blue.1000"
      p="20px 30px"
      borderRadius="50px"
    >
      <Text fontSize="xl" color="white" textAlign="center" mb={5}>
        Create account using
      </Text>
      <Divider />
      <Box h="520px">
        <Flex
          align="center"
          justify="space-around"
          w="100%"
          h="100%"
          p="0 75px"
        >
          <Icon as={FaGithub} color="white" w="80px" h="80px" />
          <Icon as={FaGoogle} color="white" w="80px" h="80px" />
          <Icon as={FaApple} color="white" w="80px" h="80px" />
        </Flex>
      </Box>
    </Box>
  );
};
