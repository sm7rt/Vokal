import React from 'react';
import { storiesOf } from '@storybook/react';
import EventCreationForm from '../EventCreationForm';
import {
  withProvider,
  ContainerFluidDecorator,
  CenterMediumWidthDecorator
} from '../../../../../../.storybook/util';

// Stories For SigninForm
storiesOf('Features/Events/Component/form/EventCreationForm', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Default', () => <EventCreationForm onSubmit={() => {}} />)
  .add('Edition', () => <EventCreationForm edition onSubmit={() => {}} />);
