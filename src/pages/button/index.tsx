import React from 'react';
import Button from '@/components/Button';
import Loding from '@/image/loding.gif';

export default () => {
  return (
    <>
      <Button
        type="primary"
        text={false}
        icons={
          <div>
            <img src={Loding} alt="" style={{ height: '12px' }} />
          </div>
        }
        disabled={false}
        onClick={() => alert(1)}
        // style={{ width: '200px' }}
      >
        123qweqwewqewqewqewqe
      </Button>
    </>
  );
};
