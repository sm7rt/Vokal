import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider,
  CenterMediumWidthDecorator
} from '../../../../../../../.storybook/util';
import RegisteredPlayersList from '../RegisteredPlayersList';

// Stories For SigninForm
storiesOf(
  'Features/CashGames/InterestList/Components/RegisteredPlayersList',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Registered Players List', () => (
    <RegisteredPlayersList gameId="564231" />
  ));
