import { Avatar, Text, Flex, Divider } from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
export const ProfileSection = () => {
  const { user } = useAuth();

  return (
    <>
      <Text color="white" fontSize="3xl" mb={1}>
        perfil
      </Text>
      <Divider />
      <Flex align="center" w="100%" p="50px 100px">
        <Flex align="center">
          <Avatar
            name={`${user.firstName} ${user.lastName}`}
            w="150px"
            h="150px"
            mr={10}
          />
          <Flex direction="column">
            <Text color="white" fontSize="2xl">
              {user.firstName} {user.lastName}
            </Text>
            <Text color="gray.300">{user.username}</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
