import React, { FormEventHandler } from 'react';

type Props = {
  id: string;
  onSubmit: FormEventHandler;
  // key: string;
};

/* react-hook-formがcomponentのdefaultValueのcacheを保持する為、
   formのkeyにユニークな値(timestamp)を設定し表示毎にform以下のcomponentをrenderしdefaultValueのcache clearさせる */
const Form: React.FC<Props> = ({ id, onSubmit, children }) => (
  <form
    id={id}
    onSubmit={onSubmit}
    noValidate
    autoComplete='off'
    // key={props.key}
    // id='signup-form'
  >
    {children}
  </form>
);

export default Form;
