import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Box, Popover } from '@mui/material';
import Button from '@mui/material/Button';
import { Clinic } from 'API';
import { MouseEvent, useState } from 'react';
import { ClinicDetail } from './clinic-detail';

type Props = {
  staffName: string;
  clinic: Clinic;
};

export const ClinicDetailButton = ({ staffName, clinic }: Props) => {
  // const [on, toggle] = useToggle(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const label = '配送先';
  return (
    <>
      <Button onClick={handleClick} variant='outlined' startIcon={<LocalShippingIcon />}>
        {label}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box p={4}>
          <ClinicDetail clinic={clinic} staffName={staffName} />
        </Box>
      </Popover>
    </>
  );
};
