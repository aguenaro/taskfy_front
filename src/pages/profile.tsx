import { Box } from '@chakra-ui/react';
import { Header } from 'components/Header';
import {
  ProfileSection,
  AccountSettings,
  SecuritySettings,
} from 'components/profile';
import { NextPage } from 'next';

export const Profile: NextPage = () => {
  return (
    <>
      <Header />
      <Box w="100vw" p="20px 10vw">
        <ProfileSection />
        <AccountSettings />
        <SecuritySettings />
      </Box>
    </>
  );
};

export default Profile;
