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
      '800': '#13254C',
      '900': '#1D264B',
    },
  },
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: {
          bg: 'gray.900',
          border: '1px solid white',
        },
      }),
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
