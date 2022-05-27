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
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { Icon, Input, Typography } from "web3uikit";

import { useMoralis } from "react-moralis";
import { arboristAbi, linkTokenAbi } from "../constants/abi";
import { arboristAddress, linkTokenAddress } from "../constants/addresses";

import { Interface, defaultAbiCoder }  from "@ethersproject/abi/";
import { parseUnits } from "@ethersproject/units";

// transferAndCall `data` encoder
function encodeData(controller, name) {
  const d = defaultAbiCoder.encode(["address", "string"], [controller, name]);
  console.log(d);
  return d;
}

function parseDeployLog(receipt) { 
    const iface = new Interface(arboristAbi);
    return iface.parseLog(receipt.logs[2]).args;
}

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

  // modal related stuff
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  //toast
  const toast = useToast()

  function showStatusToast() {
    toast({
          title: 'FORM SUBMIT',
          description: 'Your VMTree is getting deployed !',
          status: 'info',
          duration: 4000,
          isClosable: true,
        })
  }

  function showSuccessToast() {
    toast({
          title: 'SUCCESS',
          description: "Congrats! VMTree Created Successfully. Refresh page to see it.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
  }

  // form error validators
  const isNameError = name === "";
  const isControllerError = controller === "";
  const isLinksError = links ? parseUnits(links, 18).lt(parseUnits("1")) : true;

  // format the transaction data for metamask tx signature
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
        onClose()
        showStatusToast()
        const receipt = await tx.wait();
        const newTreeAddress = parseDeployLog(receipt).tree;
        console.log('newTreeAddress', newTreeAddress);
        showSuccessToast()
    } catch(err) {
        console.log(err);
    }
  }

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

              <FormControl mt={4} isRequired>
                <FormLabel>LINKs to Prefund the VMTree</FormLabel>
                <Input
                  placeholder="Enter #LINKs"
                  width="32em"
                  name="links"
                  value={links}
                  onChange={handleLinksChange}
                />
                {isLinksError ? (
                  <FormErrorMessage>LINKs should atleast be one.</FormErrorMessage>
                  ) : (
                    <FormHelperText>
                      Enter the number of LINK tokens to prefund you tree
                    </FormHelperText>
                  )}
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
        />

      </Flex>
    </Box>
  );
};

export default Hero;
