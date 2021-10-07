import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  isRequired?: boolean;
  name: string;
  label?: string;
}

export const Input = ({
  isRequired = false,
  name,
  label,
  ...rest
}: InputProps) => {
  return (
    <FormControl isRequired={isRequired} mb={3}>
      {!!label && (
        <FormLabel color="white" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        variant="filled"
        bg="blue.900"
        borderRadius="15px"
        color="gray.200"
        _hover={{ bg: 'blue.800' }}
        _focus={{ bg: 'white', color: 'black' }}
        {...rest}
      />
    </FormControl>
  );
};
