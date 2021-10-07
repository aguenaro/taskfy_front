import { Box, Text, Divider } from '@chakra-ui/react';

import { SignupForm } from './SignupForm';

export const SignupCard = () => {
  return (
    <Box
      w="100%"
      maxW="725px"
      maxH="629px"
      bg="blue.1000"
      padding="50px 20px 30px 20px"
      borderRadius="50px"
    >
      <Text fontSize="xl" color="white" textAlign="center" lineHeight="2rem">
        Create your account now!
      </Text>
      <Divider />
      <SignupForm />
    </Box>
  );
};
