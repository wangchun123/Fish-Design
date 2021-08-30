import React, { useState, useEffect, memo, useMemo } from 'react';
import { Table, Button, Form } from 'antd';
import type { FormInstance } from 'antd/lib/form/Form';
import { cloneDeep } from 'lodash';

export interface EditTableProps {
  value?: Record<string, any>[];
  renderColumns: RenderColumnsProps;
  onChange?: (data: Record<string, any>[]) => void;
  form: FormInstance;
}

export type RenderColumnsProps = (
  handleValueChange: (value: any, dataIndex: string, index: number) => void,
  handleDeleteRow: (index: number) => void,
) => any;

const EditTable: React.FC<EditTableProps> = ({
  renderColumns,
  value,
  onChange,
  form
}) => {
  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);

  const RowKeys = useMemo(() => {
    const obj: Record<string, any> = {};
    renderColumns?.(handleValueChange, handleDeleteRow)?.forEach(
      (item: Record<string, any>) => {
        if (item?.dataIndex) obj[item?.dataIndex] = '';
      },
    );
    return obj;
  }, [renderColumns]);

  const handleValueChange = (val: any, dataIndex: string, index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index][dataIndex] = val;
    setDataSource(newData);
    onChange?.(newData);
  };

  const handleDeleteRow = (index: number) => {
    const newData = cloneDeep(dataSource);
    newData.splice(index, 1);
    setDataSource(newData);
    onChange?.(newData);
  };

  const handleAddRow = () => {
    const newData = cloneDeep(dataSource);
    const item = { key: newData.length + 1, ...RowKeys };
    newData.push(item);
    setDataSource(newData);
    onChange?.(newData);
  };

  const renderTableColumns = () => {
    return renderColumns?.(handleValueChange, handleDeleteRow)?.map(
      (item: Record<string, any>) => {
        return {
          ...item,
          render: (text: any, record: Record<string, any>, index: number) => (
            <Form.Item
              name={`${item.dataIndex}${index}`}
              rules={item?.rules?.(record) ? item.rules(record) : []}
            >
              {item?.render?.(text, record, index)}
            </Form.Item>
          ),
        };
      },
    );
  };

  useEffect(() => {
    setDataSource(value || []);
  }, [value]);

  useEffect(()=>{
    if(value?.length){
        const obj:Record<string, any> = {};
        value.forEach((item, index) => {
            const keys=Object.keys(item)
            keys.forEach(keysItem=>{
                obj[`${keysItem}${index}`]=item[keysItem]
            })
        });

        form.setFieldsValue({
            ...obj,
        });
    }

  },[value])

  return (
    <>
      <Table
        columns={renderTableColumns()}
        dataSource={dataSource}
        pagination={false}
      />
      <Button
        type="dashed"
        onClick={() => handleAddRow()}
        block
        style={{ marginTop: '10px' }}
      >
        新增
      </Button>
    </>
  );
};

export default memo(EditTable);
