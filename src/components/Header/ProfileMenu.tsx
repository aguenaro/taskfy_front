import { AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { MdKeyboardArrowDown } from 'react-icons/md';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';

export const ProfileMenu = () => {
  const { push } = useRouter();
  const { logout, user } = useAuth();
  return (
    <Menu placement="bottom-start" autoSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<MdKeyboardArrowDown color="white" />}
        bg="transparent"
        _hover={{
          bg: 'transparent',
        }}
        _active={{
          bg: 'transparent',
        }}
        _focus={{ bg: 'transparent' }}
      >
        <Avatar name={`${user?.firstName} ${user?.lastName}`} w={10} h={10} />
      </MenuButton>
      <MenuList bg="#040D30">
        <MenuItem isDisabled cursor="default">
          <Text color="white" fontSize="xs">
            Loggado como
          </Text>
        </MenuItem>
        <MenuItem isDisabled cursor="default">
          <Text color="white" fontSize="xs" fontWeight="bold">
            {user?.username}
          </Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          _hover={{ bg: 'grey' }}
          icon={<AiOutlineUser color="white" />}
          onClick={() => push('/profile')}
        >
          <Text color="white" fontSize="xs">
            seu perfil
          </Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          _hover={{ bg: 'grey' }}
          icon={<BiLogOut color="white" />}
          onClick={logout}
        >
          <Text color="white" fontSize="xs">
            sair
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
