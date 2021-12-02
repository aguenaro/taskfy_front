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

interface AddColumnModalProps extends ModalProps {
  refetchBoard: () => void;
}

interface CreateColumnFormData {
  name: string;
}

const createColumnSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
});

export const AddColumnModal = ({
  isOpen,
  onClose,
  refetchBoard,
}: AddColumnModalProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createColumnSchema),
  });
  const toast = useToast();
  const router = useRouter();
  const { boardId } = router.query;

  const handleCreateColumn: SubmitHandler<CreateColumnFormData> = async (
    values
  ) => {
    const payload = {
      name: values.name,
    };

    await api.post<IResponse<Column>>(`/boards/${boardId}/lists`, payload);

    toast({
      title: 'Coluna criada com sucesso!',
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
        <ModalHeader color="white">Adicionar nova coluna</ModalHeader>

        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        <ModalBody mb={4}>
          <Flex
            direction="column"
            as="form"
            onSubmit={handleSubmit(handleCreateColumn)}
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
              loadingText="Criando"
              spinnerPlacement="end"
            >
              Criar coluna
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
