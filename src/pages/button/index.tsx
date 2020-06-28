import React from 'react';
import Button from '@/components/Button';

import './index.less';

export default () => {
  return (
    <div className="test_button">
      <p>1.button的几种类型:</p>
      <div className="package">
        <Button>normal</Button>
        <br />
        <Button type="primary">primary</Button>
      </div>
      <p>2.button的文字模式</p>
      <div className="package">
        <Button text={true}>text</Button>
        <br />
        <Button text={true}>test</Button>
      </div>
      <p>3.不可用状态</p>
      <div className="package">
        <Button disabled={true} onClick={() => alert(1)}>
          disabled
        </Button>
      </div>
      <p>4.按钮loading</p>
      <div className="package">
        <Button
          type="primary"
          text={false}
          loading={true}
          // icons={<img src={Loding} alt="" style={{ height: '12px' }} />}
          disabled={false}
          onClick={() => alert(1)}
          style={{ width: '200px' }}
        >
          123qweqwewqewqewqewqe
        </Button>
      </div>
      <p>5.按钮icons</p>
      <div className="package">
        <Button
          type="primary"
          text={false}
          icons={
            <img
              src="https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
              alt=""
              style={{ height: '16px' }}
            />
          }
          disabled={false}
          onClick={() => alert(1)}
          style={{ width: '200px' }}
        >
          123qweqwewqewqewqewqe
        </Button>
      </div>
    </div>
  );
};
