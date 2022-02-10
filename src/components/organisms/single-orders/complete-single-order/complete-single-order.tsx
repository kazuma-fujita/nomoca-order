import BallotIcon from '@mui/icons-material/Ballot';
import { Box, Button, Typography } from '@mui/material';
import { CorporateInformation } from 'constants/corporate-information';

type Props = {
  onButtonClick: () => void;
};

export const CompleteSingleOrder = ({ onButtonClick }: Props) => {
  return (
    <Box width='auto' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
      <Typography variant='h4'>ご注文ありがとうございます</Typography>
      <Box mt={8} mb={8}>
        <Typography variant='body2' textAlign='center'>
          お客様のご注文を承けたまりました。 <br />
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
      <Button onClick={onButtonClick} variant='contained' startIcon={<BallotIcon />}>
        注文履歴を見る
      </Button>
    </Box>
  );
};
