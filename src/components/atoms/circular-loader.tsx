import { CircularProgress, styled } from '@mui/material';
import React, { useEffect } from 'react';

type Props = {
  show: boolean;
};

// 全画面に透明なシャドーを追加
const Shadow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1101,
});

/**
 * ローディングアイコン
 * @param props.show - 表示状態
 */
export const CircularLoader: React.FC<Props> = ({ show, children }) => {
  const invalidationKeys = (event: KeyboardEvent) => {
    if (show) {
      // タブキーでフォーム要素やリンクにフォーカスさせない
      // ローディングアイコン表示中は、どのキーが押されても、キーイベントをキャンセルする
      event.preventDefault();
    }
  };

  useEffect(() => {
    // マウントされたらwindowにキーイベントコールバックを追加
    window.addEventListener('keydown', invalidationKeys);
    return () => {
      // アンマウントされたらwindowにキーイベントコールバックを削除
      window.removeEventListener('keydown', invalidationKeys);
    };
  });

  return (
    <>
      {show && (
        <Shadow>
          <CircularProgress />
        </Shadow>
      )}
      {children}
    </>
  );
};
