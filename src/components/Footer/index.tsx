import { FaGithub } from 'react-icons/fa';

import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import taskfyLogo from 'assets/img/taskfy_logo_branco.png';
import Image from 'next/image';

export const Footer = () => {
  return (
    <Box p={10} bg="black" w="100%">
      <Flex
        justify="space-between"
        pb={5}
        borderBottom="1px"
        borderBottomColor="white"
      >
        <Box>
          <Image
            src={taskfyLogo}
            alt="Logo taskfy footer"
            layout="fixed"
            width={137}
            height={47}
            className="logo-branco"
          />
        </Box>
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
