import { Box, Button, Typography } from '@mui/material';
import { CorporateInformation } from 'constants/corporate-information';
import { useCompleteOrder } from 'hooks/orders/use-complete-order';
import { ReactNode } from 'react';

type Props = {
  caption: string;
  buttonLabel: string;
  buttonStartIcon: ReactNode;
};

export const CompleteOrder = ({ caption, buttonLabel, buttonStartIcon }: Props) => {
  const { onButtonClick } = useCompleteOrder();
  return (
    <Box width='auto' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
      <Typography variant='h4'>{caption}</Typography>
      <Box mt={8} mb={8}>
        <Typography variant='body2' textAlign='center'>
          お客様のご注文を承りました。 <br />
          <br />
          商品の到着まで今暫くお待ち下さい。 <br />
          <br />
          ご注文や配送に関してご不明な点はこちらの電話番号よりお問い合わせください。 <br />
          <br />
          <br />
          株式会社GENOVA カスタマーセンター <br />
          <br />
          {CorporateInformation.phoneNumber}
          <br />
        </Typography>
      </Box>
      <Button onClick={onButtonClick} variant='contained' startIcon={buttonStartIcon}>
        {buttonLabel}
      </Button>
    </Box>
  );
};
