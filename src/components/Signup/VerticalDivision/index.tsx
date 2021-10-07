import { Flex, Divider, Text } from '@chakra-ui/layout';

export const VerticalDivision = () => {
  return (
    <Flex
      position="relative"
      direction="column"
      align="center"
      justifyContent="space-between"
      minH="200px"
    >
      <Divider orientation="vertical" color="#FFFFFF" h="200px" />
      <Text color="#FFFFFF" margin="20px 0 20px 0"> Or </Text>
      <Divider orientation="vertical" h="200px" />
    </Flex>
  );
};
