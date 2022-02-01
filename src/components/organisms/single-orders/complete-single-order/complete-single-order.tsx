import BallotIcon from '@mui/icons-material/Ballot';
import { Button } from '@mui/material';
import { Path } from 'constants/path';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useOrderFormParam } from 'stores/use-order-form-param';

type Props = {};

export const CompleteSingleOrder = ({}: Props) => {
  const router = useRouter();
  const { data, mutate } = useOrderFormParam();
  if (!data) {
    router.push(Path.singleOrder);
  }
  const submitHandler = useCallback(() => {
    // It clears all global order form cache.
    mutate(undefined, false);
    router.push(Path.singleOrder);
  }, [mutate, router]);

  return (
    <>
      <h2>ご注文ありがとうございます</h2>
      <Button onClick={submitHandler} variant='contained' startIcon={<BallotIcon />}>
        注文履歴を見る
      </Button>
    </>
  );
};
