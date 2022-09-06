import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifyVerifyContact } from '@aws-amplify/ui-react';
import { Box, Button, Typography } from '@mui/material';
import { CenteringContainer } from 'components/atoms/centering-container';
import { TermsDialog } from 'components/organisms/terms/terms-dialog';
import useToggle from 'react-use/lib/useToggle';

type Props = {
  pageTitle: string;
};

export const AuthTemplate = (props: Props) => {
  const [on, toggle] = useToggle(false);
  return (
    <>
      <CenteringContainer>
        <Typography variant='h2'>{props.pageTitle}</Typography>
        <Box mb={2} />
        <AmplifyAuthenticator usernameAlias='email'>
          <AmplifyVerifyContact />
          <AmplifySignIn slot='sign-in' hideSignUp={true} />
          <AmplifySignUp slot='sign-up' formFields={[{ type: 'username' }, { type: 'password' }]} />
        </AmplifyAuthenticator>
        <Typography variant='body2'>
          ログインしますと <Button onClick={toggle}>利用規約</Button> に同意したことになります
        </Typography>
      </CenteringContainer>
      <TermsDialog on={on} toggle={toggle} />
    </>
  );
};

export default AuthTemplate;
