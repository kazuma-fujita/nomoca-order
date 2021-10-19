import React, { FormEventHandler } from 'react';

type Props = {
  onSubmit: FormEventHandler;
  // key: string;
};

/* react-hook-formがcomponentのdefaultValueのcacheを保持する為、
   formのkeyにユニークな値(timestamp)を設定し表示毎にform以下のcomponentをrenderしdefaultValueのcache clearさせる */
const Form: React.FC<Props> = (props) => (
  <form
    onSubmit={props.onSubmit}
    noValidate
    autoComplete='off'
    // key={props.key}
    // id='signup-form'
  >
    {props.children}
  </form>
);

export default Form;
