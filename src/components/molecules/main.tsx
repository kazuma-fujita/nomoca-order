import { ReactNode } from 'react';
import { MainContainer } from 'components/atoms/main-container';
import { Header } from 'components/molecules/header';
import { Container } from '@mui/material';

export const Main: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
    </>
  );
};
