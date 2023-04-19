import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import {
  ContainerFluidDecorator,
  withProvider,
  ReduxFormDecorator
} from '../../../../../.storybook/util';
import GeneralInformationForm from '../GeneralInformationForm';

// Stories For SigninForm
storiesOf('Features/Settings/Components/GeneralInformationForm', module)
  .addDecorator(StoryRouter())
  .addDecorator(ReduxFormDecorator) // Used if it's a redux form
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <GeneralInformationForm
      onSubmitForm={data => {
        console.log(data);
      }}
    />
  ));
