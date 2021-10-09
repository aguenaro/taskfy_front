import { Flex, Divider, Text } from '@chakra-ui/layout';

export const VerticalDivision = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="space-between"
      minH="200px"
    >
      <Divider orientation="vertical" color="#FFFFFF" h="30vh" />
      <Text color="#FFFFFF" m="20px 0">
        Or
      </Text>
      <Divider orientation="vertical" h="30vh" />
    </Flex>
  );
};
