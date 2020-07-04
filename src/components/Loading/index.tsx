import React from 'react';
import Loding from '@/image/loading/loding.gif';

import './index.less';

interface Iprops {
  /**loading 的接受值 */
  children?: React.ReactNode;
  /**loading 的显隐 */
  visible?: boolean;
  /**loading 的全屏模式 */
  fullScreen?: boolean;
  /**loading 的大小*/
  size?: 'small' | 'medium' | 'large';
  /**loading 的定制 */
  lodingIcon?: React.ReactNode;
}

const Loading: React.FC<Iprops> = ({
  visible = true,
  fullScreen = false,
  children,
  size = 'small',
  lodingIcon,
}) => {
  let lodingSize = '';
  switch (size) {
    case 'small':
      lodingSize = '12px';
      break;
    case 'medium':
      lodingSize = '24px';
      break;
    case 'large':
      lodingSize = '48px';
      break;
  }

  return (
    <>
      {visible ? (
        <div className="fish_loading">
          <div className="fish_loading_content">
            <div style={{ opacity: '0.2' }}>{children}</div>
            <div
              className={
                fullScreen
                  ? 'fish_loading_mask_full'
                  : 'fish_loading_mask_default'
              }
            ></div>

            <div
              className={
                fullScreen
                  ? 'fish_loading_icon_full'
                  : 'fish_loading_icon_default'
              }
            >
              <img
                src={lodingIcon ? lodingIcon : Loding}
                alt=""
                style={{ height: lodingSize }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Loading;
