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
  Skeleton,
  Divider,
  useToast,
  Table,
  Thead,
  Tbody,
  Tfoot,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useApiContract } from "react-moralis";
import { arboristAbi } from "../constants/abi";
import { arboristAddress } from "../constants/addresses";
import { TreeTable, Th, Trh, Tr, Td } from './Table';
import { useRouter } from "next/router";


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
    console.log('Hello, world!');
    runContractFunction();
  }, []);     // eslint-disable-line react-hooks/exhaustive-deps

  if(!data) {
    return (
      <Box paddingLeft="7%" paddingRight="7%">
        <Divider borderColor="#E2E8F0" mb="1em" mt="5em" />
        <Flex>
          <Text fontSize="xl" ml="2em" fontWeight="bold">
            Explore VMTs
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
            colorScheme="facebook"
            m={5}
            onClick={() => runContractFunction()}
            rightIcon={<ChevronDownIcon />}
            bgColor="#365AD2"
            color="#fff"
            _hover={{
              background: "#fff",
              borderColor: "#365AD2",
              color: "#365AD2",
              borderWidth: "1.5px",
              boxShadow: "lg",
            }}
            zIndex="0"
          >
            Load Existing VMTrees
          </Button>
        </Flex>
        {/* <Stack ml="2em" mr="2em">
          <Skeleton height="50px" borderRadius={155} startColor="#F7FAFC"
            endColor="#E2E8F0"/>
          <Skeleton height="50px" borderRadius={155} startColor="#F7FAFC"
            endColor="#E2E8F0"/>
          <Skeleton height="50px" borderRadius={155} startColor="#F7FAFC"
            endColor="#E2E8F0"/>
          <Skeleton height="50px" borderRadius={155} startColor="#F7FAFC"
            endColor="#E2E8F0"/>
          <Skeleton height="50px" borderRadius={155} startColor="#F7FAFC"
            endColor="#E2E8F0"/>
          <Skeleton height="50px" borderRadius={155} startColor="#F7FAFC"
            endColor="#E2E8F0"/>
        </Stack> */}
      </Box>
    );
  }

  return (
    <Box paddingLeft="7%" paddingRight="7%">
      <Divider
          borderColor="#fff"
          mb="1em"
          mt="2em"
        />
      <Flex>
        <Text fontSize="xl" ml="5px" fontWeight="bold" mb="10px">
          Explore VMTs
        </Text>
      </Flex>

      <TableContainer>
      <Table variant='simple' mb="20px">
        <TableCaption fontSize="xs" color="gray.300">List of VMTrees Deployed</TableCaption>
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
          {data &&
            data[1].map((vmtree, index) => {
              // The struct returns data in an array!
              //   struct VMTreeData {
              //     string name;
              //     bool isActive;
              //     address contractAddress;
              //     address controller;
              //     address linkPayer;
              //   }
              return (
                <Tr key={vmtree[2]}>
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

export default ExploreVMTs;
