import React from 'react';
import Menu from '@/components/Menu';
import { MENU_DATA } from '@/utils/conts';
import { history } from 'umi';

import './index.less';

export default ({ children }: any) => {
  return (
    <div className="fish_index">
      <Menu
        data={MENU_DATA}
        onChange={(item, index) => history.push(`${item.url}`)}
        defaultSelectedKeys="2"
        menuStyle={{ height: '100vh' }}
      />
      <div className="fish_index_content">{children}</div>
    </div>
  );
};
