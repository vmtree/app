import { useMoralis } from "react-moralis";
import {
  Box,
  Flex,
  Button,
  Text,
  Image,
  Container,
  Code,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import VMTable from "../components/ManageVMTs";
import ManageVMTs from "../components/ManageVMTs";
import ExploreVMTs from "../components/ExploreVMTs";
import Footer from "../components/Footer";
import Head from "next/head";

export default function Dapp() {

  return (
    <>
      <Head>
        <title>VMTree | DAPP </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box w="100vw" maxW="100vw" mt="0" m="auto">
        <NavBar as="header" position="fixed" w="100%" pageType="dapp_page"/>
        <Hero />
        <ManageVMTs />
        <ExploreVMTs />
        <Footer />
      </Box>
    </>
  );
}