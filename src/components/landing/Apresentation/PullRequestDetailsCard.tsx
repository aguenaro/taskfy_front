import { FaGithub } from 'react-icons/fa';
import { GoGitPullRequest } from 'react-icons/go';

import {
  Box,
  Flex,
  Text,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
} from '@chakra-ui/react';

export const PullRequestDetailsCard = () => {
  return (
    <Box
      bg="rgba(2, 9, 37, 0.45)"
      borderRadius="30px"
      w="300px"
      h="400px"
      p={6}
    >
      <Flex
        align="center"
        mb={5}
        pb={3}
        borderBottomColor="white"
        borderBottomWidth="1px"
      >
        <Icon as={GoGitPullRequest} color="white" w={5} h={5} mr={2} />
        <Text fontSize="md" color="white">
          PR{' '}
          <Text as="span" fontSize="md" color="teal.200">
            #33
          </Text>{' '}
          - landing page
        </Text>
      </Flex>
      <Box bg="blue.800" w="100%" borderRadius={10} p={2}>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th
                color="white"
                textTransform="none"
                borderColor="teal.200"
                pl={1}
              >
                Autor
              </Th>
              <Th
                color="white"
                textTransform="none"
                borderColor="teal.200"
                pl={1}
              >
                eduardothsantos
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td color="white" fontSize="small" border="none" pl={1}>
                Criado há
              </Td>
              <Td color="white" fontSize="small" border="none" pl={1}>
                1 mês atrás
              </Td>
            </Tr>
            <Tr>
              <Td color="white" fontSize="small" border="none" pl={1}>
                título
              </Td>
              <Td color="white" fontSize="small" border="none" pl={1}>
                landing page
              </Td>
            </Tr>
            <Tr>
              <Td color="white" fontSize="small" border="none" pl={1}>
                status
              </Td>
              <Td color="white" fontSize="small" border="none" pl={1}>
                aberto
              </Td>
            </Tr>
            <Tr>
              <Td color="white" fontSize="small" border="none" pl={1}>
                prioridade
              </Td>
              <Td color="white" fontSize="small" border="none" pl={1}>
                baixa
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <HStack align="center" justify="center" my={5}>
          <Icon as={FaGithub} w={6} h={6} color="white" />
          <Text color="white" fontSize="lg">
            Veja no github
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
