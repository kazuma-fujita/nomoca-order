import { ReactNode } from 'react';
import { MainContainer } from 'components/atoms/main-container';
import { Header } from 'components/molecules/header';
import { Container, Box } from '@mui/material';

export const Main: React.FC = ({ children }) => {
  return (
    // <>
    //   <Header />
    //   <MainContainer>{children}</MainContainer>
    // </>
    <>
      <Header />
      <Box height='12vh' />
      <Box ml={8} mr={8}>
        {children}
      </Box>
    </>
  );
};
