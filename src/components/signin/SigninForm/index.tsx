import { useForm, SubmitHandler } from 'react-hook-form';

import { Button, Box } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
import { useRouter } from 'next/router';
import * as yup from 'yup';

interface SigninFormData {
  email: string;
  password: string;
}

const signinSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});

export const SigninForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signinSchema),
  });
  const { push } = useRouter();

  const handleSignin: SubmitHandler<SigninFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(values);

    push('/boards');
  };

  return (
    <Box as="form" onSubmit={handleSubmit(handleSignin)} noValidate>
      <Input
        label="email"
        type="email"
        isRequired
        error={formState.errors.email}
        {...register('email')}
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
