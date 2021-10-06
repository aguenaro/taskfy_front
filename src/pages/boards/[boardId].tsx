import { Box } from '@chakra-ui/react';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { NextPage } from 'next';

const BoardDetails: NextPage = () => {
  return (
    <Box overflowX="hidden">
      <Header />
      <Footer />
    </Box>
  );
};

export default BoardDetails;
