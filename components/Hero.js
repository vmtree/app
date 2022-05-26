import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Divider,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { Icon, Input, Typography } from "web3uikit";

<<<<<<< HEAD
import { useMoralis } from "react-moralis";
import { arboristAbi, linkTokenAbi } from "../constants/abi";
import { arboristAddress, linkTokenAddress } from "../constants/addresses";
=======

import { useWeb3Contract } from "react-moralis";
import { useMoralis, useMoralisWeb3ApiCall } from "react-moralis";

import { abi_deploy_tree } from "../constants/abi";
import { useMoralisWeb3Api, useWeb3ExecuteFunction } from "react-moralis";
>>>>>>> 92c16392e14b5c117cac623d1bd956650d991a12

import { Interface, defaultAbiCoder }  from "@ethersproject/abi/";
import { parseUnits } from "@ethersproject/units";

// transferAndCall `data` encoder
function encodeData(controller, name) {
  const d = defaultAbiCoder.encode(["address", "string"], [controller, name]);
  console.log(d);
  return d;
}

<<<<<<< HEAD
function parseDeployLog(receipt) { 
    const iface = new Interface(arboristAbi);
    return iface.parseLog(receipt.logs[2]).args;
}
=======
// chainlink token address
const address_deploy_trees = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; //TODO: move out later
>>>>>>> 92c16392e14b5c117cac623d1bd956650d991a12

const Hero = ({ handleVMTreeCreation }) => {
  // state
  const [name, setName] = useState("name");
  const [controller, setController] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const [links, setLinks] = useState("1")
  // form handlers
  const handleNameChange = (e) => setName(e.target.value);
  const handleControllerChange = (e) => setController(e.target.value);
  const handleLinksChange = (e) => {
      setLinks(e.target.value || "1");
  }

  // form error validators
  const isNameError = name === "";
  const isControllerError = controller === "";
  const isLinksError = links ? parseUnits(links, 18).lt(parseUnits("1")) : true;

  // format the transaction data for metamask signature
  const options = () => ({
    chain: "rinkeby",
    contractAddress: linkTokenAddress,
    functionName: "transferAndCall",
    abi: linkTokenAbi,
    params: {
      _to: arboristAddress,
      _value: parseUnits(links, 18),
      _data: encodeData(controller, name)
     },
  });

  const { Moralis } = useMoralis();

  async function handleCreateTree() {
    try {
        const tx = await Moralis.executeFunction(options());
        const receipt = await tx.wait();
        const newTreeAddress = parseDeployLog(receipt).tree;
        console.log('newTreeAddress', newTreeAddress);
    } catch(err) {
        console.log(err);
    }
  }

  //   const { native } = useMoralisWeb3Api();
//   const params = {
//     chain: "rinkeby",
//     address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
//     function_name: "transferAndCall",
//     abi: abi_deploy_tree,
//     params: {
//       to: "0xff41a716d5d8555491B3e58ae051765369F19148",
//       value: "1",
//       data: "",
//     },
//   };

//   const { runContractFunction } = useWeb3Contract({
//    chain: "rinkeby",
//     address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
//     function_name: "transferAndCall",
//     abi: abi_deploy_tree,
//     params: {
//       to: "0xff41a716d5d8555491B3e58ae051765369F19148",
//       value: "1",
//       data: "",
//     },
//   });

//   const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
//     native.runContractFunction,
//     { ...params }
    
//   );

//   function handleCreateTree() {
//     console.log("name: ", name);
//     console.log("controller: ", controller);
//     // fetch({ params: params });
//     runContractFunction()
//     console.log("data: ", data)
//   }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <Box
      padding="2em"
      align="center"
      justify="center"
      boxSize="full"
      maxH="5vh"
      minW="100hw"
      as="header"
      w="full"
      mb="20em"
    >
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link>
          <Image src="/add_new_vmt_icon.svg" alt="VMTree" mt="5em" />
        </Link>
        <Button
          bgColor="#365AD2"
          color="#fff"
          leftIcon={<AddIcon />}
          _hover={{
            background: "#fff",
            borderColor: "#365AD2",
            color: "#365AD2",
            borderWidth: "1.5px",
          }}
          onClick={onOpen}
          mb="1em"
          borderRadius={18}
          zIndex="0"
        >
          Deploy A New VMTree
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="full">
            <ModalHeader justifyContent="center">
              Deploy A New VMTree
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Tree Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Enter Tree Name"
                  width="32em"
                  name="tree_name"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Controller&apos;s ETH Address</FormLabel>
                <Input
                  placeholder="Enter Address"
                  width="32em"
                  name="controllers_address"
                  value={controller}
                  onChange={handleControllerChange}
                />
              </FormControl>

              {/* TODO: min value should be 1 */}
              <FormControl mt={4} isRequired>
                <FormLabel>LINKs to Prefund the VMTree</FormLabel>
                <Input
                  placeholder="Enter #LINK"
                  width="32em"
                  name="links"
                  value={links}
                  onChange={handleLinksChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="ghost"
                colorScheme="messenger"
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                bgColor="#365AD2"
                color="#fff"
                _hover={{
                  background: "#fff",
                  borderColor: "#365AD2",
                  color: "#365AD2",
                  borderWidth: "1.5px",
                }}
                onClick={() => {
                  handleCreateTree();
                }}
              >
                Deploy It!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Divider
          borderColor="blackAlpha.300"
          width="50%"
          mb="5em"
          // zIndex="-1"
        />
      </Flex>
    </Box>
  );
};

export default Hero;
