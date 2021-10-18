import React, { FormEventHandler } from 'react';

type Props = {
  onSubmit: FormEventHandler;
};

const Form: React.FC<Props> = (props) => (
  <form
    onSubmit={props.onSubmit}
    noValidate
    autoComplete='off'
    // key={formKey}
    // id='signup-form'
  >
    {props.children}
  </form>
);

export default Form;
