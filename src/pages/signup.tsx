import { Box, Flex } from '@chakra-ui/layout';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { SignupCard, VerticalDivision } from 'components/Signup';
import { NextPage } from 'next';
import wavesImg from 'assets/img/waves.svg';
import Image from 'next/image';

const SignupPage: NextPage = () => {
  return (
    <Box overflow="hidden">
      <Header />
      <Box w="100%" minH="75vh">
        <Flex
          w="100%"
          minH="75vh"
          padding="auto"
          justifyContent="space-around"
          align="center"
        >
          <SignupCard />
          <VerticalDivision />
          <SignupCard OAuthCard />
        </Flex>
      </Box>
      <Box w="100%">
        <Image src={wavesImg} alt="Ondas" />
      </Box>
      <Footer />
    </Box>
  );
};

export default SignupPage;
