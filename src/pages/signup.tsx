import { Box, Flex } from '@chakra-ui/layout';
import wavesImg from 'assets/img/waves.svg';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { SignupForm, SignupOAuth, VerticalDivision } from 'components/signup';
import { NextPage } from 'next';
import Image from 'next/image';

const SignupPage: NextPage = () => {
  return (
    <Box overflow="hidden">
      <Header />
      <Box w="100%" h="90vh" p="50px 0" position="relative">
        <Flex minH="75vh" justify="space-evenly" align="center">
          <SignupForm />
          <VerticalDivision />
          <SignupOAuth />
        </Flex>
        <Box position="absolute" bottom="-5px" zIndex="-1">
          <Image src={wavesImg} alt="Ondas" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SignupPage;
