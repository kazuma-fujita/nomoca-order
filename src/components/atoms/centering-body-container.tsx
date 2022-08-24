import { Box } from '@mui/material';
import React from 'react';

export const CenteringBodyContainer: React.FC = ({ children }) => {
  return (
    <Box width='auto' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
      <Box width='70%'>{children}</Box>
    </Box>
  );
};
