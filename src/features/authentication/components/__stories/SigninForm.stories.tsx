import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import {
  ContainerFluidDecorator,
  CenterMediumWidthDecorator,
  withProvider
} from '../../../../../.storybook/util';
import SigninForm from '../SigninForm';

// Stories For SigninForm
storiesOf('Features/Authentication/Components/SigninForm', module)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <SigninForm onSignin={data => console.log('Success Signin', data)} />
  ));
