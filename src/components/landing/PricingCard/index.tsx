import { Flex, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { PlanCard } from './PlanCard';

export const PricingCard = () => {
  const { push } = useRouter();
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
        se torne um cliente
      </Text>
      <Text fontSize="2xl" color="white" textAlign="center">
        e remova os gargalos do seu time de tecnologia para evoluir <br /> na
        velocidade da{' '}
        <Text as="span" color="teal.200" textShadow="0px 0px 20px #4BCFEE">
          luz
        </Text>
      </Text>
      <Flex align="center" justify="space-evenly" my={10}>
        <PlanCard planType="pequenas empresas" price={14.99} />
        <PlanCard planType="corporações" price={9.99} />
      </Flex>
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
        onClick={() => push('/signup')}
      >
        melhorar a produtividade da minha equipe
      </Button>
    </Flex>
  );
};
