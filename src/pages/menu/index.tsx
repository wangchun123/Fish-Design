import React from 'react';
import Menu from '@/components/Menu';

export default () => {
  return (
    <Menu
      data={[
        { url: '123', title: 'qwe', key: '1' },
        { url: '123', title: 'qwe', key: '2' },
      ]}
      onChange={(item, index) => console.log(item, index)}
      defaultSelectedKeys="2"
    />
  );
};
