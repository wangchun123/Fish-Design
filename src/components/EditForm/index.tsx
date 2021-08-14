import React, { FC, useState, useEffect } from 'react';
import { Button, Collapse, Input, Row, Col, Radio } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { cloneDeep } from 'lodash';

interface DemoProps {
  /** 回显的数据 */
  data?: any;
  /** 搜集数据 */
  saveData?: (val: any) => void;

  /** 手动渲染第二层子节点的变化 */
  renderChildrenNode?: {
    renderChildrenLeftNode: (
      item: Record<string, any>,
      fun: (param: any) => void,
    ) => React.ReactNode;
    renderChildrenCenterNode: (
      item: Record<string, any>,
      fun: (param: any) => void,
    ) => React.ReactNode;
    renderChildrenRightNode: (
      item: Record<string, any>,
      fun: (param: any) => void,
    ) => React.ReactNode;
  };
}

const { Panel } = Collapse;
const { TextArea } = Input;

const Demo: FC<DemoProps> = ({ data, saveData, renderChildrenNode }) => {
  const [dataSource, setDataSource] = useState([]);
  const [panelActiveKey, setPanelActiveKey] = useState([1]);

  /**
   * 添加规则
   */
  const addRule = () => {
    const newData = cloneDeep(dataSource);
    newData.push({
      title: '',
      isEdit: false,
      dec: '',
      check: '',
      children: [{ name: '', age: '', addres: '' }],
    });
    saveData && saveData(newData);
    setDataSource(newData);
    setPanelActiveKey(newData.length);
  };

  /**
   * 删除规则
   */
  const deleteRule = (index: number) => {
    const newData = cloneDeep(dataSource);
    newData.splice(index, 1);
    saveData && saveData(newData);
    setDataSource(newData);
  };

  /**
   * 添加条件
   */
  const addCondition = (index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index].children.push({ name: '', age: '', addres: '' });
    saveData && saveData(newData);
    setDataSource(newData);
  };

  /**
   * 删除条件
   */
  const deleteCondition = (index: number, idx: number) => {
    const newData = cloneDeep(dataSource);
    newData[index].children.splice(idx, 1);
    saveData && saveData(newData);
    setDataSource(newData);
  };

  /**
   * 第一层数据改变的事件
   */
  const wraperChange = (value: string, name: string, index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index][name] = value;
    saveData && saveData(newData);
    setDataSource(newData);
  };

  /**
   * 第二层数据改变的事件
   */
  const sonChange = (
    value: string,
    name: string,
    index: number,
    childrenIndex: number,
  ) => {
    const newData = cloneDeep(dataSource);
    newData[index].children[childrenIndex][name] = value;
    saveData && saveData(newData);
    setDataSource(newData);
  };

  /**
   * 修改标题的事件
   */
  const handleEditTitle = (val: boolean, name: string, index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index].isEdit = !newData[index].isEdit;
    saveData && saveData(newData);
    setDataSource(newData);
  };

  /**
   * 标题的触发事件
   */
  const onChangeTitle = async (val: string, name: string, index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index].title = val;
    saveData && saveData(newData);
    setDataSource(newData);
  };

  /**
   * 渲染第二层的子级节点的，左边的节点
   */
  const renderChildrenLeftNode = (
    childrenItem: Record<string, any>,
    childrenIndex: number,
    index: number,
  ) => {
    const valueCallBack = (val, paramKey = 'name') =>
      sonChange(val, paramKey, index, childrenIndex);

    return renderChildrenNode?.renderChildrenLeftNode(
      childrenItem,
      valueCallBack,
    );
  };

  /**
   * 渲染第二层的子级节点的，中间的节点
   */
  const renderChildrenCenterNode = (
    childrenItem: Record<string, any>,
    childrenIndex: number,
    index: number,
  ) => {
    const valueCallBack = (val, paramKey = 'age') =>
      sonChange(val, paramKey, index, childrenIndex);

    return renderChildrenNode?.renderChildrenCenterNode(
      childrenItem,
      valueCallBack,
    );
  };

  /**
   * 渲染第二层的子级节点的，右边的节点
   */
  const renderChildrenRightNode = (
    childrenItem: Record<string, any>,
    childrenIndex: number,
    index: number,
  ) => {
    const valueCallBack = (val, paramKey = 'addres') =>
      sonChange(val, paramKey, index, childrenIndex);

    return renderChildrenNode?.renderChildrenRightNode(
      childrenItem,
      valueCallBack,
    );
  };

  useEffect(() => {
    setDataSource(data || []);
  }, [data]);

  return (
    <div className="one">
      <Collapse
        activeKey={panelActiveKey}
        onChange={value => setPanelActiveKey(value)}
        style={{ width: '100%' }}
      >
        {dataSource.map((item, index) => {
          return (
            <Panel
              header={
                <>
                  <span>{index + 1}</span>
                  {item.isEdit ? (
                    <>
                      <Input
                        style={{ width: '100px' }}
                        value={item.title}
                        onChange={e =>
                          onChangeTitle(e.target.value, 'title', index)
                        }
                        onBlur={() => {
                          const newData = cloneDeep(dataSource);
                          newData[index].isEdit = !newData[index].isEdit;
                          setDataSource(newData);
                        }}
                        ref={el => el?.focus()}
                      />
                    </>
                  ) : (
                    <>{item.title}</>
                  )}

                  <EditOutlined
                    onClick={() => handleEditTitle(true, 'isEdit', index)}
                  />
                </>
              }
              key={index + 1}
              extra={<DeleteOutlined onClick={() => deleteRule(index)} />}
            >
              {item?.children?.map(
                (childrenItem: Record<string, any>, childrenIndex: number) => {
                  return (
                    <Row
                      gutter={10}
                      align="middle"
                      wrap={false}
                      key={childrenIndex}
                      style={{ marginBottom: '10px' }}
                    >
                      <Col>{childrenIndex + 1}</Col>
                      <Col span={7}>
                        {renderChildrenLeftNode(
                          childrenItem,
                          childrenIndex,
                          index,
                        )}
                      </Col>
                      <Col span={7}>
                        {renderChildrenCenterNode(
                          childrenItem,
                          childrenIndex,
                          index,
                        )}
                      </Col>
                      <Col span={7}>
                        {renderChildrenRightNode(
                          childrenItem,
                          childrenIndex,
                          index,
                        )}
                      </Col>
                      <Col>
                        <DeleteOutlined
                          onClick={() => deleteCondition(index, childrenIndex)}
                        />
                      </Col>
                    </Row>
                  );
                },
              )}
              <Button
                type="dashed"
                style={{
                  width: '100%',
                  marginTop: '10px',
                }}
                onClick={() => addCondition(index)}
              >
                +添加条件
              </Button>
              <Row
                align="middle"
                gutter={10}
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                <Col>条件表达式</Col>
                <Col>
                  <Radio.Group
                    value={item.check}
                    onChange={e => wraperChange(e.target.value, 'check', index)}
                  >
                    <Radio.Button value="a">Hangzhou</Radio.Button>
                    <Radio.Button value="b">Shanghai</Radio.Button>
                    <Radio.Button value="c">Beijing</Radio.Button>
                    <Radio.Button value="d">Chengdu</Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>

              <TextArea
                rows={4}
                value={item.dec}
                onChange={e => {
                  wraperChange(e.target.value, 'dec', index);
                }}
              />
            </Panel>
          );
        })}
      </Collapse>
      <Button
        type="dashed"
        style={{ width: '100%', marginTop: '10px' }}
        onClick={() => addRule()}
      >
        +添加规则
      </Button>
    </div>
  );
};

export default Demo;
