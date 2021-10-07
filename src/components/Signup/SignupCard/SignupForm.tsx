import { Flex, Button } from '@chakra-ui/react';
import { Input } from 'components/Forms';

export const SignupForm = () => {
  return (
    <form method="post">
      <Flex position="relative" direction="column" align="center">
        <Flex
          position="relative"
          direction="row"
          justifyContent="space-between"
          w="100%"
        >
          <Input label="first_name" name="firstName" type="text" isRequired />
          <Input label="last_name" name="lastName" type="text" isRequired />
        </Flex>
        <Input label="username" name="username" type="text" isRequired />
        <Input label="email" name="email" type="email" isRequired />
        <Input label="password" name="password" type="password" isRequired />
        <Button
          bg="green.500"
          w="50%"
          color="#FFFFFF"
          marginTop="20px"
          _hover={{ background: '#2A8C3C' }}
          o
        >
          Create my account!
        </Button>
      </Flex>
    </form>
  );
};
