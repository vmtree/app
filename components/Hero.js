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

import { useWeb3Contract } from "react-moralis";
import { useMoralisWeb3ApiCall } from "react-moralis";
import { abi_deploy_tree } from "../constants/abi";

import { useMoralisWeb3Api } from "react-moralis";
const { defaultAbiCoder } = require("@ethersproject/abi/");

const Hero = ({ handleVMTreeCreation }) => {
  const [name, setName] = useState("name");
  const handleNameChange = (e) => setName(e.target.value);
  const isNameError = name === "";

  const [controller, setController] = useState(
    "0x0000000000000000000000000000000000000000"
  );

  const handleControllerChange = (e) => setController(e.target.value);
  const isControllerError = controller === "";

  function encodeDeploy(controller, name) {
    return defaultAbiCoder.encode(
      ["address", "string"],
      [controller, name] //TODO: values from form
    );
  }

  const { native } = useMoralisWeb3Api();

  // const params = (controller, name) => ({
  //   chain: "rinkeby",
  //   address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
  //   function_name: "transferAndCall",
  //   abi: abi_deploy_tree,
  //   params: {
  //     to: "0xff41a716d5d8555491B3e58ae051765369F19148",
  //     value: 1,
  //     data: encodeDeploy(controller, name)
  //    },
  // })

  const params = {
    chain: "rinkeby",
    address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
    function_name: "transferAndCall",
    abi: abi_deploy_tree,
    params: {
      to: "0xff41a716d5d8555491B3e58ae051765369F19148",
      value: "1",
      data: "",
    },
  };

  const address_deploy_trees = "0x01BE23585060835E02B77ef475b0Cc51aA1e0709"; //TODO: move out later

  const { runContractFunction } = useWeb3Contract({
   chain: "rinkeby",
    address: "0x01BE23585060835E02B77ef475b0Cc51aA1e0709",
    function_name: "transferAndCall",
    abi: abi_deploy_tree,
    params: {
      to: "0xff41a716d5d8555491B3e58ae051765369F19148",
      value: "1",
      data: "",
    },
  });

  const { fetch, data, error, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...params }
    
  );

  function handleCreateTree() {
    console.log("name: ", name);
    console.log("controller: ", controller);
    // fetch({ params: params });
    runContractFunction()
    console.log("data: ", data)
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // const { authenticate, isAuthenticated, user } = useMoralis();
  // // const currUser = Moralis.User.current()
  // // var wallet = user.get("ethAddress");

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
                  value="1"
                  isDisabled="true"
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
                  handleCreateTree()
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
