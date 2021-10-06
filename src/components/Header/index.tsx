import { Flex, Box } from '@chakra-ui/react';
import taskfyLogo from 'assets/img/taskfy_logo.png';
import Image from 'next/image';
import Link from 'next/link';

import { NavigationMenu } from './NavigationMenu';

export const Header = () => {
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
      <Link href="/">
        <Image
          src={taskfyLogo}
          alt="Logo taskfy"
          layout="fixed"
          width={137}
          height={47}
        />
      </Link>
      <NavigationMenu />
    </Flex>
  );
};
