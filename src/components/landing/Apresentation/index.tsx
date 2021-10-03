import { Flex, Text, Stack, Box } from '@chakra-ui/react';

import { PullRequestDetailsCard } from './PullRequestDetailsCard';
import { PullRequestsListCard } from './PullRequestsListCard';

export const Apresentation = () => {
  return (
    <Flex align="flex-start" mx={20} mt="10%" h="70vh">
      <Stack>
        <Text color="white" fontSize="6xl" textShadow="0px 0px 10px #FFFFFF">
          task <br /> management <br />
          for devs.
        </Text>
        <Text color="white" fontSize="md">
          A simple productivity tool, <br />
          from devs for devs.
        </Text>
      </Stack>
      <Flex justify="space-around" w="100%">
        <PullRequestsListCard />
        <PullRequestDetailsCard />
      </Flex>
    </Flex>
  );
};
