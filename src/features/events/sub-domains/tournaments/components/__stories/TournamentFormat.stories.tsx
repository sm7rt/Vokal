import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withProvider,
  ContainerFluidDecorator
} from '../../../../../../../.storybook/util';
import TournamentFormat from '../TournamentFormat';
import { wrapperMemoryRouter } from '../../../../../../../test/util';
import {
  initialStateEvents,
  initialStateGlobal
} from '../../../../../../../test/redux/InitialState';

// Set the correct location
const initialPageSpecialEvent = {
  router: {
    location: {
      pathname: '/admin/events/eventId1/tournaments/tournament1/format',
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
  'Features/Events/SubDomains/Tournaments/Components/TournamentFormat',
  module
)
  .addDecorator(storyFn =>
    withProvider(storyFn, {
      ...initialStateGlobal,
      ...initialPageSpecialEvent
    })
  ) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () =>
    wrapperMemoryRouter(
      <TournamentFormat
        initialValues={initialStateEvents.events.tournamentList[0]}
      />
    )
  );
