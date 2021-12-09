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
import { Select } from 'components/Forms';
import { IResponse } from 'interfaces/IResponse';
import { ModalProps } from 'interfaces/ModalProps';
import { Task } from 'interfaces/Task';
import { User } from 'interfaces/User';
import { useRouter } from 'next/router';
import api from 'services/api';
import * as yup from 'yup';

interface AddMemberModalProps extends ModalProps {
  members: User[];
  organizationUsers: User[];
  refetchBoard: () => void;
}

interface AddMemberFormData {
  memberId: string;
}

const addMemberSchema = yup.object().shape({
  memberId: yup.string().required('Campo obrigatório'),
});

export const AddMemberModal = ({
  isOpen,
  onClose,
  members,
  organizationUsers,
  refetchBoard,
}: AddMemberModalProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(addMemberSchema),
  });

  const toast = useToast();
  const router = useRouter();
  const { boardId } = router.query;

  const handleAddMember: SubmitHandler<AddMemberFormData> = async (values) => {
    await api.post<IResponse<Task>>(
      `/boards/${boardId}/user/${values.memberId}`,
      {}
    );

    toast({
      title: 'Membro adicionado com sucesso!',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    refetchBoard();
    onClose();
  };

  const membersListId = members.map((member) => member.id);

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
        <ModalHeader color="white">Adicionar novo membro</ModalHeader>

        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        <ModalBody mb={4}>
          <Flex
            direction="column"
            as="form"
            onSubmit={handleSubmit(handleAddMember)}
            noValidate
          >
            <Select
              isRequired
              label="Novo membro"
              error={formState.errors.memberId}
              options={organizationUsers
                .filter((user) => !membersListId.includes(user.id))
                .map((user) => {
                  return {
                    value: user.id,
                    label: `${user.firstName} ${user.lastName}`,
                  };
                })}
              {...register('memberId')}
            />

            <Button
              type="submit"
              variant="solid"
              margin="10px auto"
              isLoading={formState.isSubmitting}
            >
              Adicionar
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
