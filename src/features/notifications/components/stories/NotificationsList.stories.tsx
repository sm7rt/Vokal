import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider,
  CenterMediumWidthDecorator
} from '../../../../../.storybook/util';
import NotificationsList from '../NotificationsList';
import {
  initialStateGlobal,
  initialStateAuthent
} from '../../../../../test/redux/InitialState';

// Stories For SigninForm
storiesOf('Features/Notifications/Components/NotificationsList', module)
  .addDecorator(storyFn =>
    withProvider(storyFn, { ...initialStateGlobal, ...initialStateAuthent })
  ) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Notiications List', () => <NotificationsList />);
