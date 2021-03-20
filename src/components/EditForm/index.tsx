import React, { useState, useEffect } from 'react';
import { Button, Collapse, Select, Input, Row, Col, Radio, Modal } from 'antd';

import { cloneDeep } from 'lodash';

const { Panel } = Collapse;
const { Option } = Select;
const { TextArea } = Input;

const Demo = ({ data, saveData }: any) => {
  const [dataSource, setDataSource] = useState([]);

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
  };

  const deleteRule = (index: number) => {
    const newData = cloneDeep(dataSource);
    newData.splice(index, 1);
    saveData && saveData(newData);
    setDataSource(newData);
  };

  const addCondition = (index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index].children.push({ name: '', age: '', addres: '' });
    saveData && saveData(newData);
    setDataSource(newData);
  };

  const deleteCondition = (index: number, idx: number) => {
    const newData = cloneDeep(dataSource);
    newData[index].children.splice(idx, 1);
    saveData && saveData(newData);
    setDataSource(newData);
  };

  const wraperChange = (value: string, name: string, index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index][name] = value;
    saveData && saveData(newData);
    setDataSource(newData);
  };

  const sonChange = (
    value: string,
    name: string,
    index: number,
    idx: number,
  ) => {
    const newData = cloneDeep(dataSource);
    newData[index].children[idx][name] = value;
    saveData && saveData(newData);
    setDataSource(newData);
  };

  const onChangeTitle = (val: boolean, name: string, index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index].isEdit = !newData[index].isEdit;
    saveData && saveData(newData);
    setDataSource(newData);
  };

  const some = async (val: string, name: string, index: number) => {
    const newData = cloneDeep(dataSource);
    newData[index].title = val;
    let time = await new Promise((res, rej) => {
      res(
        setTimeout(() => {
          newData[index].isEdit = !newData[index].isEdit;
        }, 2000),
      );
    });
    saveData && saveData(newData);
    setDataSource(newData);
  };

  useEffect(() => {
    setDataSource(data || []);
  }, [data]);

  return (
    <div className="one">
      <Collapse defaultActiveKey={['1']} style={{ width: '100%' }}>
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
                        onChange={e => some(e.target.value, 'title', index)}
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
                  <Button
                    size="small"
                    onClick={() => onChangeTitle(true, 'isEdit', index)}
                  >
                    编辑
                  </Button>
                </>
              }
              key={index + 1}
              extra={<Button onClick={() => deleteRule(index)}>删除</Button>}
            >
              {item?.children.map((itm, idx) => {
                return (
                  <Row
                    gutter={10}
                    align="middle"
                    wrap={false}
                    key={idx}
                    style={{ marginBottom: '10px' }}
                  >
                    <Col>{idx + 1}</Col>
                    <Col span={7}>
                      <Select
                        style={{ width: '100%' }}
                        value={itm.name}
                        showSearch={true}
                        onChange={val => sonChange(val, 'name', index, idx)}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Select
                        style={{ width: '100%' }}
                        value={itm.age}
                        showSearch={true}
                        onChange={val => sonChange(val, 'age', index, idx)}
                      >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                      </Select>
                    </Col>
                    <Col span={7}>
                      <Input
                        style={{ width: '100%' }}
                        defaultValue={itm.addres}
                        onChange={e =>
                          sonChange(e.target.value, 'addres', index, idx)
                        }
                      ></Input>
                    </Col>
                    <Col>
                      <Button onClick={() => deleteCondition(index, idx)}>
                        删除
                      </Button>
                    </Col>
                  </Row>
                );
              })}
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
