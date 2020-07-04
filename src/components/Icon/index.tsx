import React from 'react';
import Success from '@/image/icon/success.svg';
import Error from '@/image/icon/error.svg';

interface Iprops {
  type?: 'success' | 'error';
  size?: 'small' | 'medium' | 'large';
}

const Icon: React.FC<Iprops> = ({ type, size = 'small' }) => {
  let renderIconNode: React.ReactNode;
  let iconSize: string;

  switch (size) {
    case 'small':
      iconSize = '16px';
      break;
    case 'medium':
      iconSize = '24px';
      break;
    case 'large':
      iconSize = '48px';
      break;
  }

  switch (type) {
    case 'success':
      renderIconNode = <img src={Success} alt="" style={{ width: iconSize }} />;
      break;
    case 'error':
      renderIconNode = <img src={Error} alt="" style={{ width: iconSize }} />;
      break;
  }

  return <>{renderIconNode}</>;
};

export default Icon;
