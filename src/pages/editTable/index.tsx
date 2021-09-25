import React, { useEffect } from 'react';
import { Button, Input, InputNumber, Modal, Form, Select } from 'antd';
import EditTable, { RenderColumnsProps } from '@/components/EditTable';
import CustomInput from './customInput';

import { pick } from 'lodash';

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

  /**提交数据 */
  const handelSubmite = () => {
    form.validateFields().then(res => {
      Modal.success({
        title: '获取数据',
        content: (
          <Input.TextArea
            value={JSON.stringify(
              { ...pick(res, ['tableId1', 'tableId2']) },
              null,
              10,
            )}
            autoSize={{ minRows: 20, maxRows: 10 }}
          />
        ),
        bodyStyle: { height: '500px' },
        width: '100vw',
      });
    });
  };

  /**回填数据 */
  useEffect(() => {
    form.setFieldsValue({
      tableId2: list,
    });
  }, []);

  const renderColumns: RenderColumnsProps = handleDeleteRow => [
    {
      title: '序号',
      key: 'keys',
      width: '5%',
      render: (text: any, record: Record<string, any>, index: number) =>
        index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      rules: (record: Record<string, any>) => {
        return [{ required: true, message: 'Please input your username!' }];
      },
      render: (text: any, record: Record<string, any>, index: number) => {
        return <Input style={{ width: '100%' }} />;
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      rules: () => [{ required: true, message: 'Please input your username!' }],
      render: (text: any, record: Record<string, any>, index: number) => {
        return (
          <Select
            style={{ width: '100%' }}
            options={[
              { label: 'tets1', value: '1' },
              { label: 'tets2', value: '2' },
            ]}
          />
        );
      },
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      width: '20%',
      rules: () => [
        {
          validator: (_, value: string) => {
            if (value === '') {
              return Promise.resolve();
            } else if (value) {
              return Promise.resolve();
            }

            return Promise.reject(new Error(' '));
          },
        },
      ],
      render: (text: any, record: Record<string, any>, index: number) => {
        const { age } = record;
        if (age === '1') {
          return <CustomInput defaultValue="" placeholder="默认为空字符串" />;
        }

        return <CustomInput defaultValue={undefined} placeholder="请填写" />;
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
    <Form form={form} layout="vertical">
      <Form.Item
        label="测试一"
        name="tableId1"
        rules={[{ required: true, message: '不能为空' }]}
      >
        <EditTable
          form={form}
          renderColumns={renderColumns}
          //   readOnly={true}
          differNodeKey="tableId1"
          addBtnText="新增你妹"
        />
      </Form.Item>
      <Form.Item name="tableId2" label="测试二">
        <EditTable form={form} renderColumns={renderColumns} readOnly={false} />
      </Form.Item>
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={() => handelSubmite()}>
          提交
        </Button>
      </div>
    </Form>
  );
};
