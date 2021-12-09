import { Box } from '@chakra-ui/react';
import mountainImg from 'assets/img/mountain.svg';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { PricingCard, Apresentation } from 'components/landing';
import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Image from 'next/image';

const MotionBox = motion(Box);

const Home: NextPage = () => {
  return (
    <Box overflow="hidden">
      <Box position="relative" pb="30rem">
        <Box
          w={700}
          h={700}
          position="absolute"
          top="250"
          right="-250"
          borderRadius="full"
          bg="rgba(77, 77, 77, 0.08)"
        />
        <MotionBox
          initial={{ boxShadow: '0px 0px 20px #4BCFEE', opacity: 1 }}
          animate={{ boxShadow: '0px 0px 5px #4BCFEE', opacity: 0.7 }}
          transition={{ yoyo: Infinity, duration: 2 }}
          w={3}
          h={3}
          position="absolute"
          top="150"
          right="250"
          borderRadius="full"
          bg="#4BCFEE"
        />
        <MotionBox
          initial={{ boxShadow: '0px 0px 20px #4BCFEE' }}
          animate={{ boxShadow: '0px 0px 5px #4BCFEE' }}
          transition={{ yoyo: Infinity, duration: 4 }}
          w={3}
          h={3}
          position="absolute"
          top="250"
          left="50vw"
          borderRadius="full"
          bg="white"
        />
        <Header />
        <Apresentation />
        <PricingCard />
        <Box w="100%" position="absolute" bottom="-35px" zIndex="-1">
          <Image layout="responsive" src={mountainImg} alt="Montanhas" />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
