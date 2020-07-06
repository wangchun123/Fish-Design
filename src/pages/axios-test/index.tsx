import React from 'react';
import Button from '@/components/Button';
import request from '@/utils/request';

export default () => {
  const handleGet = async () => {
    const data = await request({
      method: 'get',
      url: 'https://www.easy-mock.com/mock/5f02c2a4ea559b58ee72379f/some/all',
    });
    console.log('data', data);
  };

  return (
    <>
      <p>1.get请求</p>
      <Button onClick={() => handleGet()}>get</Button>
    </>
  );
};
