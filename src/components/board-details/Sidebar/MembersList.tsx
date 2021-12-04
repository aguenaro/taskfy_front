import { MdPersonAdd } from 'react-icons/md';

import { Box, Text, Flex, Stack, Avatar, Icon } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { User } from 'interfaces/User';

interface MembersListProps {
  members: User[];
  isManager: boolean;
}

export const MembersList = ({ members, isManager }: MembersListProps) => {
  const { user } = useAuth();
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
                name={`${member.firstName} ${member.lastName}`}
                w={6}
                h={6}
                mr={1}
              />
              <Text color="white" fontSize="x-small" ml={1}>
                {member.username}
              </Text>
            </Flex>
            {member.id !== user?.id && (
              <Text color="red" fontSize="x-small" ml={1}>
                Remover
              </Text>
            )}
          </Flex>
        ))}
        {isManager && (
          <Flex cursor="pointer" align="center" justify="center">
            <Icon as={MdPersonAdd} color="white" />
            <Text fontSize="smaller" color="white" ml={2}>
              adicionar membro
            </Text>
          </Flex>
        )}
      </Stack>
    </Box>
  );
};
