import React from 'react';
import Message from '@/components/Message';
import Button from '@/components/Button';

export default () => {
  const handel = () => {};

  return (
    <>
      <p>1.基本用法</p>
      <Button onClick={() => Message.success({ title: '1wqeqwewqewqewq' })}>
        成功
      </Button>
      <Button onClick={() => Message.error({ title: '1ewqeqwewqewqewq' })}>
        失败
      </Button>
    </>
  );
};
