import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
import { Column } from 'interfaces/Column';
import { IResponse } from 'interfaces/IResponse';
import { ModalProps } from 'interfaces/ModalProps';
import { useRouter } from 'next/router';
import api from 'services/api';
import * as yup from 'yup';

interface EditBoardColumnModalProps extends ModalProps {
  column: Column;
  refetchBoard: () => void;
}

interface EditColumnFormData {
  name: string;
}

const editColumnSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
});

export const EditBoardColumnModal = ({
  isOpen,
  onClose,
  column,
  refetchBoard,
}: EditBoardColumnModalProps) => {
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(editColumnSchema),
  });
  const toast = useToast();
  const router = useRouter();
  const { boardId } = router.query;

  useEffect(() => {
    if (column.name) setValue('name', column.name);
  }, [column.name, setValue]);

  const handleEditColumn: SubmitHandler<EditColumnFormData> = async (
    values
  ) => {
    const payload = {
      name: values.name,
    };

    await api.put<IResponse<string>>(
      `/boards/${boardId}/lists/${column.id}`,
      payload
    );

    toast({
      title: 'Coluna editada com sucesso!',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    refetchBoard();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="blue"
      isCentered
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white">Editar coluna</ModalHeader>

        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        <ModalBody mb={4}>
          <Flex
            direction="column"
            as="form"
            onSubmit={handleSubmit(handleEditColumn)}
            noValidate
          >
            <Input
              isRequired
              label="Nome"
              type="text"
              error={formState.errors.name}
              {...register('name')}
            />

            <Button
              type="submit"
              variant="solid"
              margin="10px auto"
              isLoading={formState.isSubmitting}
              loadingText="Salvando"
              spinnerPlacement="end"
            >
              Salvar coluna
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
