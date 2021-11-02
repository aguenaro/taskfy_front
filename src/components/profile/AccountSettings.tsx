import { useForm, SubmitHandler } from 'react-hook-form';

import { Text, Flex, Divider, Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
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
        onSubmit={(data) => console.log(data)}
        noValidate
      >
        <Input
          label="trocar username"
          type="text"
          error={formState.errors.username}
          {...register('username')}
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
