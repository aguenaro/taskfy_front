import { Box, Flex, Text, Divider, Button, Icon } from '@chakra-ui/react';
import { FaGithub, FaGoogle, FaApple } from 'react-icons/fa';
import { Input } from 'components/Forms';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { NextPage } from 'next';
import logo from '../assets/img/taskfy_logo_branco.png';
import Image from 'next/image';
import { HorizontalDivision } from 'components/signin/HorizontalDivision';
import { SigninOAuth } from 'components/signin/SigninOAuth';

const SignInPage: NextPage = () => {
  return (
    <Flex direction="column" align="center">
      <Image src={logo} alt="logo taskfy branca" />
      <Box
        w="40%"
        bg="blue.1000"
        p="20px 50px 50px"
        borderRadius="50px"
        align="center"
        marginTop="30px"
        marginBottom="50px"
      >
        <Text fontSize="xl" color="white" textAlign="center" mb={5}>
          log into taskfy!
        </Text>
        <Divider marginBottom="30px" />
        <Input
          name="email_username"
          label="email or username"
          type="text"
          isRequired
        />
        <Input
          name="email_username"
          label="password"
          type="password"
          isRequired
        />
        <Button
          type="submit"
          bg="green.500"
          w="50%"
          color="#FFFFFF"
          m="20px 0px"
          marginBottom="0px"
          _hover={{ background: '#2A8C3C' }}
        >
          login
        </Button>
        <HorizontalDivision />
        <Text fontSize="xl" color="white" textAlign="center" mb={5}>
          log in with
        </Text>
        <Box h="100px">
          <Flex
            align="center"
            justify="space-around"
            w="100%"
            h="100%"
            p="0 75px"
          >
            <Icon as={FaGithub} color="white" w="80px" h="80px" />
            <Icon as={FaGoogle} color="white" w="80px" h="80px" />
            <Icon as={FaApple} color="white" w="80px" h="80px" />
          </Flex>
          <Text
            marginTop="10px"
            fontSize="8px"
            color="white"
            textAlign="center"
          >
            Don’t have an account? <text style={{ color: 'blue' }}>Create</text>{' '}
            one right now!
          </Text>
        </Box>
      </Box>
      <Footer />
    </Flex>
  );
};

export default SignInPage;
