import React from 'react';
import Menu from '@/components/Menu';
import { MENU_DATA } from '@/utils/conts';
import { history } from 'umi';

import './index.less';

let defaultSelectedKeys = '1';

export default ({ children, location }: any) => {
  const { pathname } = location;
  MENU_DATA.forEach(item => {
    if (item.url === pathname) {
      defaultSelectedKeys = item.key;
    }
  });

  return (
    <div className="fish_index">
      <Menu
        data={MENU_DATA}
        onChange={(item, index) => history.push(`${item.url}`)}
        defaultSelectedKeys={defaultSelectedKeys}
        menuStyle={{ height: '100vh' }}
      />
      <div className="fish_index_content">{children}</div>
    </div>
  );
};
