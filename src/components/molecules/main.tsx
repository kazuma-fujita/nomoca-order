import { Box } from '@mui/material';
import { Header } from 'components/molecules/header';

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
