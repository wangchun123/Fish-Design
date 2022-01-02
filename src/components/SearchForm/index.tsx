import React, { FC, useEffect } from 'react';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

import {
    Button,
    Row,
    Col,
    Checkbox,
    Radio,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Select,
    Switch,
    TimePicker,
} from 'antd';

const { RangePicker } = DatePicker;

export interface FormItem {
    type: string;
    name: string;
    label?: React.ReactNode;
    rules?: Record<string, any>[];
    span?: number;
    nodeProps?: Record<string, any>;
}

export interface SearchFormProps {
    formItems: FormItem[];
    formSubmit: (formValues: Record<string, any>) => void;
    isShowForm?: boolean;
    defaultValues?: Record<string, any>;
    btnsAlign?: 'start' | 'end';
    formLayout?: 'horizontal' | 'vertical';
    isShowBtns?: boolean;
    searchBtnText?: React.ReactNode;
    resetBtnText?: React.ReactNode;
    isNeedMapParamToUrl?: boolean;
}

const SearchForm: FC<SearchFormProps> = ({
    formItems = [],
    isShowForm = true,
    formSubmit,
    defaultValues = {},
    btnsAlign = 'start',
    formLayout = 'vertical',
    isShowBtns = true,
    searchBtnText = '查询',
    resetBtnText = '重置',
    isNeedMapParamToUrl = false,
}) => {
    const [form] = Form.useForm();
    const history = useHistory();

    const handleFormSubmit = () => {
        form.validateFields().then(formValues => {
            formSubmit?.(formValues);

            isNeedMapParamToUrl &&
                history.push({
                    search: `${qs.stringify({
                        ...(history?.location?.query || {}),
                        ...formValues,
                    })}`,
                });
        });
    };

    const handleFormRest = () => {
        form.resetFields();
    };

    const switchNode = (item: Record<string, any>) => {
        const { nodeProps, ...rest } = item;

        const newRest = { ...rest };
        delete newRest.type;

        switch (item.type) {
            case 'Input':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <Input {...nodeProps} />
                        </Form.Item>
                    </Col>
                );
            case 'Switch':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <Switch {...nodeProps} />
                        </Form.Item>
                    </Col>
                );

            case 'Radio':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <Radio.Group {...nodeProps} />
                        </Form.Item>
                    </Col>
                );

            case 'Checkbox':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <Checkbox.Group {...nodeProps} />
                        </Form.Item>
                    </Col>
                );
            case 'InputNumber':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <InputNumber {...nodeProps} />
                        </Form.Item>
                    </Col>
                );
            case 'DatePicker':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <DatePicker {...nodeProps} />
                        </Form.Item>
                    </Col>
                );
            case 'RangePicker':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <RangePicker {...nodeProps} />
                        </Form.Item>
                    </Col>
                );
            case 'Select':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <Select {...nodeProps} />
                        </Form.Item>
                    </Col>
                );
            case 'TimePicker':
                return (
                    <Col span={item.span || 8}>
                        <Form.Item {...newRest}>
                            <TimePicker {...nodeProps} />
                        </Form.Item>
                    </Col>
                );
            default:
                return '';
        }
    };

    useEffect(() => {
        form.setFieldsValue({ ...defaultValues });
    }, [defaultValues]);

    return (
        <>
            <Form form={form} layout={formLayout}>
                {isShowForm ? (
                    <>
                        <Row wrap={true} gutter={40}>
                            {formItems?.map((item: Record<string, any>, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        {switchNode(item)}
                                    </React.Fragment>
                                );
                            })}
                        </Row>
                        {isShowBtns && (
                            <Row gutter={20} justify={btnsAlign}>
                                <Col>
                                    <Button onClick={() => handleFormSubmit()}>
                                        {searchBtnText}
                                    </Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => handleFormRest()}>
                                        {resetBtnText}
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </>
                ) : null}
            </Form>
        </>
    );
};

export default SearchForm;
