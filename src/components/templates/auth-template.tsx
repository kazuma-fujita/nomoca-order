import { AmplifyAuthenticator, AmplifySignIn, AmplifySignUp, AmplifyVerifyContact } from '@aws-amplify/ui-react';
import { Box, Typography } from '@mui/material';
import { CenteringContainer } from 'components/atoms/centering-container';
import Link from 'components/atoms/link';

type Props = {
  pageTitle: string;
};

export const AuthTemplate = (props: Props) => {
  return (
    <CenteringContainer>
      <Typography variant='h2'>{props.pageTitle}</Typography>
      <Box mb={2} />
      <AmplifyAuthenticator usernameAlias='email'>
        <AmplifyVerifyContact />
        <AmplifySignIn slot='sign-in' hideSignUp={true} />
        <AmplifySignUp slot='sign-up' formFields={[{ type: 'username' }, { type: 'password' }]} />
      </AmplifyAuthenticator>
      <Typography variant='body2'>
        ログインしますと <Link href='/'>利用規約</Link> に同意したことになります
      </Typography>
    </CenteringContainer>
  );
};

export default AuthTemplate;
