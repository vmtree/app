import React, { useState } from 'react';
import { Box, Code, Switch, Image } from '@chakra-ui/core';
import { mutate } from 'swr';

import { Td } from './Table';
import { useAuth } from '@/lib/auth';
import { updateFeedback } from '@/lib/db';
import DeleteFeedbackButton from './DeleteFeedbackButton';

const TreeRow = ({ status, name ,contractAddress ,controller ,linkPayer }) => {

  return (
    <Box as="tr" key={id}>
      <Td>
        {status ? (
            <Image src="enabled_vmt.svg" alt="enabled" />
        ) : (
            <Image src="disabled_vmt.svg" alt="disabled" />
        )}
      </Td> 
      <Td fontWeight="medium">{name}</Td>
      <Td>{contractAddress}</Td>
      <Td>{controller}</Td>
      <Td>{linkPayer}</Td>
    </Box>
  );
};

export default TreeRow;


