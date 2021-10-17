import { useForm, SubmitHandler } from 'react-hook-form';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Flex,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from 'components/Forms';
import { Board } from 'interfaces/Board';
import * as yup from 'yup';
interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  addNewBoard: (newBoard: Board) => void;
}

interface CreateBoardFormData {
  boardName: string;
  projectName?: string;
}

const createBoardSchema = yup.object().shape({
  boardName: yup.string().required('Board name is required'),
  gitProject: yup.string(),
});

export const CreateBoardModal = ({
  isOpen,
  onClose,
  addNewBoard,
}: CreateBoardModalProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createBoardSchema),
  });

  const handleCreateBoard: SubmitHandler<CreateBoardFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    addNewBoard({
      title: values.boardName,
      bgColor: `#${Math.random().toString(16).substr(-6)}`,
    });

    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="blue"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white">create board</ModalHeader>
        <ModalCloseButton color="white" _focus={{ border: 'none' }} />
        <ModalBody>
          <Flex
            direction="column"
            as="form"
            onSubmit={handleSubmit(handleCreateBoard)}
            noValidate
          >
            <Input
              isRequired
              label="board name"
              type="text"
              error={formState.errors.boardName}
              {...register('boardName')}
            />
            <Input
              label="github project (optional)"
              type="text"
              error={formState.errors.gitProject}
              {...register('gitProject')}
            />
            <Button
              type="submit"
              variant="solid"
              margin="10px auto"
              isLoading={formState.isSubmitting}
              loadingText="Creating"
              spinnerPlacement="end"
            >
              create project
            </Button>
          </Flex>
        </ModalBody>

        {/* <ModalFooter margin="auto"></ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};
