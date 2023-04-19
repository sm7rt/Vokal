import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withProvider,
  ContainerFluidDecorator
} from '../../../../../../../.storybook/util';
import TournamentStructure from '../TournamentStructure';
import { wrapperMemoryRouter } from '../../../../../../../test/util';
import { initialStateGlobal } from '../../../../../../../test/redux/InitialState';

// Set the correct location
const initialPageSpecialEvent = {
  router: {
    location: {
      pathname: '/admin/events/eventId1/tournaments/tournament1/structure',
      search: '',
      hash: '',
      state: undefined,
      key: 'r1g618'
    },
    action: 'POP'
  }
};

// Stories For SigninForm
storiesOf(
  'Features/Events/SubDomains/Tournaments/Components/TournamentStructure',
  module
)
  .addDecorator(storyFn =>
    withProvider(storyFn, {
      ...initialStateGlobal,
      ...initialPageSpecialEvent
    })
  ) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => wrapperMemoryRouter(<TournamentStructure />));
