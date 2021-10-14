import { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  forwardRef,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  isRequired?: boolean;
  name: string;
  label?: string;
  error?: FieldError;
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { isRequired = false, name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} mb={3}>
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
        ref={ref}
        color="gray.200"
        _hover={{ bg: 'blue.800' }}
        _focus={{ bg: 'white', color: 'black' }}
        {...rest}
      />
      {!!error && <FormErrorMessage mt={0}>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputComponent);
