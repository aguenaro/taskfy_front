import { Flex } from '@chakra-ui/react';
import taskfyLogo from 'assets/img/taskfy_logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { NavigationMenu } from './NavigationMenu';

export const Header = () => {
  const { route } = useRouter();

  const internalPaths = ['/boards', '/boards/[boardId]', '/profile', '/admin'];
  return (
    <Flex
      as="header"
      boxShadow="xl"
      align="center"
      justify="space-between"
      px={10}
      py={6}
      bg="gray.900"
    >
      <Link href={internalPaths.includes(route) ? '/boards' : '/'}>
        <Image src={taskfyLogo} alt="Logo taskfy" width={137} height={47} />
      </Link>
      <NavigationMenu />
    </Flex>
  );
};
