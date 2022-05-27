import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";
import { theme } from "../styles";
import { NEXT_PUBLIC_APP_ID, NEXT_PUBLIC_SERVER_URL } from "../constants/addresses";


function MyApp({ Component, pageProps }) {

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
