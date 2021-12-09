import { GoGitPullRequest } from 'react-icons/go';

import { Box, Flex, Icon, Text, Stack } from '@chakra-ui/react';

import { PullRequestItem } from './PullRequestItem';

const pullRequestsList = [
  {
    id: 33,
    title: 'landing page',
    user: 'eduardothsantos',
    lastUpdate: '1 month',
  },
  {
    id: 67,
    title: 'Signup feito',
    user: 'aguenaro',
    lastUpdate: '2 days ago',
  },
  {
    id: 68,
    title: 'REST API',
    user: 'jacobodecal',
    lastUpdate: '1 hour ago',
  },
];

export const PullRequestsListCard = () => {
  return (
    <Box
      bg="rgba(2, 9, 37, 0.45)"
      borderRadius="30px"
      w="300px"
      h="400px"
      mt={50}
      p={6}
    >
      <Flex align="center" mb={5}>
        <Icon as={GoGitPullRequest} color="white" w={5} h={5} mr={2} />
        <Text fontSize="md" color="white">
          Solitação para puxar
        </Text>
      </Flex>
      <Stack spacing={3}>
        {pullRequestsList.map((pullRequest) => (
          <PullRequestItem
            key={pullRequest.id}
            id={pullRequest.id}
            title={pullRequest.title}
            user={pullRequest.user}
            lastUpdate={pullRequest.lastUpdate}
          />
        ))}
      </Stack>
    </Box>
  );
};
