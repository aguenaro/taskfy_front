import { ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
  FormLabel,
  FormErrorMessage,
  forwardRef,
} from '@chakra-ui/react';

interface Option {
  value: string | number;
  label: string | React.ReactNode;
}

interface SelectProps extends ChakraSelectProps {
  isRequired?: boolean;
  name: string;
  options: Option[];
  label?: string;
  error?: FieldError;
}

const SelectComponent: ForwardRefRenderFunction<
  HTMLSelectElement,
  SelectProps
> = (
  { isRequired = false, name, label, options, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={!!error} mb={3}>
      {!!label && (
        <FormLabel color="white" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraSelect
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
      >
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
      {!!error && <FormErrorMessage mt={0}>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(SelectComponent);
