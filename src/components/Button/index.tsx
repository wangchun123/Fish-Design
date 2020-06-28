import React from 'react';
import Loading from '@/components/Loading';

import './index.less';

interface Iprops {
  children?: any;
  type?: string;
  onClick?: () => void;
  text?: boolean;
  icons?: React.ReactNode;
  disabled?: boolean;
  style?: object;
  loading?: boolean;
}

const Button: React.FC<Iprops> = ({
  children,
  type = 'normal',
  onClick,
  text = false,
  icons,
  disabled = false,
  style,
  loading = false,
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

  if (loading) {
    switch (type) {
      case 'primary':
        type_button = 'primary_button_loading';
        break;
      case 'normal':
        type_button = 'normal_button_loading';
        break;
    }
  }

  return (
    <div className="fish_button">
      <div
        className={type_button}
        onClick={() => onClick && onClick()}
        style={JSON.stringify(style) === '{}' ? {} : style}
      >
        {loading && (
          <div className="icon_button">
            <Loading />
          </div>
        )}
        <div className="icon_button">{icons}</div>
        {children}
      </div>
    </div>
  );
};
export default Button;
