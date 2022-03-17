import { TextField } from '@mui/material';
import { Staff } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Staff> & {
  disabled: boolean;
  name?: string;
};

const MAX_LENGTH = 256;

export const LastNameTextField = ({ formState, register, disabled, name }: Props) => {
  return (
    <TextField
      required
      type='text'
      id='lastName'
      label='性'
      autoComplete='off'
      // margin='dense'
      // fullWidth
      // autoFocus
      disabled={disabled}
      defaultValue={name ?? ''}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      error={Boolean(formState.errors.lastName)}
      helperText={formState.errors.lastName && formState.errors.lastName.message}
      {...register('lastName', {
        required: '性を入力してください',
        maxLength: { value: MAX_LENGTH, message: '性は' + MAX_LENGTH + '桁で入力してください' },
        // pattern: {
        //   value: /^[0-9]+$/i,
        //   message: '確認コードは半角数字で入力してください',
        // },
      })}
    />
  );
};
