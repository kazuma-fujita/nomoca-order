import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToggle } from 'react-use';
import Form from '../../atoms/form';
import { useForm } from 'react-hook-form';

export const CreateStaffDialog = () => {
  // const { handleSubmit, watch, register, errors } = useForm();
  const [on, toggle] = useToggle(false);

  return (
    <div>
      <Button variant='outlined' onClick={toggle}>
        担当者を追加する
      </Button>
      <Dialog open={on} onClose={toggle}>
        {/* <Form onSubmit={}> */}
        <DialogTitle>担当者を追加する</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>担当者名を追加する</DialogContentText> */}
          <TextField autoFocus margin='dense' id='name' label='担当者名' type='text' fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>キャンセル</Button>
          <Button onClick={toggle}>追加する</Button>
        </DialogActions>
        {/* </Form> */}
      </Dialog>
    </div>
  );
};
