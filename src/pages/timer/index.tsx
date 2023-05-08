import React from 'react';
import { Button } from '@/components';
import { Space } from 'antd';
import { useTimer } from '@/hooks/useTimer';

const Time = () => {
  const { num, start, cancle, stop } = useTimer();

  return (
    <>
      {num}
      <br />
      <br />
      <br />
      <Space>
        <Button onClick={() => start()} type="primary">
          开始
        </Button>
        <Button onClick={() => cancle()} type="primary">
          取消
        </Button>
        <Button onClick={() => stop()} type="primary">
          暂停
        </Button>
      </Space>
    </>
  );
};

export default Time;
