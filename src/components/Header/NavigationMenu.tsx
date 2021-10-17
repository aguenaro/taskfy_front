import { MdNotifications } from 'react-icons/md';

import { HStack, Text, Button, Icon, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { AddMenu } from './AddMenu';
import { ProfileMenu } from './ProfileMenu';

export const NavigationMenu = () => {
  const { route, push } = useRouter();

  // const externalPaths = ['/', '/signin', '/signup'];
  const internalPaths = ['/boards', '/boards/[boardId]'];

  const ExternalMenu = () => {
    return (
      <>
        <Link href="/">
          <Text fontSize="xl" color="white">
            home
          </Text>
        </Link>
        <Link href="/signin">
          <Text fontSize="xl" color="white">
            sign in
          </Text>
        </Link>

        <Button
          borderRadius={15}
          size="md"
          bg="teal.200"
          boxShadow="dark-lg"
          color="black"
          style={{ boxShadow: '0px 0px 20px 4px #4BCFEE' }}
          _hover={{ color: 'white' }}
          zIndex="1"
          onClick={() => push('/signup')}
        >
          SIGN UP
        </Button>
      </>
    );
  };

  const InternalMenu = () => {
    return (
      <>
        <Icon as={MdNotifications} color="white" w={7} h={7} />
        {/* <AddMenu /> */}
        <ProfileMenu />
      </>
    );
  };

  return (
    <HStack spacing={12}>
      {internalPaths.includes(route) ? <InternalMenu /> : <ExternalMenu />}
    </HStack>
  );
};
