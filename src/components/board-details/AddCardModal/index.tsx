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
import { Input, Select } from 'components/Forms';
import { ModalProps } from 'interfaces/ModalProps';
import * as yup from 'yup';

interface AddCardModalProps extends ModalProps {}

interface CreateCardFormData {
  boardName: string;
}

const createCardSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  deadline: yup.date().required('Campo obrigatório'),
});

export const AddCardModal = ({ isOpen, onClose }: AddCardModalProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createCardSchema),
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
        <ModalHeader color="white">Adicionar nova tarefa</ModalHeader>

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
            <Input
              isRequired
              label="Prazo"
              type="date"
              error={formState.errors.deadline}
              {...register('deadline')}
            />
            <Select
              isRequired
              label="Alocado para"
              error={formState.errors.assignedFor}
              options={[
                { value: 1, label: 'eduardothsantos' },
                { value: 2, label: 'aguenaro' },
              ]}
              {...register('assignedFor')}
            />
            <Select
              isRequired
              label="Status"
              error={formState.errors.column}
              options={[
                { value: 1, label: 'Tarefas' },
                { value: 2, label: 'Em execução' },
              ]}
              {...register('column')}
            />
            <Input
              isRequired
              type="number"
              label="Pontos de esforço"
              error={formState.errors.effort}
              {...register('effort')}
            />

            <Button
              variant="solid"
              margin="10px auto"
              isLoading={formState.isSubmitting}
              loadingText="Criando"
              spinnerPlacement="end"
            >
              Criar tarefa
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
