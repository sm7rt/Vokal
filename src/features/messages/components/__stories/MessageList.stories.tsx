import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider,
  CenterMediumWidthDecorator
} from '../../../../../.storybook/util';
import MessagesList from '../MessagesList';

// Stories For SigninForm
storiesOf('Features/Messages/Components/MessagesList', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Messages List', () => <MessagesList gameId="564231" />);
