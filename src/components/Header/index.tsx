import { Flex, Img } from '@chakra-ui/react';
import taskfyLogo from 'assets/img/taskfy_logo.png';
import Image from 'next/image';

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
      {/* <Image src={taskfyLogo} alt="Logo taskfy" layout="responsive" /> */}
      <NavigationMenu />
    </Flex>
  );
};
