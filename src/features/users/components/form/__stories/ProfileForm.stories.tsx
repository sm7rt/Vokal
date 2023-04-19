import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import {
  withProvider,
  ContainerFluidDecorator,
  CenterMediumWidthDecorator
} from '../../../../../../.storybook/util';
import ProfileForm from '../ProfileForm';

const profile = {
  id: 1096,
  status: 'PENDING',
  firstName: 'Jean',
  lastName: 'Cokto',
  email: 'jean.valjean@gmail.com',
  role: 'ADMIN'
};

// Stories For InviteUserForm
storiesOf('Features/Users/Components/ProfileForm', module)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <ProfileForm initialValues={profile} />);
