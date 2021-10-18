import { Container } from '@mui/material';
import { ReactNode } from 'react';

export const MainContainer: React.FC = ({ children }) => {
  return (
    <>
      <Container
        component='main'
        sx={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          height: '100vh',
        }}
      >
        {children}
      </Container>
    </>
  );
};
