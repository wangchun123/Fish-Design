import React from 'react';
import Button from '@/components/Button';
import Close from '@/image/dialog/close.png';

import './index.less';

interface Iprops {
  children?: any;
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  hasMask?: boolean;
  title?: React.ReactNode;
  style?: object;
  hasFooter?: boolean;
  footerContent?: React.ReactNode[];
  footerAlign?: 'left' | 'center' | 'right';
}

const Dialog: React.FC<Iprops> = ({
  children,
  visible = false,
  onOk,
  onCancel,
  onClose,
  hasMask = true,
  title,
  style,
  hasFooter = true,
  footerContent = [],
  footerAlign = 'left',
}) => {
  let delFooterAlign = '';

  switch (footerAlign) {
    case 'left':
      delFooterAlign = 'flex-start';
      break;
    case 'right':
      delFooterAlign = 'flex-end';
      break;
    case 'center':
      delFooterAlign = 'center';
      break;
  }

  return (
    <>
      {visible && (
        <div className="fish_dialog">
          {hasMask && <div className="mask"></div>}
          <div
            className="dialog_content"
            style={JSON.stringify(style) === '{}' ? {} : style}
          >
            <div className="top">
              <div className="title">{title}</div>
              <div className="close" onClick={() => onClose && onClose()}>
                <img src={Close} alt="" />
              </div>
            </div>
            <div className="content">{children}</div>
            {hasFooter && (
              <div
                className="footer"
                style={{ justifyContent: delFooterAlign }}
              >
                {footerContent.length > 0 ? (
                  <>
                    {footerContent.map(item => {
                      return item;
                    })}
                  </>
                ) : (
                  <>
                    <Button type="primary" onClick={() => onOk && onOk()}>
                      确认
                    </Button>
                    &nbsp;
                    <Button onClick={() => onCancel && onCancel()}>取消</Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
