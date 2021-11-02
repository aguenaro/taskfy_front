import { Box, Flex, Text, Divider, Button } from '@chakra-ui/react';
import logo from 'assets/img/taskfy_logo_branco.png';
import { Footer } from 'components/Footer';
import { Input } from 'components/Forms';
import { HorizontalDivision, SigninOAuth, SigninForm } from 'components/signin';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const SignInPage: NextPage = () => {
  return (
    <Flex direction="column" align="center">
      <Box mt="50px" cursor="pointer">
        <Link href="/">
          <Image src={logo} alt="logo taskfy branca" />
        </Link>
      </Box>
      <Box
        w="40%"
        bg="blue.1000"
        m="30px 0 50px"
        p="20px 50px 50px"
        borderRadius="50px"
        align="center"
      >
        <Text fontSize="xl" color="white" textAlign="center" mb={5}>
          entre no taskfy!
        </Text>
        <Divider mb="30px" />
        <SigninForm />
        <HorizontalDivision />
        <SigninOAuth />
        <Text mt="30px" fontSize="12px" color="white" textAlign="center">
          Não possui conta?{' '}
          <Link href="/signup">
            <Text color="blue.500" cursor="pointer" as="span">
              Crie{' '}
            </Text>
          </Link>
          uma agora mesmo!
        </Text>
      </Box>
      <Footer />
    </Flex>
  );
};

export default SignInPage;
