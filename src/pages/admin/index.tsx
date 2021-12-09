import { useState, useEffect } from 'react';

import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import wavesImg from 'assets/img/waves.svg';
import { UsersTable, BoardsGrid } from 'components/admin';
import { Header } from 'components/Header';
import { Board } from 'interfaces/Board';
import { IResponse } from 'interfaces/IResponse';
import { User } from 'interfaces/User';
import { NextPage } from 'next';
import Image from 'next/image';
import api from 'services/api';

const Admin: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data: response } = await api.get<IResponse<User[]>>(
        '/organizations/users'
      );
      setUsers(response.data);
    };
    const getBoards = async () => {
      const { data: response } = await api.get<IResponse<Board[]>>(
        '/organizations/boards'
      );
      setBoards(response.data);
    };

    getUsers();
    getBoards();
  }, []);

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
                <UsersTable users={users} />
              </TabPanel>
              <TabPanel>
                <BoardsGrid boards={boards} />
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

export default Admin;
