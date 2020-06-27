import React from 'react';

import './index.less';

interface Iprops {
  children?: any;
  type?: string;
  onClick?: () => void;
  text?: boolean;
  icons?: React.ReactNode;
  disabled?: boolean;
  style?: object;
}

const Button: React.FC<Iprops> = ({
  children,
  type = 'normal',
  onClick,
  text = false,
  icons,
  disabled = false,
  style,
}) => {
  let type_button = '';
  switch (type) {
    case 'primary':
      type_button = 'primary_button';
      break;
    case 'normal':
      type_button = 'normal_button';
      break;
  }

  if (text) {
    type_button = 'text_button';
  }

  if (disabled) {
    type_button = 'disabled_button';
  }

  return (
    <div className="fish_button">
      <div
        className={type_button}
        onClick={() => onClick && onClick()}
        style={JSON.stringify(style) === '{}' ? {} : style}
      >
        <div className="icon_button">{icons}</div>
        {children}
      </div>
    </div>
  );
};
export default Button;
