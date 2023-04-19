import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import {
  ContainerFluidDecorator,
  withProvider,
  CenterMediumWidthDecorator
} from '../../../../../.storybook/util';
import OfferedGamesList from '../OfferedGamesList';
import {
  initialStateGlobal,
  initialStateSettings
} from '../../../../../test/redux/InitialState';

// Stories For SigninForm
storiesOf('Features/Settings/Components/OfferedGamesList', module)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn =>
    withProvider(storyFn, {
      ...initialStateGlobal,
      ...initialStateSettings
    })
  ) // Used if it's a redux form
  .addDecorator(CenterMediumWidthDecorator)
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <OfferedGamesList />);
