import { TextField } from '@mui/material';
import { Staff } from 'API';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = UseFormReturn<Staff> & {
  disabled: boolean;
  name?: string;
};

const MAX_LENGTH = 256;

export const FirstNameTextField = ({ formState, register, disabled, name }: Props) => {
  return (
    <TextField
      required
      type='text'
      id='firstName'
      label='名'
      autoComplete='off'
      disabled={disabled}
      defaultValue={name ?? ''}
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      error={Boolean(formState.errors.firstName)}
      helperText={formState.errors.firstName && formState.errors.firstName.message}
      {...register('firstName', {
        required: '名を入力してください',
        maxLength: { value: MAX_LENGTH, message: '名は' + MAX_LENGTH + '桁で入力してください' },
        // pattern: {
        //   value: /^[0-9]+$/i,
        //   message: '確認コードは半角数字で入力してください',
        // },
      })}
    />
  );
};
