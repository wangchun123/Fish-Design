import React, { useEffect, useState } from 'react';

import { Input } from 'antd';

interface CustomInputProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: any;
  placeholder?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  defaultValue,
  placeholder,
}) => {
  const [valueChange, setValueChange] = useState<string>();

  useEffect(() => {
    if (value) return;
    onChange?.(defaultValue);
  }, [defaultValue, value]);

  useEffect(() => {
    setValueChange(value);
  }, [value]);

  return (
    <Input
      value={valueChange}
      placeholder={placeholder}
      onChange={({ target: { value } }) => {
        setValueChange(value);
        onChange?.(value);
      }}
    />
  );
};

export default CustomInput;
