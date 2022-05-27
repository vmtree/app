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
  SimpleGrid,
  Stack,
  Skeleton
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useApiContract } from "react-moralis";
import { arboristAbi } from "../constants/abi";
import { arboristAddress } from "../constants/addresses";
import TableHeader from "./TableHeader";
import TreeEntry from "./TreeEntry";

const ExploreVMTs = (props) => {

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
    runContractFunction();
    console.log("........................>>")
    console.log("........................ appId: ", process.env.NEXT_PUBLIC_APP_ID)
    console.log("........................ serverUrl: ", process.env.NEXT_PUBLIC_SERVER_URL)
    console.log("........................ data: ", data)
  }, [runContractFunction]);

  if(!data){
    return (
      <Box paddingLeft="7%" paddingRight="7%">
      <Flex>
        <Text fontSize="xl" ml="2em" fontWeight="bold">
          Explore VMTs
        </Text>
      </Flex>

      <Box>
        <Flex
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
        <TableHeader/>
        <Box pt={10}>
        <Stack ml="2em" mr="2em">
          <Skeleton height='50px'/>
          <Skeleton height='50px'/>
          <Skeleton height='50px'/>
          <Skeleton height='50px'/>
          <Skeleton height='50px'/>
          <Skeleton height='50px'/>
        </Stack>
        </Box>
      </Box>
    </Box>
    )
  }

  return (
    <Box paddingLeft="7%" paddingRight="7%">
      <Flex>
        <Text fontSize="xl" ml="2em" fontWeight="bold">
          Explore VMTs
        </Text>
      </Flex>

      <Box>
        <Flex
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
        <TableHeader/>
        <Box>
        { data && data[1].map((vmtree, index) => {
              // The struct returns data in an array!
              //   struct VMTreeData {
              //     string name;
              //     bool isActive;
              //     address contractAddress;
              //     address controller;
              //     address linkPayer;
              //   }
              return (
                <TreeEntry myTrees={data[1]} key={data[1][2]}/>
              );
            })
          }
        </Box>
      </Box>
    </Box>
  );
};

export default ExploreVMTs;
