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
import { SettingsIcon } from "@chakra-ui/icons";

const TreeEntry = ({ myTrees }) => {
  return (
    <Box>
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
      })}
    </Box>
  );
};

export default TreeEntry;