import { FiEdit } from 'react-icons/fi';

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Flex,
  Divider,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { Column } from 'interfaces/Column';
import { Task } from 'interfaces/Task';
import { User } from 'interfaces/User';

import { EditCardModal } from '../EditCardModal';

interface TaskDetailsModalProps {
  isOpen: boolean;
  membersList: User[];
  isManager: boolean;
  selectedTask?: Task;
  columns: Column[];
  refetchBoard: () => void;
  onClose: () => void;
}

export const TaskDetailsModal = ({
  isOpen,
  onClose,
  isManager,
  selectedTask,
  columns,
  membersList,
  refetchBoard,
}: TaskDetailsModalProps) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const user = membersList.find((member) => member.id === selectedTask?.userId);

  function handleEditTask() {
    onOpenEdit();
    onClose();
  }

  return (
    <>
      <EditCardModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        members={membersList}
        selectedTask={selectedTask}
        refetchBoard={refetchBoard}
        columns={columns}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        variant="blue"
        isCentered
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="white">
            <Flex align="center">
              <Text>{selectedTask?.name}</Text>
              {isManager && (
                <Icon
                  as={FiEdit}
                  color="white"
                  w={4}
                  h={4}
                  ml={3}
                  cursor="pointer"
                  onClick={handleEditTask}
                />
              )}
            </Flex>
          </ModalHeader>

          <ModalCloseButton color="white" _focus={{ border: 'none' }} />
          {selectedTask?.dueDate && (
            <ModalBody mb={4}>
              <Flex align="center" justify="space-between" mt={10}>
                <Text color="white">Alocado para</Text>
                <Text color="white">{`${user?.firstName} ${user?.lastName}`}</Text>
              </Flex>
              <Divider my={3} />

              <Flex align="center" justify="space-between">
                <Text color="white">Criado em</Text>
                <Text color="white">
                  {format(parseISO(selectedTask.createdAt), 'dd/MM/yyy')}
                </Text>
              </Flex>
              <Divider my={3} />

              <Flex align="center" justify="space-between">
                <Text color="white">Prazo</Text>
                <Text color="white">
                  {format(parseISO(selectedTask.dueDate), 'dd/MM/yyy')}
                </Text>
              </Flex>
              <Divider my={3} />

              <Flex align="center" justify="space-between">
                <Text color="white">Pontos de esforços</Text>
                <Text color="white">{selectedTask.stressPoints}</Text>
              </Flex>
            </ModalBody>
          )}
          {/* <ModalFooter margin="auto"></ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};
