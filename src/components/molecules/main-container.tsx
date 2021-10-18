import { ReactNode } from 'react';
import { CenteringContainer } from 'components/atoms/centering-container';
import { Header } from 'components/molecules/header';

export const MainContainer: React.FC = ({ children }) => {
  return (
    <CenteringContainer>
      <Header />
      {children}
    </CenteringContainer>
  );
};
