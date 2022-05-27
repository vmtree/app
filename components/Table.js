import {
  Flex,
  Text,
  Image,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export const Th = (props) => (
  <Text
    as="th"
    textTransform="uppercase"
    fontSize="xs"
    color="gray.500"
    fontWeight="medium"
    px={4}
    {...props}
  />
);

export const Trh = (props) => (
  <Box
    as="tr"
    w="full"
    height="40px"
    borderRadius="md"
    color="gray.900"
    {...props}
  />
);


export const Tr = (props) => (
  <Box
    as="tr"
    borderBottom="10px solid #fff"
    // borderBottomColor="#fff"
    w="100%"
    height="40px" 
    // bgImage= "url(/tr_bg.svg)"
    mb="10px"
    borderRadius="md"
    color="gray.100"
    boxShadow="9px 9px 13px 0px #c5c6c852"
    {...props}
  />
);

export const Td = (props) => (
  <Box
    as="td"
    color="gray.600"
    p={4}
    // pl="2em" pb="1.75em"
    mb="20px"
    borderBottom="2px solid"
    borderBottomColor="#fff"
    {...props}
  />
);

export const TreeTable = (props) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>List of VMTrees Deployed</TableCaption>
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
          <Tr>
            <Td>
              {x ? (
                  <Image src="enabled_vmt.svg" alt="enabled" />
                ) : (
                  <Image src="disabled_vmt.svg" alt="disabled" />
                )}
            </Td>
            <Td fontSize='xs'>Meeseeks MVTree</Td>
            <Td fontSize='xs'>0x0F653dd95066150992B12D75D7735169F48A7871</Td>
            <Td fontSize='xs'>0x5a7F15934bA2BdeAF36E5Be4206423c12421AAB8</Td>
            <Td fontSize='xs'>0x5a7F15934bA2BdeAF36E5Be4206423c12421AAB8</Td>
          </Tr>
          <Tr>
            <Td>
              {x ? (
                  <Image src="enabled_vmt.svg" alt="enabled" />
                ) : (
                  <Image src="disabled_vmt.svg" alt="disabled" />
                )}
            </Td>
            <Td fontSize='xs'>Meeseeks MVTree</Td>
            <Td fontSize='xs'>0x0F653dd95066150992B12D75D7735169F48A7871</Td>
            <Td fontSize='xs'>0x5a7F15934bA2BdeAF36E5Be4206423c12421AAB8</Td>
            <Td fontSize='xs'>0x5a7F15934bA2BdeAF36E5Be4206423c12421AAB8</Td>
          </Tr>
          <Tr>
            <Td>
              {x ? (
                  <Image src="enabled_vmt.svg" alt="enabled" />
                ) : (
                  <Image src="disabled_vmt.svg" alt="disabled" />
                )}
            </Td>
            <Td fontSize='xs'>Meeseeks MVTree</Td>
            <Td fontSize='xs'>0x0F653dd95066150992B12D75D7735169F48A7871</Td>
            <Td fontSize='xs'>0x5a7F15934bA2BdeAF36E5Be4206423c12421AAB8</Td>
            <Td fontSize='xs'>0x5a7F15934bA2BdeAF36E5Be4206423c12421AAB8</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}
