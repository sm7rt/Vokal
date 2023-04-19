import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../../../.storybook/util';
import { InterestListRow } from '../../../../../models/CashGamesModel.d';
import RunningCashGamesDataTable from '../RunningCashGamesDataTable';
// Datas of Datable
export const datas: Array<InterestListRow> = ['231478', '546978'];

// Stories For SigninForm
storiesOf(
  'Features/CashGames/RunningGames/Components/RunningCashGamesDataTable',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Running Cash Games DataTable', () => (
    <RunningCashGamesDataTable datas={datas} />
  ));
