import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Flex,
  Divider,
  Box,
  Text,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import { Task } from 'interfaces/Task';

interface TaskDetailsModalProps {
  isOpen: boolean;
  selectedTask?: Task;
  onClose: () => void;
}

export const TaskDetailsModal = ({
  isOpen,
  onClose,
  selectedTask,
}: TaskDetailsModalProps) => {
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
        <ModalHeader color="white">{selectedTask?.title}</ModalHeader>

        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        {selectedTask?.title && (
          <ModalBody mb={4}>
            <Flex align="center" justify="space-between" mt={10}>
              <Text color="white">Alocado para</Text>
              <Text color="white">{selectedTask.assignedFor}</Text>
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
                {format(parseISO(selectedTask.deadline), 'dd/MM/yyy')}
              </Text>
            </Flex>
            <Divider my={3} />

            <Flex align="center" justify="space-between">
              <Text color="white">Pontos de esforços</Text>
              <Text color="white">{selectedTask.effort}</Text>
            </Flex>
          </ModalBody>
        )}
        {/* <ModalFooter margin="auto"></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
