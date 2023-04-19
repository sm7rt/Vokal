import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider,
  CenterMediumWidthDecorator
} from '../../../../../.storybook/util';
import PlayerItem from '../PlayerItem';

// Stories For SigninForm
storiesOf('Features/Players/Components/PlayerItem', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('With flop Account Id', () => <PlayerItem player={{ flopId: 1079 }} />)
  .add('With name', () => <PlayerItem player={{ name: 'Sergio Bellagio' }} />)
  .add('With Distance', () => (
    <PlayerItem player={{ flopId: 1079 }} showDistance />
  ))
  .add('With Long Distance', () => (
    <PlayerItem player={{ flopId: 1170 }} showDistance />
  ));
