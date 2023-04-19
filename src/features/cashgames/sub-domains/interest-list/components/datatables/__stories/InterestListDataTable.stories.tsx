import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../../../.storybook/util';
import { InterestListRow } from '../../../../../models/CashGamesModel.d';
import {
  FlopCashGamesDataTable,
  CasinoCashGamesDataTable
} from '../InterestListDataTable';
// Datas of Datable
export const datas: Array<InterestListRow> = [
  {
    id: '231478',
    state: 'PENDING',
    date: '2019-08-08T08:18:00.73',
    gameSize: '10/20',
    gameVariant: 'NLH',
    playersNumber: 5,
    messagesNumber: 5,
    fees: '50 $'
  },
  {
    id: '546978',
    state: 'ACCEPTED',
    date: '2019-08-08T08:18:00.73',
    gameSize: '5/10',
    gameVariant: 'PLO five a super Omaha',
    playersNumber: 1,
    messagesNumber: 0,
    fees: '20 $'
  },
  {
    id: '5469418',
    state: 'DECLINED',
    date: '2019-08-08T08:18:00.73',
    gameSize: '1/2',
    gameVariant: 'NLH',
    playersNumber: 2,
    messagesNumber: 10,
    fees: '20 $'
  },
  {
    id: '54694322',
    state: 'DECLINED',
    date: '2019-08-08T08:18:00.73',
    gameSize: '1/2',
    gameVariant: 'NLH',
    playersNumber: 0,
    messagesNumber: 10,
    fees: '20 $'
  },
  {
    id: '2334478',
    state: 'PENDING',
    date: '2019-08-08T08:18:00.73',
    gameSize: '10/20',
    gameVariant: 'NLH',
    playersNumber: 5,
    messagesNumber: 5,
    fees: '50 $'
  }
];

// Stories For SigninForm
storiesOf(
  'Features/CashGames/InterestList/Components/InterestListDataTable',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Flop Cash Games DataTable', () => (
    <FlopCashGamesDataTable datas={datas} totalElements={datas.length} />
  ))
  .add('Casino Cash Games DataTable', () => (
    <CasinoCashGamesDataTable datas={datas} totalElements={datas.length} />
  ));
