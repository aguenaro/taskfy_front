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
import { Input, Select } from 'components/Forms';
import { format } from 'date-fns';
import { Column } from 'interfaces/Column';
import { IResponse } from 'interfaces/IResponse';
import { ModalProps } from 'interfaces/ModalProps';
import { Task } from 'interfaces/Task';
import { User } from 'interfaces/User';
import { useRouter } from 'next/router';
import api from 'services/api';
import * as yup from 'yup';

interface AddCardModalProps extends ModalProps {
  members: User[];
  columns: Column[];
}

interface CreateCardFormData {
  name: string;
  dueDate: Date;
  stressPoints: number;
  taskAssignedId: string;
  listId: string;
}

const createCardSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  dueDate: yup.date().required('Campo obrigatório'),
  stressPoints: yup.number().min(0).required('Campo obrigatório'),
  taskAssignedId: yup.string().required('Campo obrigatório'),
  listId: yup.string().required('Campo obrigatório'),
});

export const AddCardModal = ({
  isOpen,
  onClose,
  columns,
  members,
}: AddCardModalProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createCardSchema),
  });

  const toast = useToast();
  const router = useRouter();
  const { boardId } = router.query;

  const handleCreateTask: SubmitHandler<CreateCardFormData> = async (
    values
  ) => {
    const payload = {
      name: values.name,
      dueDate: format(values.dueDate, 'yyyy-MM-dd'),
      stressPoints: values.stressPoints,
    };

    await api.post<IResponse<Task>>(
      `/boards/${boardId}/lists/${values.listId}/tasks`,
      payload
    );

    toast({
      title: 'Tarefa criada com sucesso!',
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
            onSubmit={handleSubmit(handleCreateTask)}
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
              error={formState.errors.dueDate}
              {...register('dueDate')}
            />
            <Select
              isRequired
              label="Alocado para"
              error={formState.errors.taskAssignedId}
              options={members.map((member) => {
                return {
                  value: member.id,
                  label: `${member.firstName} ${member.lastName}`,
                };
              })}
              {...register('taskAssignedId')}
            />
            <Select
              isRequired
              label="Status"
              error={formState.errors.listId}
              options={columns.map((column) => {
                return { value: column.id, label: column.name };
              })}
              {...register('listId')}
            />
            <Input
              isRequired
              type="number"
              label="Pontos de esforço"
              error={formState.errors.stressPoints}
              {...register('stressPoints')}
            />

            <Button
              type="submit"
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
