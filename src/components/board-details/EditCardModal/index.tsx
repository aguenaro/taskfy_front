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
import { Input, Select } from 'components/Forms';
import { format, parseISO } from 'date-fns';
import { Column } from 'interfaces/Column';
import { IResponse } from 'interfaces/IResponse';
import { ModalProps } from 'interfaces/ModalProps';
import { Task } from 'interfaces/Task';
import { User } from 'interfaces/User';
import { useRouter } from 'next/router';
import api from 'services/api';
import * as yup from 'yup';

interface EditCardModalProps extends ModalProps {
  members: User[];
  columns: Column[];
  refetchBoard: () => void;
  selectedTask?: Task;
}

interface EditCardFormData {
  name: string;
  dueDate: Date;
  stressPoints: number;
  taskAssignedId: string;
  listId: string;
}

const editCardSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  dueDate: yup.date().required('Campo obrigatório'),
  stressPoints: yup.number().min(0).required('Campo obrigatório'),
  taskAssignedId: yup.string().required('Campo obrigatório'),
  listId: yup.string().required('Campo obrigatório'),
});

export const EditCardModal = ({
  isOpen,
  onClose,
  columns,
  members,
  refetchBoard,
  selectedTask,
}: EditCardModalProps) => {
  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(editCardSchema),
  });

  const toast = useToast();
  const router = useRouter();
  const { boardId } = router.query;

  useEffect(() => {
    if (isOpen && selectedTask?.id) {
      setValue('name', selectedTask.name);
      setValue('dueDate', format(parseISO(selectedTask.dueDate), 'yyyy-MM-dd'));
      setValue('stressPoints', selectedTask.stressPoints);
      setValue('taskAssignedId', selectedTask.taskAssignedId);
      setValue('listId', selectedTask.listId);
    }
  }, [isOpen, selectedTask, setValue]);

  const handleEditTask: SubmitHandler<EditCardFormData> = async (values) => {
    if (selectedTask?.id) {
      const payload = {
        name: values.name,
        dueDate: format(values.dueDate, 'yyyy-MM-dd'),
        stressPoints: values.stressPoints,
        taskAssignedId: values.taskAssignedId,
      };

      await api.put<IResponse<Task>>(
        `/boards/${boardId}/lists/${values.listId}/tasks/${selectedTask.id}`,
        payload
      );

      toast({
        title: 'Tarefa atualizada com sucesso!',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      refetchBoard();
      onClose();
    }
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
        <ModalHeader color="white">Editar tarefa</ModalHeader>

        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        <ModalBody mb={4}>
          <Flex
            direction="column"
            as="form"
            onSubmit={handleSubmit(handleEditTask)}
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
              {...register('dueDate', { valueAsDate: false })}
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
              loadingText="Salvando"
              spinnerPlacement="end"
            >
              Salvar tarefa
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
