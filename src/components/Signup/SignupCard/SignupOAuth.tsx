import { Flex, Button } from '@chakra-ui/react';
import appleLogo from 'assets/img/apple_logo.png';
import gitLogo from 'assets/img/git_logo.png';
import googleLogo from 'assets/img/google_logo.png';
import Image from 'next/image';

const OAuthProvider = ({ src }: any) => {
  return (
    <Button
      w="100px"
      h="100px"
      padding="0"
      bg="none"
      border="none"
      borderRadius="50"
      _hover={{ bg: 'none' }}
      _active={{ bg: 'none' }}
    >
      <Image src={src} height="100px" width="100px" />
    </Button>
  );
};

export const SignupOAuth = () => {
  return (
    <Flex position="relative" direction="column" align="center" height="408px">
      <Flex
        position="relative"
        direction="row"
        align="center"
        justifyContent="space-around"
        width="100%"
        height="100%"
        padding="0 75px 0 75px"
      >
        <OAuthProvider src={gitLogo} />
        <OAuthProvider src={googleLogo} />
        <OAuthProvider src={appleLogo} />
      </Flex>
    </Flex>
  );
};
