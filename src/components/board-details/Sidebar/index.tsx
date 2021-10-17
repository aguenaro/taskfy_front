import {
  Box,
  Flex,
  Divider,
  Button,
  Stack,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';

import { EditableControls } from './EditableControls';
import { MembersList } from './MembersList';

interface SidebarProps {
  boardName: string;
}

const members = [
  { username: 'aguenaro', name: 'Rodrigo Aguena' },
  { username: 'eduardothsantos', name: 'Eduardo Thomas' },
  { username: 'jacobodecal', name: 'Jacobo Soldra' },
];

export const Sidebar = ({ boardName }: SidebarProps) => {
  return (
    <Box w="20vw" h="100%" p="10px 0" bg="rgba(2, 9, 37, 0.75)">
      <Flex
        justify="space-between"
        align="center"
        m="0 20px"
        position="relative"
      >
        <Editable defaultValue={boardName} isPreviewFocusable={false}>
          <EditablePreview color="white" />
          <EditableInput color="white" id="boardName" />
          <EditableControls />
        </Editable>
      </Flex>
      <Divider mt={3} />
      <Flex
        h="calc(90% - 30px)"
        direction="column"
        justify="space-between"
        m="10px 20px 0"
      >
        <MembersList members={members} />
        <Stack spacing={4} m="0 20px">
          <Button
            w="100%"
            variant="outline"
            colorScheme="red"
            borderRadius="20px"
            size="sm"
          >
            leave board
          </Button>
          <Button
            w="100%"
            variant="outline"
            colorScheme="red"
            borderRadius="20px"
            size="sm"
          >
            delete board
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};
