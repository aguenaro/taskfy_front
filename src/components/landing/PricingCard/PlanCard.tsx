import { Box, Text } from '@chakra-ui/react';

interface PlanCardProps {
  planType: string;
  price: number;
}

export const PlanCard = ({ planType, price }: PlanCardProps) => {
  return (
    <Box p={6} w="35%" bg="blue.900" borderRadius="20px">
      <Box borderBottom="1px" borderColor="white" pb={3} mb={3}>
        <Text color="white" textAlign="center" fontSize="2xl">
          {planType}
        </Text>
      </Box>
      <Text color="white" fontSize="xs">
        unlimited boards
      </Text>
      <Text color="white" fontSize="xs">
        keep track of your tasks
      </Text>
      <Text color="white" fontSize="xs">
        devops integrated with git
      </Text>

      <Text color="white" fontSize="lg" mt={10}>
        for only
      </Text>
      <Text color="white" fontSize="6xl" textAlign="center" my={3}>
        $ {price}
      </Text>
      <Text color="white" fontSize="md" textAlign="end">
        per month
      </Text>
    </Box>
  );
};
