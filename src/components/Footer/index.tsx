import { FaGithub } from 'react-icons/fa';

import { Box, Flex, Text, Icon } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box p={10} bg="black" w="100%">
      <Flex
        justify="space-between"
        pb={5}
        borderBottom="1px"
        borderBottomColor="white"
      >
        <Box></Box>
        <Text textAlign="center" color="white" fontSize="smaller">
          Projeto desenvolvido com objetivos educacionais para a disciplina PCS
          3636 - <br />
          Laboratório de Engenharia de Software
        </Text>
        <Icon as={FaGithub} w={7} h={7} color="white" />
      </Flex>
      <Flex justify="center">
        <Text textAlign="center" color="white" pt={10}>
          © 2021 - Todos os direitos reservados
        </Text>
      </Flex>
    </Box>
  );
};
