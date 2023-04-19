import React from 'react';
import { storiesOf } from '@storybook/react';
import InterestListCreationForm from '../InterestListCreationForm';
import {
  withProvider,
  ContainerFluidDecorator,
  CenterMediumWidthDecorator
} from '../../../../../../../../.storybook/util';

// Stories For InterestListCreationForm
storiesOf(
  'Features/CashGames/InterestList/Components/form/InterestListCreationForm',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Default', () => <InterestListCreationForm onSubmit={() => {}} />);
