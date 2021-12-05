import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, Box, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { Input } from 'components/Forms';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import * as yup from 'yup';

interface SigninFormData {
  emailOrUsername: string;
  password: string;
}

const signinSchema = yup.object().shape({
  emailOrUsername: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

export const SigninForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signinSchema),
  });
  const toast = useToast();
  const { login } = useAuth();
  const { push } = useRouter();

  const handleSignin: SubmitHandler<SigninFormData> = async (values) => {
    try {
      const payload = {
        emailOrUsername: values.emailOrUsername,
        password: values.password,
      };

      await login(payload);

      toast({
        title: 'Bem-vindo ao Taskfy!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });

      push('/boards');
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 400) {
        toast({
          title: 'As credenciais informadas estão incorretas',
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
    <Box as="form" onSubmit={handleSubmit(handleSignin)} noValidate>
      <Input
        label="Email ou usuário"
        type="text"
        isRequired
        error={formState.errors.emailOrUsername}
        {...register('emailOrUsername')}
      />
      <Input
        label="senha"
        type="password"
        isRequired
        error={formState.errors.password}
        {...register('password')}
      />
      <Button
        type="submit"
        colorScheme="green"
        w="50%"
        m="20px 0 0"
        isLoading={formState.isSubmitting}
      >
        entre
      </Button>
    </Box>
  );
};
