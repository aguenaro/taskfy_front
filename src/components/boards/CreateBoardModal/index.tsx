import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from '@chakra-ui/react';
import { Input } from 'components/Forms';
interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBoardModal = ({
  isOpen,
  onClose,
}: CreateBoardModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="blue" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white">create board</ModalHeader>
        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        <ModalBody>
          <Box as="form">
            <Input isRequired label="board name" name="boardName" type="text" />
            <Input
              label="github project (optional)"
              name="gitProject"
              type="text"
            />
          </Box>
        </ModalBody>

        <ModalFooter margin="auto">
          <Button variant="solid">create project</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
