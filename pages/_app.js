import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { theme } from "../styles";



function MyApp({ Component, pageProps }) {

  //hacky env key handling
  NEXT_PUBLIC_APP_ID = "17lcszN16P19yIIkMvRhTkNgROEtuFujHdFlEgtt"
  NEXT_PUBLIC_SERVER_URL = "https://lflj3dtwafxr.usemoralis.com:2053/server"
  return (
    <ChakraProvider theme={theme}>
      <MoralisProvider
        appId={NEXT_PUBLIC_APP_ID}
        serverUrl={NEXT_PUBLIC_SERVER_URL}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>
  );
}

export default MyApp;
