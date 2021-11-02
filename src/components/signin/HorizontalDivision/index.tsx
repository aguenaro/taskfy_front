import { Flex, Divider, Text } from '@chakra-ui/layout';

export const HorizontalDivision = () => {
  return (
    <Flex direction="row" align="center" justify="space-between" m="30px 0">
      <Divider orientation="horizontal" color="white" />
      <Text color="white" margin="0 30px">
        Or
      </Text>
      <Divider orientation="horizontal" />
    </Flex>
  );
};
