import { SimpleGrid, Text } from "@chakra-ui/react";

const TableHeader = (props) => {

    return (
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
    );
}

export default TableHeader;