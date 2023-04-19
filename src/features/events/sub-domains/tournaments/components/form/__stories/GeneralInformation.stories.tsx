import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  ContainerFluidDecorator,
  CenterMediumWidthDecorator,
  withProvider,
  ReduxFormDecorator
} from '../../../../../../../../.storybook/util';
import GeneralInformation from '../GeneralInformation';

// Stories For GeneralInformation
storiesOf(
  'Features/Events/SubDomains/Tournaments/Components/Form/GeneralInformation',
  module
)
  .addDecorator(ReduxFormDecorator) // Used if it's a redux form
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <GeneralInformation />);
