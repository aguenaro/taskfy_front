import { MdEdit } from 'react-icons/md';
import { VscGraphLine } from 'react-icons/vsc';

import {
  Box,
  Flex,
  Divider,
  Icon,
  Text,
  Button,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { User } from 'interfaces/User';
import { useRouter } from 'next/router';
import api from 'services/api';

import { MembersList } from './MembersList';

interface SidebarProps {
  boardName: string;
  boardId: string;
  openGraph: () => void;
  isManager: boolean;
  membersList: User[];
}

export const Sidebar = ({
  boardName,
  openGraph,
  boardId,
  isManager,
  membersList,
}: SidebarProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  async function onLeave() {
    await api.delete(`/boards/${boardId}/user/${user?.id}`);
    toast({
      title: 'Membro removido com sucesso!',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    router.push('/boards');
  }

  async function onDelete() {
    await api.delete(`/boards/${boardId}`);
    toast({
      title: 'Quadro deletado com sucesso!',
      status: 'success',
      position: 'top-right',
      isClosable: true,
    });

    router.push('/boards');
  }

  return (
    <Box
      minW="20vw"
      h="100%"
      p="10px 0"
      bg="rgba(2, 9, 37, 0.75)"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
    >
      <Flex justify="space-between" align="center" m="0 20px">
        <Text fontSize="lg" color="white">
          {boardName}
        </Text>
        <Icon cursor="pointer" as={MdEdit} color="white" w={5} h={5} />
      </Flex>
      <Divider mt={3} />
      <Flex
        h="calc(90% - 50px)"
        direction="column"
        justify="space-between"
        m="10px 20px 0"
      >
        <MembersList members={membersList} isManager={isManager} />
        {/* <Stack spacing={4}>
          <Box>
            <Text color="white" fontSize="small">
              Início
            </Text>
            <Text color="white" fontSize="small" fontWeight="bold">
              {format(parseISO('2021-08-01'), 'dd/MM/yyyy')}
            </Text>
          </Box>
          <Box>
            <Text color="white" fontSize="small">
              Fim
            </Text>
            <Text color="white" fontSize="small" fontWeight="bold">
              {format(parseISO('2021-12-01'), 'dd/MM/yyyy')}
            </Text>
          </Box>
        </Stack> */}
        <Flex
          align="center"
          justify="center"
          cursor="pointer"
          onClick={openGraph}
        >
          <Icon cursor="pointer" as={VscGraphLine} color="white" w={5} h={5} />
          <Text color="white" fontSize="small" ml={2}>
            Visualizar gráfico
          </Text>
        </Flex>
        <Stack spacing={4} m="0 20px">
          {!isManager && (
            <Button
              w="100%"
              variant="outline"
              colorScheme="red"
              borderRadius="20px"
              size="sm"
              onClick={onLeave}
            >
              sair
            </Button>
          )}
          {isManager && (
            <Button
              w="100%"
              variant="outline"
              colorScheme="red"
              borderRadius="20px"
              size="sm"
              onClick={onDelete}
            >
              excluir
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};
