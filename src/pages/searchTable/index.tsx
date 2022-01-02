import React, { useEffect, useState } from 'react';
import { SearchTable } from '@/components';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd'

const SearchTablePage = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState({});

    const { location: { query } } = history;

    const fetchTableData = () => {
        const payload = {
            current: 1,
            pageSize: 10,
            ...query
        }

        console.log(`payload`, payload)

        setLoading(true)

        new Promise((res, rej) => {
            setTimeout(() => { res({ data: [{ id: 1, some: "qwe", key: 1 }], total: 100 }) }, 3000)
        }).then(res => {
            setLoading(false)
            setTableData(res)
        })
    }

    const formItems = [
        {
            type: 'Input',
            label: '中国红你好啊23123123',
            rules: [{ required: true }],
            name: 'one',
            nodeProps: {
                placeholder: '123',
                onChange: val => {
                    //   alert(val);
                },
            },
        },
        {
            type: 'Select',
            label: 'bhao ',
            name: 'two',
            nodeProps: {
                placeholder: '123',
                options: [
                    { label: 'nihao', value: '1' },
                    { label: 'qweqw', value: '2' },
                ],
                style: { width: '100%' },
            },
        },
    ];

    const columns = [
        {
            title: "栏一",
            dataIndex: "id",
            width: 100,
        },
        {
            title: "栏二",
            dataIndex: "some",
            width: 100,
            render: (value: any) => value,
        },
        {
            title: "操作",
            dataIndex: "some",
            width: 100,
            render: (value: any) => {
                return <Button onClick={() => fetchTableData()}>删除</Button>;
            },
        },
    ]

    useEffect(() => {
        fetchTableData();
    }, [query])


    const { total, data } = tableData || {}

    return (
        <>
            <SearchTable
                formProps={{
                    formItems: formItems,
                    defaultValues: { ...query },
                    loading,
                }}
                tableProps={{
                    columns,
                    loading: loading,
                    dataSource: data || [],
                    pagination: {
                        total,
                        current: +query.current || 1,
                        pageSize: +query.pageSize || 10
                    }
                }}
            />
        </>
    );
};

export default SearchTablePage;
