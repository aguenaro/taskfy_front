import { useForm, SubmitHandler } from 'react-hook-form';

import { Flex, Button, Box, Text, Divider } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
import * as yup from 'yup';

interface CreateAccountFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const createAccountSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords should be equal'),
});

export const SignupForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createAccountSchema),
  });

  const handleCreateAccount: SubmitHandler<CreateAccountFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(values);
  };

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
      <Flex
        w="100%"
        h="500px"
        mt={5}
        as="form"
        direction="column"
        justify="space-evenly"
        onSubmit={handleSubmit(handleCreateAccount)}
        noValidate
      >
        <Flex align="stretch" justify="space-between">
          <Box w="48%">
            <Input
              label="first_name"
              type="text"
              isRequired
              error={formState.errors.firstName}
              {...register('firstName')}
            />
          </Box>
          <Box w="48%">
            <Input
              label="last_name"
              type="text"
              isRequired
              error={formState.errors.lastName}
              {...register('lastName')}
            />
          </Box>
        </Flex>
        <Input
          label="username"
          type="text"
          isRequired
          error={formState.errors.username}
          {...register('username')}
        />
        <Input
          label="email"
          type="email"
          isRequired
          error={formState.errors.email}
          {...register('email')}
        />
        <Flex align="stretch" justify="space-between">
          <Box w="48%">
            <Input
              label="password"
              type="password"
              isRequired
              error={formState.errors.password}
              {...register('password')}
            />
          </Box>
          <Box w="48%">
            <Input
              label="password confirmation"
              type="password"
              isRequired
              error={formState.errors.passwordConfirmation}
              {...register('passwordConfirmation')}
            />
          </Box>
        </Flex>
        <Button
          type="submit"
          bg="green.500"
          w="50%"
          color="#FFFFFF"
          m="20px auto"
          _hover={{ background: '#2A8C3C' }}
          isLoading={formState.isSubmitting}
        >
          Create my account!
        </Button>
      </Flex>
    </Box>
  );
};
