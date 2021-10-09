import { Flex, Button, Box, Text, Divider } from '@chakra-ui/react';
import { Input } from 'components/Forms';

export const SignupForm = () => {
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
        Create your account now
      </Text>
      <Divider />
      <Box w="100%" as="form" textAlign="center" mt={5}>
        <Flex align="center" justify="space-between">
          <Box w="48%">
            <Input label="first_name" name="firstName" type="text" isRequired />
          </Box>
          <Box w="48%">
            <Input label="last_name" name="lastName" type="text" isRequired />
          </Box>
        </Flex>
        <Input label="username" name="username" type="text" isRequired />
        <Input label="email" name="email" type="email" isRequired />
        <Input label="password" name="password" type="password" isRequired />
        <Button
          bg="green.500"
          w="50%"
          color="#FFFFFF"
          m="20px auto"
          _hover={{ background: '#2A8C3C' }}
        >
          Create my account!
        </Button>
      </Box>
    </Box>
  );
};
