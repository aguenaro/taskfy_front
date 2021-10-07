import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
} from '@chakra-ui/react';

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
            <FormControl isRequired mb={3}>
              <FormLabel color="white">board name</FormLabel>
              <Input
                variant="filled"
                bg="blue.900"
                borderRadius="15px"
                color="gray.200"
                _hover={{ bg: 'blue.800' }}
                _focus={{ bg: 'white', color: 'black' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="white">github project (optional)</FormLabel>
              <Input
                variant="filled"
                bg="blue.900"
                borderRadius="15px"
                color="gray.200"
                _hover={{ bg: 'blue.800' }}
                _focus={{ bg: 'white', color: 'black' }}
              />
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter margin="auto">
          <Button variant="solid">create project</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
