import React, { useState } from 'react';

import './index.less';

interface Item {
  /** menu的子项的路径*/
  url?: string;
  /** menu的子项的标题*/
  title?: string | React.ReactNode;
  /** menu的子项的选中状态*/
  isActive?: boolean;
  /** menu的子项的唯一key值*/
  key?: string;
}

interface Iprops {
  /** menu的渲染数据*/
  data?: Item[];
  /** menu的子项的点击事件*/
  onChange?: (item: Item, index: number) => void;
  /** menu的默认展示的子项*/
  defaultSelectedKeys?: string;
  /** menu的子项定制样式*/
  itemStyle?: object;
  /** menu的样式定制*/
  menuStyle?: object;
  /** menu的顶部放置区域*/
  personalInformation?: React.ReactNode;
  /** menu的底部放置区域*/
  helpCenter?: React.ReactNode;
}

const Menu: React.FC<Iprops> = ({
  data = [],
  onChange,
  defaultSelectedKeys,
  itemStyle,
  menuStyle,
  personalInformation,
  helpCenter,
}) => {
  const [menuData, setMenuData] = useState(data);

  if (defaultSelectedKeys) {
    data.forEach(item => {
      if (item.key === defaultSelectedKeys) {
        item.isActive = true;
      }
    });
  }

  const handelClick = (item: object, index: number) => {
    const newData = JSON.parse(JSON.stringify(menuData));
    newData.forEach((item: any) => {
      item.isActive = false;
    });
    newData[index].isActive = true;
    setMenuData(newData);
  };

  return (
    <div className="fish_menu">
      <div
        className="content"
        style={JSON.stringify(menuStyle) === '{}' ? {} : menuStyle}
      >
        {personalInformation}
        <div className="menu-content">
          {menuData.map((item, index) => {
            return (
              <span
                className={item.isActive ? 'item-active' : 'item-default'}
                key={item.key}
                style={JSON.stringify(itemStyle) === '{}' ? {} : itemStyle}
                onClick={() => {
                  handelClick(item, index);
                  onChange && onChange(item, index);
                }}
              >
                {item.title}
              </span>
            );
          })}
        </div>
        <div className="help_center">{helpCenter}</div>
      </div>
    </div>
  );
};

export default Menu;
