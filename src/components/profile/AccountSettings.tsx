import { useForm, SubmitHandler } from 'react-hook-form';

import { Text, Flex, Divider, Button, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
import { useAuth } from 'hooks/useAuth';
import { IResponse } from 'interfaces/IResponse';
import { User } from 'interfaces/User';
import api from 'services/api';
import * as yup from 'yup';

interface UpdateUsernameFormData {
  username: string;
}

const updateUsernameSchema = yup.object().shape({
  username: yup.string().required('Campo obrigatório'),
});

export const AccountSettings = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(updateUsernameSchema),
  });
  const { user, updateUser } = useAuth();
  const toast = useToast();

  const handleUpdateUser: SubmitHandler<UpdateUsernameFormData> = async (
    values
  ) => {
    const payload = {
      username: values.username,
      email: user.email,
    };
    const { data: response } = await api.patch<IResponse<User>>(
      '/users/update',
      payload
    );

    updateUser(response.data);

    toast({
      title: 'Dados atualizados com sucesso!',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });
  };

  return (
    <>
      <Text color="white" fontSize="3xl" mb={1}>
        configurações da conta
      </Text>
      <Divider />
      <Flex
        align="end"
        w="50%"
        as="form"
        p="30px 0"
        onSubmit={handleSubmit(handleUpdateUser)}
        noValidate
      >
        <Input
          label="trocar username"
          type="text"
          defaultValue={user?.username}
          error={formState.errors.username}
          {...register('username')}
        />

        <Button
          type="submit"
          variant="outline"
          p="0 40px"
          ml={5}
          mb="12px"
          borderRadius="15px"
          colorScheme="telegram"
          spinnerPlacement="end"
          isLoading={formState.isSubmitting}
        >
          trocar username
        </Button>
      </Flex>
      <Button
        variant="outline"
        p="0 30px"
        borderRadius="15px"
        colorScheme="red"
        spinnerPlacement="end"
      >
        excluir conta
      </Button>
    </>
  );
};
