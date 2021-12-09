import { Flex, Text, Stack } from '@chakra-ui/react';

import { PullRequestDetailsCard } from './PullRequestDetailsCard';
import { PullRequestsListCard } from './PullRequestsListCard';

export const Apresentation = () => {
  return (
    <Flex align="flex-start" mx={20} mt="10%" h="70vh">
      <Stack>
        <Text color="white" fontSize="6xl" textShadow="0px 0px 10px #FFFFFF">
          Gerenciamento <br /> de tarefas <br />
          para empresas.
        </Text>
        <Text color="white" fontSize="md">
          Uma ferramente de produtividade simples, <br />
          feito para empresas.
        </Text>
      </Stack>
      <Flex justify="space-around" w="100%">
        <PullRequestsListCard />
        <PullRequestDetailsCard />
      </Flex>
    </Flex>
  );
};
