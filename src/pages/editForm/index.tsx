import React, { useState, useRef } from 'react';
import EditForm from '@/components/EditForm';
import { Button, Modal, Input } from 'antd';

const data = [
  {
    title: '测试1',
    isEdit: false,
    dec: '描述',
    check: 'b',
    children: [{ name: 'jack', age: 'tom', addres: '中国' }],
  },
];
const Demo = () => {
  const [dataSource, setDataSource] = useState(data);

  const saveData = val => {
    setDataSource(val);
  };

  return (
    <>
      <EditForm data={dataSource} saveData={val => saveData(val)}></EditForm>
      <Button
        type="primary"
        onClick={() =>
          Modal.success({
            title: '获取数据',
            content: (
              <Input.TextArea
                value={JSON.stringify(dataSource, null, 10)}
                autoSize={{ minRows: 20, maxRows: 10 }}
              />
            ),
            bodyStyle: { height: '500px' },
            width: '100vw',
          })
        }
      >
        提交
      </Button>
    </>
  );
};
export default Demo;
