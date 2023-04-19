import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  CenterMediumWidthDecorator,
  ReduxFormDecorator,
  withProvider
} from '../../../../../../.storybook/util';
import CountryAutocompleteField from '../CountryAutocompleteField';

// Stories For CountryAutocompleteField
storiesOf('Components/Form/Autocomplete/CountryAutocompleteField', module)
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ReduxFormDecorator) // Used if it's a redux form
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .add('Default', () => <CountryAutocompleteField change={() => {}} />);
