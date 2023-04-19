import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import {
  ContainerFluidDecorator,
  CenterMediumWidthDecorator,
  withProvider
} from '../../../../../.storybook/util';
import ChangePasswordForm from '../ChangePasswordForm';

// Stories For ChangePasswordForm
storiesOf('Features/Authentication/Components/ChangePasswordForm', module)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <ChangePasswordForm
      onChangePassword={data => console.log('Success Change password', data)}
    />
  ))
  .add('New Password', () => (
    <ChangePasswordForm
      newPassword
      onChangePassword={data => console.log('Success Change password', data)}
    />
  ));
