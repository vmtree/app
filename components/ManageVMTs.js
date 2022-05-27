/* eslint-disable */

import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Link,
  Grid,
  GridItem,
  Show,
  SimpleGrid,
  Stack,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useApiContract, useMoralis } from "react-moralis";
import { arboristAbi, vmtreeAbi } from "../constants/abi";
import { arboristAddress } from "../constants/addresses";
import { isAddress, getAddress } from "@ethersproject/address";
import { ConnectButton } from "web3uikit";
import { TreeTable, Th, Trh, Tr, Td } from './Table';


function isNumberString(arg) {
    // 78 is the max length of characters of MaxUint256 in string form
    return /^[0-9]{1,78}$/g.test(arg);
}

const ManageVMTs = (props) => {
  const [myTrees, setMyTrees] = useState([]);
  const [linkPayer, setLinkPayer] = useState();
  const [amount, setAmount] = useState();
  // form handlers
  const handleLinkPayer = (e) => setLinkPayer(e.target.value);
  const handleAmount = (e) => setAmount(e.target.value);
  // errors
  const linkPayerError = !linkPayer || !isAddress(linkPayer);
  const amountError = !amount || !isNumberString(amount);

  // treats arborist contract as backend database
  const getVMTreesOptions = {
    chain: "rinkeby",
    address: arboristAddress,
    functionName: "getVMTrees",
    abi: arboristAbi,
    params: {},
  };
  // useApiContract connects to moralis provider without needing user's wallet
  // to be connected
  const { runContractFunction, data, error, isLoading, isFetching } =
    useApiContract(getVMTreesOptions);
  // get the tree data when the page loads
  useEffect(() => {
    runContractFunction();
  }, []);       // eslint-disable-line react-hooks/exhaustive-deps

  // to make transactions, we need to be connected to the user's wallet.
  // the useMoralis hook gets the account from the ConnectButton and gives us
  // a class to make transactions with.
  const { Moralis, isWeb3Enabled, account } = useMoralis();

  // filter trees when the user connects. it shows all trees for which an
  // account is either the controller or the linkPayer
  useEffect(() => {
    if (data && account) {
      const trees = data[1].filter((vmtree) => {
        return (
          getAddress(vmtree[3]) == getAddress(account) ||
          getAddress(vmtree[2]) == getAddress(account)
        );
      });
      setMyTrees(trees);
    }
  }, [data, account]);

  // for each contract interaction that we can do with the VMTree, we want
  // a pair of functionNameOptions and functionName objects to do the tx.
  // then we add a form + button that calls the functionName
  const topUpLinkOptions = () => ({
    chain: "rinkeby",
    address: arboristAddress,
    functionName: "topUpLink",
    abi: arboristAbi,
    params: { linkPayer, amount },
  });
  async function topUpLink() {
    try {
      const tx = await Moralis.executeFunction(topUpLinkOptions());
      const receipt = await tx.wait();
    } catch (err) {
      console.log(err);
    }
  }

  if (!isWeb3Enabled || !account) {
    return null;
  }

  if (!myTrees.length) {
    return (
      <Box paddingLeft="7%" paddingRight="7%">
        <Flex>
          <Text fontSize="xl" ml="2em" fontWeight="bold">
            Manage VMTs
          </Text>
        </Flex>

        <Flex justifyContent="center" alignItems="center">
          <Button
            variant="solid"
            size="sm"
            borderRadius={155}
            p={5}
            pl={50}
            pr={50}
            m={5}
            rightIcon={<ChevronDownIcon />}
            onClick={() => runContractFunction()}
            bgColor="#EBF8FF"
            color="#365AD2"
            _hover={{
              background: "#365AD2",
              borderColor: "#fff",
              color: "#fff",
              borderWidth: "1.5px",
            }}
            zIndex="0"
          >
            See Your VMTrees
          </Button>
        </Flex>
        <Stack ml="2em" mr="2em">
          <Skeleton
            height="50px"
            borderRadius={155}
            startColor="#F7FAFC"
            endColor="#E2E8F0"
          />
          <Skeleton
            height="50px"
            borderRadius={155}
            startColor="#F7FAFC"
            endColor="#E2E8F0"
          />
        </Stack>
      </Box>
    );
  }

  return (
    <Box paddingLeft="7%" paddingRight="7%">
      <Flex>
        <Text fontSize="xl" ml="5px" fontWeight="bold" mb="10px">
          Manage VMTs
        </Text>
      </Flex>

      <TableContainer>
      <Table variant='simple'>
        <TableCaption fontSize="5xs" color="gray.300">{' '}</TableCaption>
        <Thead>
          <Trh>
            <Th>STATUS</Th>
            <Th>TREE NAME</Th>
            <Th>CONTRACT ADDRESS</Th>
            <Th>CONTROLLER</Th>
            <Th>LINK PAYER</Th>
          </Trh>
        </Thead>
        <Tbody>
          {myTrees.map((vmtree, index) => {
            // The struct returns data in an array!
            //   struct VMTreeData {
            //     string name;
            //     bool isActive;
            //     address contractAddress;
            //     address controller;
            //     address linkPayer;
            //   }
              return (
                <Tr>              
                  <Td>              
                    {vmtree[1] ? (              
                      <Image src="enabled_vmt.svg" alt="enabled" />             
                    ) : (             
                      <Image src="disabled_vmt.svg" alt="disabled" />             
                    )}              
                  </Td>             
                  <Td fontSize='xs'>{/* name */ vmtree[0]}</Td>             
                  <Td fontSize='xs'>{/* contractAddress */ vmtree[2]}</Td>              
                  <Td fontSize='xs'>{/* controller */ vmtree[3]}</Td>             
                  <Td fontSize='xs'>{/* linkPayer */ vmtree[4]}</Td>              
                </Tr>             
              )
            })}
        </Tbody>
      </Table>
    </TableContainer>

    </Box>
  );
};

export default ManageVMTs;