import React, { useState } from 'react';

import './index.less';

interface Item {
  url?: string;
  title?: string | React.ReactNode;
  isActive?: boolean;
  key?: string;
}

interface Iprops {
  data?: Item[];
  onChange?: (item: Item, index: number) => void;
  defaultSelectedKeys?: string;
  itemStyle?: object;
  menuStyle?: object;
}

const Menu: React.FC<Iprops> = ({
  data = [],
  onChange,
  defaultSelectedKeys,
  itemStyle,
  menuStyle,
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
    </div>
  );
};

export default Menu;
