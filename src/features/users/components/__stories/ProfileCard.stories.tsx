import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import {
  ContainerFluidDecorator,
  CenterMediumWidthDecorator,
  withProvider
} from '../../../../../.storybook/util';
import ProfileCard from '../ProfileCard';
import {
  initialStateGlobal,
  initialStateAuthent
} from '../../../../../test/redux/InitialState';

// Stories For ProfileCard
storiesOf('Features/Users/Components/ProfileCard', module)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn =>
    withProvider(storyFn, { ...initialStateGlobal, ...initialStateAuthent })
  ) // Used if it's a redux form
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <ProfileCard />);
