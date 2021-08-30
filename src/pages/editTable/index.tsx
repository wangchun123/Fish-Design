import React, { useEffect } from 'react';
import { Button, Input, InputNumber, Modal, Form } from 'antd';
import EditTable, { RenderColumnsProps } from '@/components/EditTable';

const list = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    tags: '1',
  },
  {
    key: 2,
    name: 'John Brown',
    age: 32,
    tags: '1',
  },
  {
    key: 3,
    name: 'John Brown',
    age: 32,
    tags: '1',
  },
];

export default () => {
  const [form] = Form.useForm();

  const handelSubmite = () => {
    form.validateFields().then(res => {
      console.log('res', res);
    });

    // Modal.success({
    //   title: '获取数据',
    //   content: (
    //     <Input.TextArea
    //       value={JSON.stringify(data, null, 10)}
    //       autoSize={{ minRows: 20, maxRows: 10 }}
    //     />
    //   ),
    //   bodyStyle: { height: '500px' },
    //   width: '100vw',
    // });
  };

  useEffect(() => {
    const obj = {};
    list.forEach((item, index) => {
      obj[`name${index}`] = item.name;
      obj[`age${index}`] = item.age;
      obj[`tags${index}`] = item.tags;
    });
    
    form.setFieldsValue({
      tableId: list,
      ...obj,
    });
  }, []);

  const renderColumns: RenderColumnsProps = (
    handleValueChange,
    handleDeleteRow,
  ) => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: any, record: Record<string, any>, index: number) => {
        return (
          <Form.Item
            name={`name${index}`}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              style={{ width: '100%' }}
              value={text}
              onChange={({ target: { value } }) =>
                handleValueChange(value, 'name', index)
              }
            />
          </Form.Item>
        );
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      render: (text: any, record: Record<string, any>, index: number) => {
        return (
          <Form.Item
            name={`age${index}`}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              style={{ width: '100%' }}
              value={text}
              onChange={({ target: { value } }) =>
                handleValueChange(value, 'age', index)
              }
            />
          </Form.Item>
        );
      },
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: '10%',
      render: (text: any, record: Record<string, any>, index: number) => {
        return (
          <Form.Item
            name={`tags${index}`}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              value={text}
              onChange={value => handleValueChange(value, 'tags', index)}
            />
          </Form.Item>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      render: (text: any, record: Record<string, any>, index: number) => {
        return (
          <Button
            type="link"
            style={{ marginBottom: '10px' }}
            onClick={() => handleDeleteRow(index)}
          >
            删除
          </Button>
        );
      },
    },
  ];

  return (
    <Form form={form}>
      <Form.Item name="tableId">
        <EditTable renderColumns={renderColumns} />
      </Form.Item>
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={() => handelSubmite()}>
          提交
        </Button>
      </div>
    </Form>
  );
};
