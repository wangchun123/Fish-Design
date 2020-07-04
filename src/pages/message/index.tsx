import React from 'react';
import { Message } from '@/components/Message';
import Button from '@/components/Button';

export default () => {
  const handel = () => {
    Message.success({ title: '123123' });
  };

  return (
    <>
      <Button onClick={() => handel()}>成功</Button>
    </>
  );
};
