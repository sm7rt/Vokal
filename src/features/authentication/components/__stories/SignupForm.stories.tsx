import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  ContainerFluidDecorator,
  CenterMediumWidthDecorator,
  withProvider
} from '../../../../../.storybook/util';
import SignupForm from '../SignupForm';

// Stories For SignupForm
storiesOf('Features/Authentication/Components/SignupForm', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <SignupForm onSignup={data => console.log('Success Signup', data)} />
  ));
