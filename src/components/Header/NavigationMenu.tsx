import { MdNotifications } from 'react-icons/md';

import { HStack, Text, Button, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AddMenu } from './AddMenu';
import { ProfileMenu } from './ProfileMenu';

export const NavigationMenu = () => {
  const { route } = useRouter();

  // const externalPaths = ['/', '/signin', '/signup'];
  const internalPaths = ['/boards', '/boards/[boardId]'];

  console.log(route);

  const ExternalMenu = () => {
    return (
      <>
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
        <Link href="/signin">
          <Text fontSize="xl" color="white">
            sign in
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
        </Link>{' '}
      </>
    );
  };

  const InternalMenu = () => {
    return (
      <>
        <Text fontSize="xl" color="white">
          api
        </Text>
        <Icon as={MdNotifications} color="white" w={7} h={7} />
        <AddMenu />
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
