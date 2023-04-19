import React from 'react';
import moment from 'moment';
import { storiesOf } from '@storybook/react';
import {
  withProvider,
  ContainerFluidDecorator
} from '../../../../../../../.storybook/util';
import TournamentList from '../TournamentList';

// Stories For SigninForm
storiesOf(
  'Features/Events/SubDomains/Tournaments/Components/TournamentList',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <TournamentList
      eventId="eventId1"
      currentDate={moment().format('DD-MM-YYYY')}
    />
  ));
