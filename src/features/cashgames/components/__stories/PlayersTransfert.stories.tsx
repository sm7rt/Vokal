import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../.storybook/util';
import PlayersTransfert from '../PlayersTransfert';
import { Row } from 'antd';
import SeatedPlayerItem from '../../sub-domains/running-games/components/items/SeatedPlayerItem';

const playerListLeft = [1171, 1079];

const playerListRight = [1096, 1170, 1089];

// Stories For SigninForm
storiesOf('Features/CashGames/Components', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Players Transfert', () => (
    <Row className="p-5">
      <PlayersTransfert
        titleListLeft={<div>Title Left</div>}
        dataSourceLeft={playerListLeft}
        renderItemLeft={player => (
          <SeatedPlayerItem
            player={player}
            onConfirmDelete={() => {}}
            onConfirmSitPlayer={() => {}}
          />
        )}
        titleListRight={`Title list Right`}
        dataSourceRight={playerListRight}
        renderItemRight={player => (
          <SeatedPlayerItem
            player={player}
            onConfirmDelete={() => {}}
            onConfirmSitPlayer={() => {}}
          />
        )}
        emptyMessageRight="Empty Message Right"
        maxPlayers={10}
      />
    </Row>
  ));
