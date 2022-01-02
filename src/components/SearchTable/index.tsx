import React, { FC } from 'react';
import { Table } from 'antd';
import { SearchForm } from '@/components';
import type { FormItem, SearchFormProps } from '../SearchForm';
import qs from 'qs';
import { useHistory } from 'react-router-dom';

interface SearchTableProps {
    formItems?: FormItem[];
    columns?: any
    isNeedMapParamToUrl?: boolean;

    formProps?: SearchFormProps
    
    tableProps?: {}
}

const SearchTable: FC<SearchTableProps> = ({ formProps = {}, tableProps = {} }) => {
    const history = useHistory();

    const formSubmit = async (formValues: Record<string, any>) => {


        history.push({
            search: `${qs.stringify({
                ...(history?.location?.query || {}),
                ...formValues,
            })}`,
        });
    }


    const handleTableChange = (val: Record<string, any>) => {
        const { total, ...rest } = val;


        history.push({
            search: `${qs.stringify({
                ...(history?.location?.query || {}),
                ...rest
            })}`,
        });
    }

    return (
        <>
            <SearchForm
                {...formProps}
                formSubmit={formValues => formSubmit(formValues)}
            />
            &nbsp;
            <Table  {...tableProps} onChange={(val) => handleTableChange(val)} />
        </>
    );
};

export default SearchTable;
