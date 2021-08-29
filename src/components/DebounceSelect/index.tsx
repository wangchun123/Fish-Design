import React from 'react';
import { Select, Spin, Row, Col, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash/debounce';

interface DebounceSelectProps {
  fetchOptions?: any;
  debounceTimeout?: number;
}

const { Option } = Select;

const DebounceSelect: React.FC<DebounceSelectProps> = ({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const fetchRef = React.useRef(0);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = value => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then(newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      showSearch
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      suffixIcon={<SearchOutlined />}
      optionLabelProp="label"
    >
      {(options || []).map(({ value, label, isUsed }) => (
        <Option value={label} key={value.toString()} disabled={isUsed}>
          <Row justify="space-between">
            <Col>{label}</Col>
            <Col>
              <Button
                disabled={isUsed}
                type="link"
                onClick={() => console.log('123123')}
              >
                添加
              </Button>
            </Col>
          </Row>
        </Option>
      ))}
    </Select>
  );
};

export default DebounceSelect;
