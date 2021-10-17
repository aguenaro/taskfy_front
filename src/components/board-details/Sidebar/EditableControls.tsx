import { MdEdit } from 'react-icons/md';

import { useEditableControls, Icon, IconButton } from '@chakra-ui/react';

export const EditableControls = () => {
  const { getEditButtonProps } = useEditableControls();

  return (
    <IconButton
      aria-label="Edit board name"
      size="sm"
      icon={<Icon cursor="pointer" as={MdEdit} color="white" w={5} h={5} />}
      {...getEditButtonProps()}
      bg="transparent"
      position="absolute"
      right="0"
    />
  );
};
