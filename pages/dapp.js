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
import { ConnectButton } from "web3uikit";
import { useWeb3Contract } from "react-moralis";
import { abi_deploy_tree } from "../constants/abi";
import Head from "next/head";

export default function Dapp() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut } =
    useMoralis();
  
  const address_deploy_trees = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709";    //TODO: move out later

  const { runContractFunction } = useWeb3Contract({
    abi: abi_deploy_tree,
    contractAddress: address_deploy_trees,
    functionName: "transferAndCall",
    params: {
      _param1: 1, //TODO: put me
    },
  });

  const handleVMTreeCreation = () => {
    runContractFunction();
    console.log(".........................");
  };

  return (
    <>
      <Head>
        <title>VMTree | DAPP </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box w="100vw" maxW="100vw" mt="0" m="auto">
        <NavBar as="header" position="fixed" w="100%" pageType="dapp_page"/>
        <Hero handleVMTreeCreation={handleVMTreeCreation} />
        <ManageVMTs />
        <ExploreVMTs />
        <Footer />
      </Box>
    </>
  );
}
