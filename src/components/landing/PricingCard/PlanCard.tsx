import { Box, Text } from '@chakra-ui/react';

interface PlanCardProps {
  planType: string;
  price: number;
}

export const PlanCard = ({ planType, price }: PlanCardProps) => {
  return (
    <Box p={6} w="35%" bg="blue.800" borderRadius="20px">
      <Box borderBottom="1px" borderColor="white" pb={3} mb={3}>
        <Text color="white" textAlign="center" fontSize="2xl">
          {planType}
        </Text>
      </Box>
      <Text color="white" fontSize="xs">
        quadros ilimitados
      </Text>
      <Text color="white" fontSize="xs">
        manter controle das suas tarefas
      </Text>
      <Text color="white" fontSize="xs">
        devops integrado com git
      </Text>

      <Text color="white" fontSize="lg" mt={10}>
        por apenas
      </Text>
      <Text color="white" fontSize="6xl" textAlign="center" my={3}>
        $ {price}
      </Text>
      <Text color="white" fontSize="md" textAlign="end">
        por mês
      </Text>
    </Box>
  );
};
