import React from 'react';
import Loading from '@/components/Loading';

import './index.less';

interface Iprops {
  /** button的接受值*/
  children?: any;
  /** button的类型*/
  type?: 'primary' | 'normal';
  /** button的点击事件*/
  onClick?: () => void;
  /** button的文本状态*/
  text?: boolean;
  /** button的icon*/
  icons?: React.ReactNode;
  /** button的禁止*/
  disabled?: boolean;
  /** button的定制样式*/
  style?: object;
  /** button的加载*/
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
    <div
      className="fish_button"
      style={disabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
    >
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
        {icons && <div className="icon_button">{icons}</div>}
        {children}
      </div>
    </div>
  );
};
export default Button;
