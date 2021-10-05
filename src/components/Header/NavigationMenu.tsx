import { HStack, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';

export const NavigationMenu = () => {
  return (
    <HStack spacing={12}>
      <Link href="/">
        <Text fontSize="xl" color="white">
          home
        </Text>
      </Link>
      <Link href="/docs">
        <Text fontSize="xl" color="white">
          api
        </Text>
      </Link>
      <Link href="signin">
        <Text fontSize="xl" color="white">
          login
        </Text>
      </Link>
      <Link href="/signup">
        <Button
          borderRadius={15}
          size="md"
          bg="teal.200"
          boxShadow="dark-lg"
          color="black"
          style={{ boxShadow: '0px 0px 20px 4px #4BCFEE' }}
          _hover={{ color: 'white' }}
          zIndex="1"
        >
          SIGN UP
        </Button>
      </Link>
    </HStack>
  );
};
