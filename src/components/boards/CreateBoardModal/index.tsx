import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
import { Board } from 'interfaces/Board';
import { IResponse } from 'interfaces/IResponse';
import api from 'services/api';
import * as yup from 'yup';
interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  addNewBoard: (newBoard: Board) => void;
}

interface CreateBoardFormData {
  boardName: string;
}

const createBoardSchema = yup.object().shape({
  boardName: yup.string().required('Campo obrigatório'),
});

export const CreateBoardModal = ({
  isOpen,
  onClose,
  addNewBoard,
}: CreateBoardModalProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createBoardSchema),
  });
  const toast = useToast();

  const handleCreateBoard: SubmitHandler<CreateBoardFormData> = async (
    values
  ) => {
    const payload = {
      boardName: values.boardName,
      color: `#${Math.random().toString(16).substr(-6)}`.toLowerCase(),
    };
    const { data: response } = await api.post<IResponse<Board>>(
      '/boards',
      payload
    );

    addNewBoard(response.data);

    toast({
      title: 'Quadro criado com sucesso!',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="blue"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white">Criar quadro</ModalHeader>
        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        <ModalBody>
          <Flex
            direction="column"
            as="form"
            onSubmit={handleSubmit(handleCreateBoard)}
            noValidate
          >
            <Input
              isRequired
              label="Nome"
              type="text"
              error={formState.errors.boardName}
              {...register('boardName')}
            />

            <Button
              type="submit"
              variant="solid"
              margin="10px auto"
              isLoading={formState.isSubmitting}
              loadingText="Criando"
              spinnerPlacement="end"
            >
              Criar quadro
            </Button>
          </Flex>
        </ModalBody>

        {/* <ModalFooter margin="auto"></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
