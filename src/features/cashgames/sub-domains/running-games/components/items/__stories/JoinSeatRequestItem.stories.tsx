import { storiesOf } from '@storybook/react';
import { Row } from 'antd';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../../../.storybook/util';
import JoinSeatRequestItem from '../JoinSeatRequestItem';

// Stories For SigninForm
storiesOf(
  'Features/CashGames/RunningGames/Components/JoinSeatRequestItem',
  module
)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <Row className="p-5" type="flex" justify="center">
      <Row className="w-50">
        <JoinSeatRequestItem gameId="12343" tableId="3242" playerId={1079} />
      </Row>
    </Row>
  ));
