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
      <div className="menu">
        <Menu
          data={MENU_DATA}
          onChange={(item, index) => history.push(`${item.url}`)}
          defaultSelectedKeys={defaultSelectedKeys}
          menuStyle={{ height: '100vh', background: '#ffff' }}
          personalInformation={
            <div className="personal_information">Fish Design</div>
          }
          helpCenter={
            <div className="index_help_center">
              <a href="https://blog.csdn.net/qq_40959617" target="true">
                CSDN博客网址
              </a>
            </div>
          }
        />
      </div>
      <div className="fish_index_content">
        <div className="fish_index_content_compent">{children}</div>
      </div>
    </div>
  );
};
