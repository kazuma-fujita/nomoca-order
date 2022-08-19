import React from 'react';
import { Alert } from '@mui/material';

type Props = {
  /**
   * Display message.
   */
  children: string;
};

export const SuccessAlert: React.FC<Props> = (props) => {
  return (
    <Alert severity='success' role='alert'>
      {props.children.split('\n').map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </Alert>
  );
};
