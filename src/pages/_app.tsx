import type { AppProps } from "next/app";
// import { ChakraProvider } from "chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
