import { useForm, SubmitHandler } from 'react-hook-form';

import { Flex, Button, Box, Text, Divider, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Input } from 'components/Forms';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
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
  firstName: yup.string().required('Campo obrigatório'),
  lastName: yup.string().required('Campo obrigatório'),
  username: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas diferentes'),
});

export const SignupForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createAccountSchema),
  });
  const { push } = useRouter();
  const { registerUser } = useAuth();
  const toast = useToast();

  const handleCreateAccount: SubmitHandler<CreateAccountFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
      };

      await registerUser(payload);

      toast({
        title: 'Conta criada com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      push('/boards');
      toast({
        title: 'Bem-vindo ao Taskfy!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 400) {
        toast({
          title: 'Dados incorretos',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Houve algum problema. Tente novamente mais tarde.',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
      }
    }
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
        Crie sua conta agora
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
              label="nome"
              type="text"
              isRequired
              error={formState.errors.firstName}
              {...register('firstName')}
            />
          </Box>
          <Box w="48%">
            <Input
              label="sobrenome"
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
              label="senha"
              type="password"
              isRequired
              error={formState.errors.password}
              {...register('password')}
            />
          </Box>
          <Box w="48%">
            <Input
              label="confirmar senha"
              type="password"
              isRequired
              error={formState.errors.passwordConfirmation}
              {...register('passwordConfirmation')}
            />
          </Box>
        </Flex>
        <Button
          type="submit"
          colorScheme="green"
          w="50%"
          m="20px auto"
          isLoading={formState.isSubmitting}
        >
          criar minha conta!
        </Button>
      </Flex>
    </Box>
  );
};
