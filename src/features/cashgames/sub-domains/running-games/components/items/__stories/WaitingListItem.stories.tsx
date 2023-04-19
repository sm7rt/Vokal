import { storiesOf } from '@storybook/react';
import { Row } from 'antd';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../../../.storybook/util';
import WaitingListItem from '../WaitingListItem';

// Stories For SigninForm
storiesOf('Features/CashGames/RunningGames/Components/WaitingListItem', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <Row className="p-5" type="flex" justify="center">
      <Row className="w-50">
        <WaitingListItem gameId="12343" player={{ flopId: 1079 }} />
      </Row>
    </Row>
  ))
  .add('With Table Id', () => (
    <Row className="p-5" type="flex" justify="center">
      <Row className="w-50">
        <WaitingListItem
          gameId="12343"
          tableId="3242"
          player={{ flopId: 1079 }}
        />
      </Row>
    </Row>
  ));
