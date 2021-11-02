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
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
import { ModalProps } from 'interfaces/ModalProps';
import * as yup from 'yup';

interface AddColumnModalProps extends ModalProps {}

interface CreateColumnFormData {
  boardName: string;
}

const createColumnSchema = yup.object().shape({
  boardName: yup.string().required('Board name is required'),
});

export const AddColumnModal = ({ isOpen, onClose }: AddColumnModalProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createColumnSchema),
  });

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
            onSubmit={(data) => console.log(data)}
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
