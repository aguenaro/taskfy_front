import { extendTheme } from '@chakra-ui/react';

// colocar styles do theme
export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#020925',
    },
    teal: {
      '200': '#4BCFEE',
    },
    blue: {
      '900': '#13254C',
    },
  },
  fonts: {
    heading: 'Roboto mono',
    body: 'Roboto mono',
  },
  styles: {
    global: {
      body: {
        bg: '#06113B',
      },
    },
  },
});
