import React, { useState, useEffect, memo, useMemo ,isValidElement} from 'react';
import { Table, Button, Form } from 'antd';
import type { FormInstance } from 'antd/lib/form/Form';
import { cloneDeep } from 'lodash';

export interface EditTableProps {
  value?: Record<string, any>[];
  renderColumns: RenderColumnsProps;
  onChange?: (data: Record<string, any>[]) => void;
  form: FormInstance;
  readOnly?:boolean;
  differNodeKey?:string;
  isShowAddBtn?:boolean;
  addBtnText?:string;
}

export type RenderColumnsProps = (
  handleDeleteRow: (index: number) => void,
) => any;

const isObject=(val:any)=> typeof val ==='object';

const tipRenderErrorMessage=(obj:Record<string, any>)=>{
    const virtualDomObj=obj?.props;

    if(isValidElement(virtualDomObj?.children)){
        console.error('Warning: render function in Columns ,Do not wrap elements in the outermost layer')
    }
}

const EditTable: React.FC<EditTableProps> = ({
  renderColumns,
  value,
  onChange,
  form,
  readOnly=false,
  differNodeKey='',
  isShowAddBtn=true,
  addBtnText='新增'
}) => {
  const [dataSource, setDataSource] = useState<Record<string, any>[]>([]);

  const rowKeys = useMemo(() => {
    const obj: Record<string, any> = {};
    renderColumns?.( handleDeleteRow)?.forEach(
      (item: Record<string, any>) => {
        if (item?.dataIndex) obj[item?.dataIndex] = undefined;
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
    const item = { key: newData.length + 1, ...rowKeys };
    newData.push(item);
    setDataSource(newData);
    onChange?.(newData);
  };

  const renderTableColumns = () => {
    return renderColumns?.( handleDeleteRow)?.map(
      (item: Record<string, any>) => {
        return {
          ...item,
          render: (text: any, record: Record<string, any>, index: number) => {
              const nodeObject:Record<string, any>=item?.render?.(text, record, index);
              tipRenderErrorMessage(nodeObject);
              return isValidElement(nodeObject)? <Form.Item
              name={`${differNodeKey}${item.dataIndex}${index}`}
              rules={item?.rules?.(record) ? item.rules(record) : []}
            >
              {{...nodeObject,
                props:{
                    disabled:readOnly,
                    ...nodeObject.props,
                    value:text,
                    onChange:(nodeValue:any)=>{
                        let nodeChangeValue=null;

                        if(isObject(nodeValue)){
                            if(nodeValue?.target){
                                nodeChangeValue=nodeValue?.target?.value
                            }else{
                                nodeChangeValue=nodeValue 
                            }
                        }else{
                            nodeChangeValue=nodeValue
                        }

                        handleValueChange(nodeChangeValue,item.dataIndex,index)
                    }
                    }}}
            </Form.Item>:<Form.Item>{nodeObject}</Form.Item>
          }
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
                obj[`${differNodeKey}${keysItem}${index}`]=item[keysItem]
            })
        });

        form.setFieldsValue({
            ...obj,
        });
    }

  },[value])

  return (
    <>
    {dataSource?.length?
      <Table
        columns={renderTableColumns()}
        dataSource={dataSource}
        pagination={false}
      />
    :null}

    {isShowAddBtn?
      <Button
        type="dashed"
        onClick={() => handleAddRow()}
        block
        style={{ marginTop: '10px' }}
        disabled={readOnly}
      >
        {addBtnText}
      </Button>
    :null}
    </>
  );
};

export default memo(EditTable);
