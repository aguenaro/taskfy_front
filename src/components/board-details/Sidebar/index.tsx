import { MdEdit, MdChat } from 'react-icons/md';
import { VscGraphLine } from 'react-icons/vsc';

import {
  Box,
  Flex,
  Divider,
  Icon,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';

import { MembersList } from './MembersList';

interface SidebarProps {
  boardName: string;
  openGraph: () => void;
}

const members = [
  { username: 'aguenaro', name: 'Rodrigo Aguena' },
  { username: 'eduardothsantos', name: 'Eduardo Thomas' },
  { username: 'jacobodecal', name: 'Jacobo Soldra' },
];

export const Sidebar = ({ boardName, openGraph }: SidebarProps) => {
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
        <MembersList members={members} />
        <Stack spacing={4}>
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
        </Stack>
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
          <Button
            w="100%"
            variant="outline"
            colorScheme="red"
            borderRadius="20px"
            size="sm"
          >
            sair
          </Button>
          <Button
            w="100%"
            variant="outline"
            colorScheme="red"
            borderRadius="20px"
            size="sm"
          >
            excluir
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};
