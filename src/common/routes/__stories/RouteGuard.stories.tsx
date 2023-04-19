import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../.storybook/util';
import RouteGuard from '../RouteGuard';

// Stories For RouteGuard
storiesOf('Routes/RouteGuard', module)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <RouteGuard
      exact
      path=""
      component={() => <div />}
      layout={() => <div />}
      secure
      authorizationStatus="PENDING"
    />
  ));
