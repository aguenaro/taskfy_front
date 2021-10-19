import { MdEdit, MdChat } from 'react-icons/md';

import {
  Box,
  Flex,
  Divider,
  Icon,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

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
