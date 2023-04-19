import { storiesOf } from '@storybook/react';
import { Row } from 'antd';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../../../.storybook/util';
import SeatedPlayerItem from '../SeatedPlayerItem';

// Stories For SeatedPlayerItem
storiesOf('Features/CashGames/RunningGames/Components/SeatedPlayerItem', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <Row className="p-5" type="flex" justify="center">
      <Row className="w-50">
        <SeatedPlayerItem
          player={{ flopId: 1079, requestState: 'SITTED' }}
          onConfirmDelete={(playerId: number) => console.log(playerId)}
        />
      </Row>
    </Row>
  ))
  .add('With Player Name', () => (
    <Row className="p-5" type="flex" justify="center">
      <Row className="w-50">
        <SeatedPlayerItem
          player={{ name: 'Sergio Bellagio', requestState: 'SITTED' }}
          onConfirmDelete={(playerId: number) => console.log(playerId)}
        />
      </Row>
    </Row>
  ))
  .add('Reserved', () => (
    <Row className="p-5" type="flex" justify="center">
      <Row className="w-50">
        <SeatedPlayerItem
          player={{ flopId: 1079, requestState: 'ACCEPTED' }}
          onConfirmDelete={(playerId: number) => console.log(playerId)}
        />
      </Row>
    </Row>
  ))
  .add('Free', () => (
    <Row className="p-5" type="flex" justify="center">
      <Row className="w-50">
        <SeatedPlayerItem
          onConfirmDelete={(playerId: number) => console.log(playerId)}
        />
      </Row>
    </Row>
  ));
