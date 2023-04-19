import React from 'react';
import { Select, Spin } from 'antd';
import { makeField } from './AntdSimpleField';

/**
 * Async AutoComplete
 * @param props
 */
const AntdAsyncAutoCompleteField = props => {
  const {
    dataSource,
    fetching,
    onSearch,
    onChange,
    renderOptions,
    loading,
    disabled,
    showArrow,
    filterOption = (inputValue, option) =>
      option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !==
      -1,
    value
  } = props;
  return (
    <Select
      showSearch
      value={value}
      showArrow={showArrow}
      placeholder="Select users"
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={filterOption}
      onSearch={onSearch}
      onChange={onChange}
      style={{ width: '100%' }}
      loading={loading}
      disabled={disabled}
    >
      {dataSource.map(d => renderOptions(d))}
    </Select>
  );
};

export default makeField(AntdAsyncAutoCompleteField);
