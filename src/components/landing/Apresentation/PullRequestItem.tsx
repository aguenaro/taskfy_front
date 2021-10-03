import { Avatar, Text, Flex, Stack } from '@chakra-ui/react';

interface PullRequestItemProps {
  id: number;
  title: string;
  user: string;
  lastUpdate: string;
}

export const PullRequestItem = ({
  id,
  lastUpdate,
  title,
  user,
}: PullRequestItemProps) => {
  return (
    <Stack spacing={1} bg="blue.900" w="100%" borderRadius={10} p={2}>
      <Text color="white">
        PR{' '}
        <Text as="span" color="teal.200">
          #{id}
        </Text>{' '}
        - {title}
      </Text>
      <Flex align="center">
        <Avatar
          name={user}
          src={`https://avatars.githubusercontent.com/${user}`}
          w={6}
          h={6}
          mr={1}
        />
        <Text color="white" fontSize="x-small">
          • {user} • {lastUpdate}
        </Text>
      </Flex>
    </Stack>
  );
};
