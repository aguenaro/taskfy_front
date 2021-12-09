import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'hooks/useAuth';
import type { AppProps } from 'next/app';
import { theme } from 'styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
export default MyApp;
