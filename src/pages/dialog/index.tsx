import React, { useState } from 'react';
import Dialog from '@/components/Dialog';
import Button from '@/components/Button';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>open</Button>
      <Dialog
        hasMask={true}
        title="nisidisdqweqweqwewqe"
        visible={visible}
        hasFooter={true}
        // footerAlign='right'
        // footerContent={[<Button>12321</Button>, <Button>12321</Button>]}
        style={{ width: '500px' }}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        onClose={() => setVisible(false)}
      >
        qwewq
      </Dialog>
    </>
  );
};
