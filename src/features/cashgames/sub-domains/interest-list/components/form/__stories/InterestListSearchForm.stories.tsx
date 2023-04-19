import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import InterestListSearchForm from '../InterestListSearchForm';
import {
  withProvider,
  ContainerFluidDecorator
} from '../../../../../../../../.storybook/util';

// Stories For InterestListSearchForm
storiesOf(
  'Features/CashGames/InterestList/Components/form/InterestListSearchForm',
  module
)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <InterestListSearchForm />);
