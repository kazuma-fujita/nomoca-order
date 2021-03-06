import React from 'react';
import { Alert } from '@mui/material';

type Props = {
  /**
   * Display message.
   */
  children: Error | string;
};

export const ErrorAlert: React.FC<Props> = (props) => {
  const errorMessage = props.children instanceof Error ? props.children.message : props.children;
  return (
    <Alert severity='error' role='alert'>
      {errorMessage.split('\n').map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </Alert>
  );
};
