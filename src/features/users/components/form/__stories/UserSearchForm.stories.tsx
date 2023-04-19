import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import UserSearchForm from '../UserSearchForm';
import {
  withProvider,
  ContainerFluidDecorator,
  CenterMediumWidthDecorator
} from '../../../../../../.storybook/util';

// Stories For UserSearchForm
storiesOf('Features/Users/Components/UserSearchForm', module)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <UserSearchForm />);
