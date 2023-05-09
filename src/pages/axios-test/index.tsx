import React from 'react';
import Button from '@/components/Button';
import request from '@/utils/request';

export default () => {
  const handleGet = async () => {
    const data = await request({
      method: 'get',
      url:
        'https://www.fastmock.site/mock/75fa8d6f3f9a9b2de2eab2c8c15da4c2/example/crops/api/hallmarket/queryTargetOverView',
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
