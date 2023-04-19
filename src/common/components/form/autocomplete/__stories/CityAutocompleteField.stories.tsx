import { storiesOf } from '@storybook/react';
import React from 'react';
import { Form } from 'antd';
import {
  CenterMediumWidthDecorator,
  ReduxFormDecorator,
  withProvider
} from '../../../../../../.storybook/util';
import CityAutocompleteField from '../CityAutocompleteField';

// Stories For CityAutocompleteField
storiesOf('Components/Form/Autocomplete/CityAutocompleteField', module)
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ReduxFormDecorator) // Used if it's a redux form
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .add('Default', () => (
    <Form layout="vertical" style={{ minWidth: '200px' }}>
      <CityAutocompleteField countryCode="FR" />
    </Form>
  ));
