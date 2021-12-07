import { useState } from 'react';

import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { User } from 'interfaces/User';
import api from 'services/api';

interface UsersTableProps {
  users: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const { user } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState('');
  async function handleRemoveUserFromOrganization(userId: string) {
    setSelectedUserId(userId);
    await api.delete(`/organizations/${userId}`);
  }

  return (
    <Table size="sm" variant="unstyled">
      <Thead>
        <Tr>
          <Th color="white">Nome</Th>
          <Th color="white">Username</Th>
          <Th color="white">Email</Th>
          <Th color="white">Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((member) => (
          <Tr key={member.id}>
            <Td color="white">
              {member.firstName} {member.lastName}
            </Td>
            <Td color="white">{member.username}</Td>
            <Td color="white">{member.email}</Td>
            <Td>
              {user?.id !== member.id && (
                <Button
                  size="xs"
                  colorScheme="red"
                  isLoading={selectedUserId === member.id}
                  onClick={() => handleRemoveUserFromOrganization(member.id)}
                >
                  Remover
                </Button>
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
