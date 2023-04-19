import React from 'react';
import { storiesOf } from '@storybook/react';
import RunningGameCreationForm from '../RunningGameCreationForm';
import {
  withProvider,
  ContainerFluidDecorator,
  CenterMediumWidthDecorator
} from '../../../../../../../../.storybook/util';

// Stories For RunningGameCreationForm
storiesOf(
  'Features/CashGames/RunningGames/Components/form/RunningGameCreationForm',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Default', () => <RunningGameCreationForm onSubmit={() => {}} />);
