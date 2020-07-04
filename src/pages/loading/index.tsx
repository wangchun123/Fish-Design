import React from 'react';
import Loading from '@/components/Loading';

export default () => {
  return (
    <>
      <p>1.基本用法</p>
      <Loading size="large">
        <div
          style={{
            height: '200px',
            width: '200px',
            textAlign: 'center',
            lineHeight: '200px',
            background: 'red',
          }}
          onClick={() => alert(1)}
        >
          testqweqweqwewqe
        </div>
      </Loading>
    </>
  );
};
