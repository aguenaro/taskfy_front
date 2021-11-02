import { Avatar, Text, Flex, Divider } from '@chakra-ui/react';

export const ProfileSection = () => {
  return (
    <>
      <Text color="white" fontSize="3xl" mb={1}>
        perfil
      </Text>
      <Divider />
      <Flex align="center" w="100%" p="50px 100px">
        <Flex align="center">
          <Avatar
            name="aguenaro"
            src="https://avatars.githubusercontent.com/aguenaro"
            w="150px"
            h="150px"
            mr={10}
          />
          <Flex direction="column">
            <Text color="white" fontSize="2xl">
              Rodrigo Aguena
            </Text>
            <Text color="gray.300">aguenaro</Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
