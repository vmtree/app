import { SettingsIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useApiContract, useMoralis } from "react-moralis";
import { arboristAbi, vmtreeAbi } from "../constants/abi";
import { arboristAddress } from "../constants/addresses";
import { isAddress, getAddress } from "@ethersproject/address";

function isNumberString(arg) {
    // 78 is the max length of characters of MaxUint256 in string form
    return /^[0-9]{1,78}$/g.test(arg);
}

const ManageVMTs = (props) => {
  const [myTrees, setMyTrees] = useState([]);
  const [linkPayer, setLinkPayer] = useState();
  const [amount, setAmount] = useState();
  // form handlers
  const handleLinkPayer = e => setLinkPayer(e.target.value);
  const handleAmount = e => setAmount(e.target.value);
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
  const {
    runContractFunction,
    data,
    error,
    isLoading,
    isFetching,
  } = useApiContract(getVMTreesOptions);
  // get the tree data when the page loads
  useEffect(() => {
    runContractFunction()
  }, []);

  // to make transactions, we need to be connected to the user's wallet.
  // the useMoralis hook gets the account from the ConnectButton and gives us
  // a class to make transactions with.
  const { Moralis, isWeb3Enabled, account } = useMoralis();

  // filter trees when the user connects. it shows all trees for which an
  // account is either the controller or the linkPayer
  useEffect(() => {
    if (data && account) {
        const trees = data[1].filter((vmtree) => {
            return (getAddress(vmtree[3]) == getAddress(account))
                || (getAddress(vmtree[2]) == getAddress(account));
        });
        setMyTrees(trees);
    }
  }, [data, account])

  // for each contract interaction that we can do with the VMTree, we want
  // a pair of functionNameOptions and functionName objects to do the tx.
  // then we add a form + button that calls the functionName
  const topUpLinkOptions = () => ({
      chain: "rinkeby",
      address: arboristAddress,
      functionName: "topUpLink",
      abi: arboristAbi,
      params: { linkPayer, amount }
  });
  async function topUpLink() {
      try {
          const tx = await Moralis.executeFunction(topUpLinkOptions())
          const receipt = await tx.wait();
      } catch (err) {
          console.log(err);
      }
  }

  if (!isWeb3Enabled || !account || !myTrees.length) return null;

  return (
    <Box paddingLeft="7%" paddingRight="7%">
      <Flex>
        <Text fontSize="xl" ml="2em" fontWeight="bold">
          Manage VMTs
        </Text>
      </Flex>

      <Box>
        {/* Header row */}
        <Flex
          //   justifyContent="center"
          pl="5em"
          pr="5em"
          fontSize="xx-small"
          minWidth="max-content"
          alignItems="center"
          gap="2"
        >
          <Flex>
            <Box w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
          </Flex>
          <Flex>
            <GridItem w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
            <GridItem w="100%" h="10" bg="blue.500" />
          </Flex>
        </Flex>

        <Box>
          <SimpleGrid
            columns={25}
            spacing={0.5}
            fontSize="xx-small"
            color="gray.400"
          >
            <Text bg="#fff"></Text>
            <Text bg="#fff">STATUS</Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff">ADDRESS</Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff">NAME</Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff">BALANCE</Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff">USAGE</Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff">CREATED</Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
            <Text bg="#fff"></Text>
          </SimpleGrid>

          { myTrees.map((vmtree, index) => {
              // The struct returns data in an array!
              //   struct VMTreeData {
              //     string name;
              //     bool isActive;
              //     address contractAddress;
              //     address controller;
              //     address linkPayer;
              //   }
              return (
                <Flex
                justifyContent="space-between"
                backgroundColor="#fff"
                borderRadius={155}
                boxShadow="md"
                padding="1em"
                pl="5em"
                pr="5em"
                fontSize="smaller"
                color="gray.600"
                margin="1em"
              >
                <Text>
                    { vmtree[1] ? <Image src="enabled_vmt.svg" alt="enabled" />
                        : <Image src="disabled_vmt.svg" alt="disabled" />
                    }
                </Text>
                <Text>{/* name */ vmtree[0]}</Text>
                <Text>{/* contractAddress */ vmtree[2]}</Text>
                <Text>{/* controller */ vmtree[3]}</Text>
                <Text>{/* linkPayer */ vmtree[4]}</Text>
                <Text isNumeric>{/* linkPayerBalance */ }</Text>
                <Text>
                  <Link href="#">
                    <SettingsIcon />
                  </Link>
                </Text>
              </Flex>
              );
            })
          }
        </Box>
      </Box>
    </Box>
  );
};

export default ManageVMTs;