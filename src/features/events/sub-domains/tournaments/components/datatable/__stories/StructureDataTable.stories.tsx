import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../../../.storybook/util';
import StructureDataTable from '../StructureDataTable';

// Datas of Datable
const datas = [
  {
    type: 'LEVEL',
    level: 1,
    smallBlind: 10,
    bigBlind: 20,
    ante: 0,
    duration: 20
  },
  {
    type: 'LEVEL',
    level: 2,
    smallBlind: 20,
    bigBlind: 40,
    ante: 0,
    duration: 20
  },
  {
    type: 'LEVEL',
    level: 3,
    smallBlind: 50,
    bigBlind: 100,
    ante: 0,
    duration: 20
  },
  {
    type: 'BREAK',
    duration: 5
  },
  {
    type: 'LEVEL',
    level: 4,
    smallBlind: 75,
    bigBlind: 150,
    ante: 15,
    duration: 20
  },
  {
    type: 'LEVEL',
    level: 5,
    smallBlind: 100,
    bigBlind: 200,
    ante: 30,
    duration: 20
  },
  {
    type: 'LEVEL',
    level: 6,
    smallBlind: 150,
    bigBlind: 300,
    ante: 50,
    duration: 20
  }
];

// Stories For SigninForm
storiesOf(
  'Features/Events/SubDomains/Tournaments/Components/StructureDatatable',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <StructureDataTable datas={datas} />);
