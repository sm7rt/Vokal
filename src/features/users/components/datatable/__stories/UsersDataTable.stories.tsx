import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../.storybook/util';
import UsersDataTable from '../UsersDataTable';
import { UserAccount } from '../../../models/UsersModel.d';
// Datas of Datable
export const datas: Array<UserAccount> = [
  {
    id: '231478',
    data: {
      active: false,
      email: 'myemailaddress@mail.com',
      firstName: 'Kevin',
      lastName: 'Inthekitchen',
      role: 'LIMITED_ADMIN'
    }
  },
  {
    id: '546978',
    data: {
      active: false,
      email: 'myemailaddress@mail.com',
      firstName: 'Kevin',
      lastName: 'David',
      role: 'POKER_MANAGER'
    }
  },
  {
    id: '546978',
    data: {
      active: true,
      email: 'myemailaddress@mail.com',
      firstName: 'Brian',
      lastName: 'Smith',
      role: 'COMMUNITY_MANAGER'
    }
  }
];

// Stories For SigninForm
storiesOf('Features/Users/Components/UsersDatatable', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <UsersDataTable
      datas={datas}
      totalElements={datas.length}
      onClickTournament={() => {}}
      onDelete={() => {}}
      onChangePage={() => {}}
    />
  ))
  .add('Owner ', () => (
    <UsersDataTable
      datas={datas}
      totalElements={datas.length}
      onClickTournament={() => {}}
      onDelete={() => {}}
      onChangePage={() => {}}
      owner={{ data: { role: 'ADMIN' } }}
    />
  ));
