import React, { useState, useEffect } from 'react';
import { Button, Input, InputNumber, Modal } from 'antd';
import EditTable, { RenderColumnsProps } from '@/components/EditTable';
import { cloneDeep } from 'lodash';
import styles from './index.less';

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

const Empty = <div className={styles.error}>必填</div>;

export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handelSubmite = () => {
    const newData = cloneDeep(data);
    if (checkError(newData)) return;
    Modal.success({
      title: '获取数据',
      content: (
        <Input.TextArea
          value={JSON.stringify(data, null, 10)}
          autoSize={{ minRows: 20, maxRows: 10 }}
        />
      ),
      bodyStyle: { height: '500px' },
      width: '100vw',
    });
  };

  const checkError = newData => {
    let falg = false;

    const check = (mode, item) => {
      item[mode] = true;
      falg = true;
    };

    newData.length > 0 &&
      newData.forEach(item => {
        const { name, age, tags } = item;
        if (!name) check('nameError', item);
        if (!age) check('ageError', item);
        if (!tags) check('tagsError', item);
      });

    if (falg) setData(newData); //有错误，回填数据显示错误

    return falg;
  };

  const fetchTableData = () => {
    setLoading(true);
    setTimeout(() => {
      setData(list);
      setLoading(false);
    }, 100);
  };

  const saveData = va => {
    const newData = cloneDeep(va);
    setData(newData);
  };

  useEffect(() => {
    fetchTableData();
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
          <>
            <Input
              style={{ width: '100%' }}
              value={text}
              onChange={({ target: { value } }) =>
                handleValueChange(value, 'name', index)
              }
            />
            <>{record.nameError && Empty}</>
          </>
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
          <>
            <Input
              style={{ width: '100%' }}
              value={text}
              onChange={({ target: { value } }) =>
                handleValueChange(value, 'age', index)
              }
            />
            <>{record.ageError && Empty}</>
          </>
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
          <>
            <InputNumber
              style={{ width: '100%' }}
              value={text}
              onChange={value => handleValueChange(value, 'tags', index)}
            />
            <>{record.tagsError && Empty}</>
          </>
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
    <>
      <EditTable
        data={data}
        renderColumns={renderColumns}
        saveData={saveData}
      />
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={() => handelSubmite()}>
          提交
        </Button>
      </div>
    </>
  );
};
