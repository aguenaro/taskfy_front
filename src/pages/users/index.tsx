import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import wavesImg from 'assets/img/waves.svg';
import { Header } from 'components/Header';
import { UsersTable, BoardsGrid } from 'components/users';
import { NextPage } from 'next';
import Image from 'next/image';

const Usuarios: NextPage = () => {
  return (
    <Box overflow="hidden">
      <Header />
      <Box w="100vw" h="90vh" mt="40px" position="relative">
        <Box p="0 10vw">
          <Tabs>
            <TabList>
              <Tab color="white">Usuários</Tab>
              <Tab color="white">Quadros</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <UsersTable />
              </TabPanel>
              <TabPanel>
                <BoardsGrid />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box position="absolute" bottom="-5px" w="100vw">
          <Image src={wavesImg} alt="Ondas" />
        </Box>
      </Box>
    </Box>
  );
};

export default Usuarios;
