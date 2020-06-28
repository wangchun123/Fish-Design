import React, { useState } from 'react';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';

import './index.less';

export default () => {
  const [visible, setVisible] = useState(false);
  const [visibleTwo, setVisibleTwo] = useState(false);

  return (
    <div className="test_dialog">
      <p>1.Open dialog</p>
      <Button onClick={() => setVisible(true)} type="primary">
        Open dialog
      </Button>
      <Dialog
        title="nisidisdqweqweqwewqe"
        visible={visible}
        style={{ width: '500px' }}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onClose={() => setVisible(false)}
      >
        qwewq
      </Dialog>

      <p>2.定制底部按钮</p>
      <Button onClick={() => setVisibleTwo(true)} type="primary">
        Open dialog
      </Button>

      <Dialog
        title="nisidisdqweqweqwewqe"
        visible={visibleTwo}
        footerContent={[
          <Button
            type="primary"
            onClick={() => setVisibleTwo(false)}
            loading={true}
          >
            confirm
          </Button>,
          <Button
            style={{ marginLeft: '10px' }}
            onClick={() => setVisibleTwo(false)}
          >
            cancel
          </Button>,
        ]}
        style={{ width: '500px' }}
        onClose={() => setVisibleTwo(false)}
      >
        qwewq
      </Dialog>
    </div>
  );
};
