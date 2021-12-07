import { MdPersonAdd } from 'react-icons/md';

import {
  Box,
  Text,
  Flex,
  Stack,
  Avatar,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { IResponse } from 'interfaces/IResponse';
import { User } from 'interfaces/User';
import { useRouter } from 'next/router';
import api from 'services/api';

interface MembersListProps {
  members: User[];
  isManager: boolean;
  openModal: () => void;
  refetchBoard: () => void;
}

export const MembersList = ({
  members,
  isManager,
  openModal,
  refetchBoard,
}: MembersListProps) => {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const { boardId } = router.query;

  async function handleRemoveMember(userId: string) {
    await api.delete<IResponse<void>>(`/boards/${boardId}/user/${userId}`, {});

    toast({
      title: 'Membro removido com sucesso!',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    refetchBoard();
  }

  return (
    <Box>
      <Text color="white" fontSize="sm" mb={3}>
        membros
      </Text>
      <Stack spacing={3}>
        {members.map((member) => (
          <Flex
            key={member.username}
            align="center"
            justify="space-between"
            w="100%"
          >
            <Flex align="center">
              <Avatar
                name={`${member.firstName} ${member.lastName}`}
                w={6}
                h={6}
                mr={1}
              />
              <Text color="white" fontSize="x-small" ml={1}>
                {member.username}
              </Text>
            </Flex>
            {member.id !== user?.id && (
              <Text
                color="red"
                fontSize="x-small"
                ml={1}
                onClick={() => handleRemoveMember(member.id)}
                cursor="pointer"
              >
                Remover
              </Text>
            )}
          </Flex>
        ))}
        {isManager && (
          <Flex
            cursor="pointer"
            align="center"
            justify="center"
            onClick={openModal}
          >
            <Icon as={MdPersonAdd} color="white" />
            <Text fontSize="smaller" color="white" ml={2}>
              adicionar membro
            </Text>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};
