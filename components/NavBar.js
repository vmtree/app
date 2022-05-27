import { Button, Flex, Text, Image, Box, Link, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { ConnectButton } from "web3uikit";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const pageType = props.pageType;
  console.log(pageType);

  return (
    <NavBarContainer {...props} zIndex="100" maxH="80px">
      <Logo w="100px" />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} pageType={pageType} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen, pageType }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Flex mr={10} alignItems="center" justifyContent="center">
        {/* TODO: add doc's link here */}
        <Link href="https://github.com/vmtree/chainlink-vmt#readme" _hover={{ textDecoration: "none" }} isExternal>
          <Button
            variant="solid"
            size="md"
            mr="1em"
            borderRadius={18}
            bg="#fff"
            _hover={{ background: "#2c4cb6", color: "#fff" }}
          >
            <Text fontSize='sm'>
              DOCS
            </Text>
          </Button>
        </Link>
        <SecondButton pageType={pageType}/>
      </Flex>
    </Box>
  );
};

const SecondButton = ({ pageType }) => {
  if (pageType === "landing_page") {
    return (
      <Link href="/dapp" _hover={{ textDecoration: "none" }}>
        <Button
          variant="solid"
          size="md"
          mr="1em"
          borderRadius={18}
          bg="#fff"
          _hover={{ background: "#2c4cb6", color: "#fff" }}
        >
          <Text fontSize='sm'>
              LAUNCH APP
          </Text>
          
        </Button>
      </Link>
    );
  }
  return (
    <ConnectButton
      color="blue"
      moralisAuth={false}
      signingMessage="Sign to login to VMTree"
      zIndex="2147483647"
    />
  );
};

const Logo = (props) => {
  return (
    <Flex alignItems="center">
      <Link href="/" pl={5}>
        <Image src="/vmtree_logo.svg" alt="VMTree" boxSize="90%" />
      </Link>
      <Link href="/" _hover={{ textDecoration: "none" }}>
        <Text
          color="whiteAlpha.900"
          fontWeight="bold"
          textAlign="center"
          fontSize={36}
          letterSpacing="wider"
        >
          VMTree
        </Text>
      </Link>
    </Flex>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={2}
      bg="#365AD2"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
