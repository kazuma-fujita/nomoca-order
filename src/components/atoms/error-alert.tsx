import React from 'react';
import { Alert } from '@mui/material';

type Props = {
  children: Error | string;
};

export const ErrorAlert: React.FC<Props> = (props) => {
  console.log('in alert:', props.children);
  const errorMessage = props.children instanceof Error ? props.children.message : props.children;
  console.log('error message:', errorMessage);
  return (
    <Alert severity='error'>
      {errorMessage.split('\n').map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </Alert>
  );
};
