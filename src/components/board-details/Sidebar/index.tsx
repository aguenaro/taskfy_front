import { useEffect, useState } from 'react';
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
  Editable,
  EditableInput,
  EditablePreview,
  useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { IResponse } from 'interfaces/IResponse';
import { User } from 'interfaces/User';
import { useRouter } from 'next/router';
import api from 'services/api';

import { AddMemberModal } from '../AddMemberModal';
import { EditableControls } from './EditableControls';
import { MembersList } from './MembersList';

interface SidebarProps {
  boardName: string;
  boardId: string;
  openGraph: () => void;
  isManager: boolean;
  membersList: User[];
  refetchBoard: () => void;
}

export const Sidebar = ({
  boardName,
  openGraph,
  boardId,
  isManager,
  membersList,
  refetchBoard,
}: SidebarProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editableBoardName, setEditableBoardName] = useState('');
  const [organizationUsers, setOrganizationUsers] = useState<User[]>([]);

  useEffect(() => {
    if (boardName) setEditableBoardName(boardName);
  }, [boardName]);

  useEffect(() => {
    const getOrganizationMembers = async () => {
      const { data: response } = await api.get<IResponse<User[]>>(
        '/organizations/users'
      );

      setOrganizationUsers(response.data);
    };

    getOrganizationMembers();
  }, []);

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

  async function handleEditBoardName() {
    const payload = {
      name: editableBoardName,
    };

    await api.patch(`/boards/${boardId}`, payload);
  }

  return (
    <>
      <AddMemberModal
        isOpen={isOpen}
        onClose={onClose}
        members={membersList}
        organizationUsers={organizationUsers}
        refetchBoard={refetchBoard}
      />
      <Box
        minW="20vw"
        h="100%"
        p="10px 0"
        bg="rgba(2, 9, 37, 0.75)"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <Flex
          justify="space-between"
          align="center"
          m="0 20px"
          position="relative"
        >
          {/* <Text fontSize="lg" color="white">
          {boardName}
        </Text> */}
          <Editable
            value={editableBoardName}
            onChange={(text) => setEditableBoardName(text)}
            onBlur={handleEditBoardName}
            isPreviewFocusable={false}
            isDisabled={!isManager}
          >
            <EditablePreview color="white" />
            <EditableInput color="white" id="boardName" />
            {isManager && <EditableControls />}
          </Editable>
        </Flex>
        <Divider mt={3} />
        <Flex
          h="calc(90% - 50px)"
          direction="column"
          justify="space-between"
          m="10px 20px 0"
        >
          <MembersList
            members={membersList}
            isManager={isManager}
            openModal={onOpen}
            refetchBoard={refetchBoard}
          />
          {(isManager || user?.isAdmin) && (
            <Flex
              align="center"
              justify="center"
              cursor="pointer"
              onClick={openGraph}
            >
              <Icon
                cursor="pointer"
                as={VscGraphLine}
                color="white"
                w={5}
                h={5}
              />
              <Text color="white" fontSize="small" ml={2}>
                Visualizar gráfico
              </Text>
            </Flex>
          )}
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
    </>
  );
};
