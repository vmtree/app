import React from 'react';
import { Box } from '@chakra-ui/core';

import { Table, Tr, Th } from './Table';
import TreeRow from './TreeRow';

const TreeTable = (props) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>STATUS</Th>
            <Th minW="150px">VRMC NAME</Th>
            <Th>CONTRACT ADDRESS</Th>
            <Th>CONTROLLER</Th>
            <Th >LINK PAYER</Th>
          </Tr>
        </thead>
        <tbody>
          {props.trees.map((feedback) => (
            <TreeRow key={feedback.id} {...feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default TreeTable;
