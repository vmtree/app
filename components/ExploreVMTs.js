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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useApiContract } from "react-moralis";
import { arboristAbi } from "../constants/abi";
import { arboristAddress } from "../constants/addresses";

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
  }, [runContractFunction]);

  return (
    <Box paddingLeft="7%" paddingRight="7%">
      <Flex>
        <Text fontSize="xl" ml="2em" fontWeight="bold">
          Explore VMTs
        </Text>
      </Flex>

      <Box>
        {/* Header row */}
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
                  key={vmtree[0]}
                >
                  <Text>
                    {vmtree[1] ? (
                      <Image src="enabled_vmt.svg" alt="enabled" />
                    ) : (
                      <Image src="disabled_vmt.svg" alt="disabled" />
                    )}
                  </Text>
                  <Text>{/* name */ vmtree[0]}</Text>
                  <Text>{/* contractAddress */ vmtree[2]}</Text>
                  <Text>{/* controller */ vmtree[3]}</Text>
                  <Text>{/* linkPayer */ vmtree[4]}</Text>
                  <Text isNumeric>{/* linkPayerBalance */}</Text>
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

export default ExploreVMTs;
