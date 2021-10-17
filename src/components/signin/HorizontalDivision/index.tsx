import { Flex, Divider, Text } from '@chakra-ui/layout';

export const HorizontalDivision = () => {
  return (
    <Flex
      direction="row"
      align="baseline"
      justify="space-between"
      margin="30px 0px 30px"
    >
      <Divider orientation="horizontal" color="#FFFFFF" />
      <Text color="#FFFFFF" margin="0px 30px 0px">
        Or
      </Text>
      <Divider orientation="horizontal" />
    </Flex>
  );
};
