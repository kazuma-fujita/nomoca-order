import React from 'react';
import { Alert } from '@mui/material';

type Props = {
  children: string | Error;
};

export const ErrorAlert: React.FC<Props> = (props) => {
  const errorMessage = props.children instanceof Error ? props.children.message : props.children;
  return (
    <Alert severity='error'>
      {errorMessage.split('\n').map((item) => (
        <div>{item}</div>
      ))}
    </Alert>
  );
};
