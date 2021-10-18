import { TextField, OutlinedTextFieldProps } from '@mui/material';
import React from 'react';
import { FieldElement, FieldErrors, FieldValues, UseFormReturn, UseFormRegister } from 'react-hook-form';
import { Staff } from 'API';

// interface Props extends OutlinedTextFieldProps {
//   register: UseFormRegister<Staff>;
//   errors: FieldErrors<Staff>;
// }

const MAX_LENGTH = 5;

export const StaffNameTextField: React.FC<UseFormReturn<Staff>> = (props) => {
  return (
    <TextField
      required
      type='text'
      id='name'
      label='担当者名'
      autoComplete='off'
      margin='dense'
      fullWidth
      autoFocus
      inputProps={{
        maxLength: MAX_LENGTH,
      }}
      error={Boolean(props.formState.errors.name)}
      helperText={props.formState.errors.name && props.formState.errors.name.message}
      // {...inputProps}
      {...props.register('name', {
        required: '担当者名を入力してください',
        // pattern: {
        //   value: /^[0-9]+$/i,
        //   message: '確認コードは半角数字で入力してください',
        // },
        // minLength: { value: MAX_LENGTH, message: '担当者名は' +  MAX_LENGTH  + '桁で入力してください' },
        maxLength: { value: MAX_LENGTH, message: '担当者名は' + MAX_LENGTH + '桁で入力してください' },
      })}
    />
  );
};
