import { storiesOf } from '@storybook/react';
import { Form, Select } from 'antd';
import React from 'react';
import { Field } from 'redux-form';
import {
  CenterMediumWidthDecorator,
  ReduxFormDecorator,
  withProvider
} from '../../../../../.storybook/util';
import AntdAsyncAutoCompleteField from '../AntdAsyncAutoCompleteField';

// Stories For AntdAsyncAutoCompleteField
storiesOf('Components/Form/AntdAsyncAutoCompleteField', module)
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ReduxFormDecorator) // Used if it's a redux form
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .add('Default', () => (
    <Form layout="vertical" style={{ minWidth: '200px' }}>
      <Field
        label="country"
        id="country"
        name="country"
        component={AntdAsyncAutoCompleteField}
        dataSource={['Arménie', 'Belgique', 'Canada', 'France']}
        onSearch={value => console.log(value)}
        renderOptions={(c: string) => (
          <Select.Option key={c}>{c}</Select.Option>
        )}
      />
    </Form>
  ));
