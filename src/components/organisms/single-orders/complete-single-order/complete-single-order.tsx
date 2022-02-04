import BallotIcon from '@mui/icons-material/Ballot';
import { Box, Button } from '@mui/material';

type Props = {
  onButtonClick: () => void;
};

export const CompleteSingleOrder = ({ onButtonClick }: Props) => {
  return (
    <Box width='auto' display='flex' alignItems='center' justifyContent='center'>
      <Box width='auto' display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
        <h2>ご注文ありがとうございます</h2>
        <Button onClick={onButtonClick} variant='contained' startIcon={<BallotIcon />}>
          注文履歴を見る
        </Button>
      </Box>
    </Box>
  );
};
