import { Box } from '@chakra-ui/layout';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { NextPage } from 'next';

const SignupPage: NextPage = () => {
  return (
    <Box overflow="hidden">
      <Header />
      <Footer />
    </Box>
  );
};

export default SignupPage;
