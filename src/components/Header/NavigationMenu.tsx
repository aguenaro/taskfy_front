import { HStack, Text, Button } from '@chakra-ui/react';

export const NavigationMenu = () => {
  return (
    <HStack spacing={12}>
      <Text fontSize="xl" color="white">
        home
      </Text>
      <Text fontSize="xl" color="white">
        api
      </Text>
      <Text fontSize="xl" color="white">
        login
      </Text>
      <Button
        borderRadius={15}
        size="md"
        bg="teal.200"
        boxShadow="dark-lg"
        color="black"
        style={{ boxShadow: '0px 0px 20px 4px #4BCFEE' }}
        _hover={{ color: 'white', bg: 'blue.500' }}
      >
        SIGN UP
      </Button>
    </HStack>
  );
};
