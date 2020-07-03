import React from 'react';
import Button from '@/components/Button';
import Close from '@/image/dialog/close.png';

import './index.less';

interface Iprops {
  /** dialog的接受值*/
  children?: any;
  /** dialog的显隐*/
  visible?: boolean;
  /** dialog的确认事件*/
  onOk?: () => void;
  /** dialog的取消事件*/
  onCancel?: () => void;
  /** dialog的关闭事件*/
  onClose?: () => void;
  /** dialog的遮罩*/
  hasMask?: boolean;
  /** dialog的标题*/
  title?: React.ReactNode;
  /** dialog的样式定制*/
  style?: object;
  /** dialog的底部按钮显隐*/
  hasFooter?: boolean;
  /** dialog的底部按钮的定制*/
  footerContent?: React.ReactNode[];
  /** dialog的底部按钮的对齐方式*/
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
