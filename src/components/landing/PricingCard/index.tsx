import { Flex, Text, Button, Link } from '@chakra-ui/react';

import { PlanCard } from './PlanCard';

export const PricingCard = () => {
  return (
    <Flex
      position="relative"
      direction="column"
      bg="rgba(2, 9, 37, 0.5)"
      borderRadius="40px"
      w="80%"
      mt="300px"
      mx="auto"
      p={10}
    >
      <Text fontSize="2xl" color="teal.200">
        become a costumer
      </Text>
      <Text fontSize="2xl" color="white" textAlign="center">
        and remove the constraints from your tech and make it move <br /> at the
        speed of{' '}
        <Text as="span" color="teal.200" textShadow="0px 0px 20px #4BCFEE">
          light
        </Text>
      </Text>
      <Flex align="center" justify="space-evenly" my={10}>
        <PlanCard planType="single person" price={4.99} />
        <PlanCard planType="enterprise" price={15.99} />
      </Flex>
      <Link href="/signup">
        <Button
          borderRadius={15}
          size="md"
          bg="teal.200"
          boxShadow="dark-lg"
          color="black"
          mt={6}
          mx="auto"
          style={{ boxShadow: '0px 0px 20px 4px #4BCFEE' }}
          _hover={{ color: 'white' }}
        >
          improve my tech productivity
        </Button>
      </Link>
    </Flex>
  );
};
