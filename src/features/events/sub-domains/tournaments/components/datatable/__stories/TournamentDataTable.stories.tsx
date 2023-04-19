import { storiesOf } from '@storybook/react';
import moment from 'moment';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../../../.storybook/util';
import GameVariant from '../../../../../../../common/sagas/static/GameVariant';
import TournamentDataTable from '../TournamentDataTable';

// Datas of Datable
export const datas: Array<GamesApiDefinitions.LiveTournamentDocument> = [
  {
    id: '231478',
    eventID: '#EVT1',
    eventNumber: 'EVT15',
    date: moment().format('YYYY-MM-DD HH:mm'),
    name: "New Year's Tournament",
    gameVariant: GameVariant[2].shortName,
    buyIn: 100,
    fee: 10,
    startStack: 3000,
    lateRegistrationLevel: 15
  },
  {
    id: '546978',
    eventID: '#EVT2',
    eventNumber: 'EVT16',
    date: moment().format('YYYY-MM-DD HH:mm'),
    name: 'Kill The Fish',
    gameVariant: GameVariant[2].shortName,
    buyIn: 50,
    fee: 5,
    startStack: 50000,
    lateRegistrationLevel: 10
  }
];

// Stories For SigninForm
storiesOf(
  'Features/Events/SubDomains/Tournaments/Components/TournamentDatatable',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <TournamentDataTable
      datas={datas}
      totalElements={datas.length}
      onClickTournament={() => {}}
      onDelete={() => {}}
      onChangePage={() => {}}
    />
  ));
