import { MdChat, MdPersonAdd } from 'react-icons/md';

import { Box, Text, Flex, Stack, Avatar, Icon } from '@chakra-ui/react';

interface MembersListProps {
  members: {
    username: string;
    name: string;
  }[];
}

export const MembersList = ({ members }: MembersListProps) => {
  return (
    <Box>
      <Text color="white" fontSize="sm" mb={3}>
        membros
      </Text>
      <Stack spacing={3}>
        {members.map((member) => (
          <Flex
            key={member.username}
            align="center"
            justify="space-between"
            w="100%"
          >
            <Flex align="center">
              <Avatar
                name={member.name}
                src={`https://avatars.githubusercontent.com/${member.username}`}
                w={6}
                h={6}
                mr={1}
              />
              <Text color="white" fontSize="x-small" ml={1}>
                {member.username}
              </Text>
            </Flex>
            <Icon cursor="pointer" as={MdChat} color="white" />
          </Flex>
        ))}
        <Flex align="center" justify="center">
          <Icon cursor="pointer" as={MdPersonAdd} color="white" />
          <Text fontSize="smaller" color="white" ml={2}>
            adicionar membro
          </Text>
        </Flex>
      </Stack>
    </Box>
  );
};
