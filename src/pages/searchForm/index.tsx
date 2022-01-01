import React from 'react';
import { SearchForm } from '@/components';

const SearchFormPage = () => {
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
          { label: 'nihao', value: 1 },
          { label: 'qweqw', value: 2 },
        ],
        style: { width: '100%' },
      },
    },
    {
      type: 'Checkbox',
      label: 'bhao ',
      name: 'five',
      nodeProps: {
        placeholder: '123',
        options: [
          { label: 'nihao', value: 1 },
          { label: 'qweqw', value: 2 },
        ],
        style: { width: '100%' },
      },
    },
    {
      type: 'Radio',
      label: 'bhao ',
      name: 'three',
      nodeProps: {
        placeholder: '123',
        options: [
          { label: 'nihao', value: 1 },
          { label: 'qweqw', value: 2 },
        ],
        style: { width: '100%' },
      },
    },
    {
      type: 'Switch',
      label: 'bhao ',
      name: 'three1',
      valuePropName: 'checked',
      nodeProps: {},
    },
    {
      type: 'RangePicker',
      label: 'bhao ',
      name: 'three2',
      nodeProps: {
        style: { width: '100%' },
        showTime: true,
      },
    },
  ];
  return (
    <>
      <SearchForm
        formItems={formItems}
        formSubmit={val => console.log(`val`, val)}
        //   defaultValues={{ two: 2, one: 1 }}
        //   formLayout='horizontal'
        //   isShowBtns={false}
        // isShowForm={false}
        // searchBtnText='确认'
      />
    </>
  );
};

export default SearchFormPage;
