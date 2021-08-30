import React, { useState, useEffect, memo, useMemo } from 'react';
import { Table, Button } from 'antd';
import { cloneDeep } from 'lodash';

export interface EditTableProps {
  value?: Record<string, any>[];
  renderColumns: RenderColumnsProps;
  onChange?: (data: Record<string, any>[]) => void;
}

export type RenderColumnsProps = (
  handleValueChange: (value: any, dataIndex: string, index: number) => void,
  handleDeleteRow: (index: number) => void,
) => any;

const EditTable: React.FC<EditTableProps> = ({
  renderColumns,
  value,
  onChange,
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

  useEffect(() => {
    setDataSource(value || []);
  }, [value]);

  return (
    <>
      <Table
        columns={renderColumns?.(handleValueChange, handleDeleteRow)}
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
