import { MdAdd, MdKeyboardArrowDown } from 'react-icons/md';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Button,
  Text,
} from '@chakra-ui/react';

export const AddMenu = () => {
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
        <Icon as={MdAdd} color="white" w={7} h={7} />
      </MenuButton>
      <MenuList bg="#040D30">
        <MenuItem _hover={{ bg: 'grey' }}>
          <Text color="white" fontSize="xs">
            create board
          </Text>
        </MenuItem>
        <MenuItem _hover={{ bg: 'grey' }}>
          <Text color="white" fontSize="xs">
            create a group
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
