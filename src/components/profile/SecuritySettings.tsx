import { useForm, SubmitHandler } from 'react-hook-form';

import { Text, Flex, Divider, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
import * as yup from 'yup';

interface UpdateEmailFormData {
  email: string;
}

interface UpdatePasswordFormData {
  password: string;
}

const updateEmailSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
});

const updatePasswordSchema = yup.object().shape({
  password: yup.string().required('Campo obrigatório'),
});

export const SecuritySettings = () => {
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: formStateEmail,
  } = useForm({
    resolver: yupResolver(updateEmailSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: formStatePassword,
  } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });
  return (
    <>
      <Text color="white" fontSize="3xl" mt={6} mb={1}>
        configurações de segurança
      </Text>
      <Divider />
      <Flex
        align="end"
        w="50%"
        as="form"
        p="30px 0 0"
        onSubmit={(data) => console.log(data)}
        noValidate
      >
        <Input
          label="trocar e-mail"
          type="text"
          error={formStateEmail.errors.email}
          {...registerEmail('email')}
        />

        <Button
          variant="outline"
          p="0 40px"
          ml={5}
          mb="12px"
          borderRadius="15px"
          colorScheme="telegram"
          spinnerPlacement="end"
        >
          trocar e-mail
        </Button>
      </Flex>
      <Flex
        align="end"
        w="50%"
        as="form"
        p="30px 0"
        onSubmit={(data) => console.log(data)}
        noValidate
      >
        <Input
          label="trocar senha"
          type="password"
          error={formStatePassword.errors.password}
          {...registerPassword('password')}
        />

        <Button
          variant="outline"
          p="0 40px"
          ml={5}
          mb="12px"
          borderRadius="15px"
          colorScheme="telegram"
          spinnerPlacement="end"
        >
          trocar senha
        </Button>
      </Flex>
    </>
  );
};
