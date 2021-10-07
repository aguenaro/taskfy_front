import { Flex, FormLabel, Input, Button } from '@chakra-ui/react';

interface InputTextFieldProps {
  label: string;
  type: string;
}

const InputTextField = ({ label, type }: InputTextFieldProps) => {
  return (
    <Flex
      w="100%"
      position="relative"
      direction="column"
      padding="0 10px 0 10px"
      marginBottom="10px"
    >
      <FormLabel color="#FFFFFF" paddingLeft="25px" margin="10px 20px 3px 0">
        {label}
      </FormLabel>
      <Input
        type={type}
        bg="#1D264B"
        color="#FFFFFF"
        border="none"
        borderRadius="20px"
        margin="0"
        paddingLeft="25px"
      ></Input>
    </Flex>
  );
};
InputTextField.defaultProps = {
  type: 'text',
};

export const SignupForm = () => {
  return (
    <form method="post">
      <Flex position="relative" direction="column" align="center">
        <Flex
          position="relative"
          direction="row"
          justifyContent="space-between"
          w="100%"
        >
          <InputTextField label="first_name" />
          <InputTextField label="last_name" />
        </Flex>
        <InputTextField label="username" />
        <InputTextField label="email" type="email" />
        <InputTextField label="password" type="password" />
        <Button
          bg="green.500"
          w="50%"
          color="#FFFFFF"
          marginTop="20px"
          _hover={{ background: '#2A8C3C' }}
          o
        >
          Create my account!
        </Button>
      </Flex>
    </form>
  );
};
