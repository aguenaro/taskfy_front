import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

export const UsersTable = () => {
  function handleRemoveUserFromOrganization() {
    return;
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
        <Tr>
          <Td color="white">Rodrigo Aguena</Td>
          <Td color="white">aguenaro</Td>
          <Td color="white">rdorigo@usp.br</Td>
          <Td>
            <Button
              size="xs"
              colorScheme="red"
              onClick={handleRemoveUserFromOrganization}
            >
              Remover
            </Button>
          </Td>
        </Tr>
        <Tr>
          <Td color="white">Rodrigo Aguena</Td>
          <Td color="white">aguenaro</Td>
          <Td color="white">rdorigo@usp.br</Td>
          <Td>
            <Button size="xs" colorScheme="red">
              Remover
            </Button>
          </Td>
        </Tr>
        <Tr>
          <Td color="white">Rodrigo Aguena</Td>
          <Td color="white">aguenaro</Td>
          <Td color="white">rdorigo@usp.br</Td>
          <Td>
            <Button size="xs" colorScheme="red">
              Remover
            </Button>
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};
