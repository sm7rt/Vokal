import React from 'react';
import {
  AInput,
  ASelect
} from '../../../../common/components/form/AntdSimpleField';
import { Row, Select } from 'antd';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { useTranslation } from 'react-i18next';

type Props = {
  tableIdName: string;
  maxPlayersName: string;
};

/**
 * Table Form
 * @param param0
 */
const TableForm = ({ tableIdName, maxPlayersName }: Props) => {
  const { t } = useTranslation();
  return (
    <Row type="flex" justify="start" align-items="center">
      <Field
        label={t('TABLE_ID')}
        id={tableIdName}
        name={tableIdName}
        type="text"
        component={AInput}
        style={{ width: '100px' }}
        validate={[required()]}
        className="mb-1"
        maxLength="4"
      />
      <Field
        label={t('TABLE_CAPACITY')}
        id={maxPlayersName}
        name={maxPlayersName}
        component={ASelect}
        className="ml-5 mb-1"
        style={{ width: '100px' }}
      >
        {[6, 7, 8, 9, 10].map((num: number) => (
          <Select.Option key={num} value={num}>
            {num}
          </Select.Option>
        ))}
      </Field>
    </Row>
  );
};
export default TableForm;
