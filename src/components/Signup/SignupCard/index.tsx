import { Box, Text, Divider } from '@chakra-ui/react';

import { SignupForm } from './SignupForm';
import { SignupOAuth } from './SignupOAuth';

interface SignUpCardProps {
  OAuthCard: boolean;
}

export const SignupCard = ({ OAuthCard }: SignUpCardProps) => {
  const text = OAuthCard
    ? 'Create account using...'
    : 'Create your account now';
  const CardContent = OAuthCard ? <SignupOAuth /> : <SignupForm />;
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
        {text}
      </Text>
      <Divider />
      {CardContent}
    </Box>
  );
};
SignupCard.defaultProps = { OAuthCard: false };
