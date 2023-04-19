import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withProvider,
  ContainerFluidDecorator
} from '../../../../../../../.storybook/util';
import TournamentInformation from '../TournamentInformation';
import { wrapperMemoryRouter } from '../../../../../../../test/util';
import {
  initialStateEvents,
  initialStateGlobal
} from '../../../../../../../test/redux/InitialState';

// Set the correct location
const initialPageSpecialEvent = {
  router: {
    location: {
      pathname: '/admin/events/eventId1/tournaments/tournament1/information',
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
  'Features/Events/SubDomains/Tournaments/Components/TournamentInformation',
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
      <TournamentInformation
        initialValues={initialStateEvents.events.tournamentList[0]}
      />
    )
  );
