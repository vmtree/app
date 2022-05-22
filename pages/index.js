import { useMoralis } from "react-moralis";
import { Box, Container } from "@chakra-ui/react";
import Footer from "../components/Footer";
import LandingPage from "../components/LandingPage";
import Head from "next/head";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>VMTree </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head> 
      
      <Box w="100vw" maxW="100vw" mt="0" m="auto">
        <NavBar as="header" position="fixed" w="100%" pageType="landing_page"/>
        <LandingPage />
        <Footer />
      </Box>
    </>
  );
}
