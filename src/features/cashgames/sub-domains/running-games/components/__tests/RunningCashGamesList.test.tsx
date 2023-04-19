import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '../../../../../../../test/redux';
import { wrapperMemoryRouter } from '../../../../../../../test/util';
import RunningCashGamesList from '../RunningCashGamesList';
import {
  initialStateGlobal,
  initialStateAuthent,
  initialStateCasinos
} from '../../../../../../../test/redux/InitialState';
import Immutable from 'seamless-immutable';
import { submit } from 'redux-form';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';
import FixtureRunningCashGamesApi from '../../services/FixtureRunningCashGamesApi';
import { Select } from 'antd';

const RunningGamesContentOneGameResult = (queryParams: string) => ({
  status: 200,
  data: {
    content: [
      {
        liveGameKey: '231478',
        date: '2019-08-08T08:18:00.73',
        gameSize: '10/20',
        gameVariant: 'NLH',
        tables: [
          {
            id: '45654465',
            tableId: '1',
            maxPlayers: 10,
            players: [
              {
                id: 'player1',
                flopId: 1119,
                requestState: 'SITTED'
              },
              {
                id: 'player2',
                flopId: 1212,
                requestState: 'SITTED'
              }
            ]
          },
          {
            id: '2564465',
            tableId: '2',
            maxPlayers: 10,
            players: [
              {
                id: 'player1',
                flopId: 1119,
                requestState: 'SITTED'
              },
              {
                id: 'player2',
                flopId: 1212,
                requestState: 'SITTED'
              },
              {
                id: 'player3',
                flopId: 2119,
                requestState: 'SITTED'
              },
              {
                id: 'player4',
                flopId: 1112,
                requestState: 'SITTED'
              }
            ]
          }
        ]
      }
    ]
  }
});

const FetchWaitingListResult = (runningCashGameId: string) => {
  return {
    status: 200,
    data: {
      content: [
        {
          id: 'player1',
          flopId: 1083
        },
        {
          id: 'player2',
          flopId: 1084
        },
        {
          id: 'player3',
          flopId: 1099
        }
      ]
    }
  };
};

/****************** */
/**** Jest  Mock    */
/****************** */

// Mock FixtureUserApi
jest.mock('../../services/FixtureRunningCashGamesApi.ts', () => ({
  __esModule: true, // this property makes it work
  default: {
    fetchRunningCashGames: jest.fn(),
    fetchWaitingListCount: jest.fn(),
    closeTable: jest.fn(),
    fetchJoinSeatRequests: jest.fn(),
    addNewPlayer: jest.fn(),
    removePlayer: jest.fn(),
    createRunningGame: jest.fn(),
    addNewTable: jest.fn(),
    fetchWaitingList: jest.fn(),
    addNewPlayerToWaitingList: jest.fn(),
    removePlayerFromWaitingList: jest.fn(),
    sitPlayer: jest.fn(),
    callPlayer: jest.fn(),
    findPlayerStatus: jest.fn()
  }
}));

const RunningCashGamesRedux = {
  cashgames: Immutable({
    layout: Immutable({
      currentTab: 'running'
    }),
    interestList: Immutable({
      list: [],
      displayList: {
        listIds: [],
        page: 1,
        last: false,
        size: 10,
        totalElements: 0,
        filters: {
          gameOrigin: 'FLOP_USER',
          gameStates: ['PENDING', 'ACCEPTED', 'DECLINED']
        }
      }
    }),
    runningCashGames: Immutable({
      list: [],
      displayList: {
        listIds: [],
        page: 1,
        last: false,
        size: 10,
        totalElements: 0,
        filters: {}
      },
      playerStatus: []
    })
  })
};

describe('>>>Running Cash Games List ---REACT-REDUX (Mount + wrapping in <Provider>', () => {
  it('+++ render the connected(SMART) component', () => {
    // Prepare Mock FixtureApi Function
    FixtureRunningCashGamesApi.fetchRunningCashGames.mockImplementation(
      RunningGamesContentOneGameResult
    );

    let store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...RunningCashGamesRedux
    }).store;
    let wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RunningCashGamesList />
        </Provider>
      )
    );
    expect(wrapper.length).toEqual(1);
  });

  it('+++ Display Running Game List', () => {
    // Prepare Mock FixtureApi Function
    FixtureRunningCashGamesApi.fetchRunningCashGames.mockImplementation(
      RunningGamesContentOneGameResult
    );

    FixtureRunningCashGamesApi.fetchWaitingList.mockImplementation(
      FetchWaitingListResult
    );

    let store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...RunningCashGamesRedux
    }).store;

    let wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RunningCashGamesList />
        </Provider>
      )
    );

    // we expect 1 games
    expect(wrapper.find('BodyRow').length).toEqual(1);
    expect(wrapper.find('ExpandableRow').length).toEqual(1);

    // Expand the first Row
    const expandRowButton = wrapper
      .find('TableRow')
      .at(0)
      .find('.ant-table-row-expand-icon')
      .at(0);
    expandRowButton.simulate('click');

    // We expect there are 3 Expandable Row
    expect(wrapper.find('ExpandableRow').length).toEqual(3);
  });

  it('+++ Add a New Running Game', async done => {
    let cptCallMock = 0;

    const newGameId = '231478';

    // Data for form
    const runningGamedata = {
      gameVariant: 'NLH',
      smallBlind: 1,
      bigBlind: 2
    };

    // Prepare Mock FixtureApi Function
    FixtureRunningCashGamesApi.fetchRunningCashGames.mockImplementation(
      (queryParams: string) => {
        // The firstTime we return 0 result
        if (cptCallMock === 0) {
          cptCallMock++;
          return {
            status: 200,
            data: { content: [] }
          };
        }
        // Else we return result
        return {
          status: 200,
          data: {
            content: [
              {
                liveGameKey: newGameId,
                gameSize: `${runningGamedata.smallBlind} / ${runningGamedata.bigBlind}`,
                gameVariant: runningGamedata.gameVariant,
                tables: []
              }
            ]
          }
        };
      }
    );
    FixtureRunningCashGamesApi.createRunningGame.mockImplementation(
      (runningGame: any) => {
        return {
          status: 204,
          data: {}
        };
      }
    );

    FixtureRunningCashGamesApi.fetchWaitingList.mockImplementation(
      FetchWaitingListResult
    );

    let store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...RunningCashGamesRedux
    }).store;
    let wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RunningCashGamesList />
        </Provider>
      )
    );

    // Expected New game created
    store.subscribe(() => {
      const gameCreated = store
        .getState()
        .cashgames.runningCashGames.list.find((g: any) => g.id === newGameId);
      if (gameCreated) {
        done();
      }
    });

    // Click on add Button
    const runningGameCreationButton = wrapper
      .find('#game-creation-button')
      .find('button');
    runningGameCreationButton.simulate('click');

    // Populate Form
    // Fill Game Variant Input
    const gameVariantInput = wrapper.find('#gameVariant').find(Select);
    gameVariantInput.props().onChange(runningGamedata.gameVariant);

    // Fill Small Blind Input
    const smallBlindInput = wrapper.find('#smallBlind').find('input');
    smallBlindInput.simulate('change', {
      target: { value: runningGamedata.smallBlind }
    });

    // Fill Big Blind Input
    const bigBlindInput = wrapper.find('#bigBlind').find('input');
    bigBlindInput.simulate('change', {
      target: { value: runningGamedata.bigBlind }
    });

    // Submitting the form
    store.dispatch(submit(RunningCashGamesConstants.CREATE_RUNNING_GAME_FORM));
  });

  it('+++ Add a New table to existing Running Game', async done => {
    let cptCallMock = 0;

    // Data for form
    const tableData = {
      tableId: 'Table 1',
      maxPlayers: 10
    };

    const defaultGame = {
      liveGameKey: '231478',
      date: '2019-08-08T08:18:00.73',
      gameSize: '10/20',
      gameVariant: 'NLH',
      tables: [
        {
          id: '45654465',
          tableId: '1',
          maxPlayers: 10,
          players: [
            {
              flopId: 1119
            },
            {
              flopId: 1212
            }
          ]
        }
      ]
    };

    // Prepare Mock FixtureApi Function
    FixtureRunningCashGamesApi.fetchRunningCashGames.mockImplementation(
      (queryParams: string) => {
        // The firstTime we return 0 result
        if (cptCallMock === 0) {
          cptCallMock++;
          return {
            status: 200,
            data: {
              content: [defaultGame]
            }
          };
        }
        // Else we return result
        return {
          status: 200,
          data: {
            content: [
              {
                ...defaultGame,
                tables: [
                  {
                    id: '45654465',
                    tableId: '1',
                    maxPlayers: 10,
                    players: [
                      {
                        flopId: 1119
                      },
                      {
                        flopId: 1212
                      }
                    ]
                  },
                  {
                    id: '554646',
                    tableId: tableData.tableId,
                    maxPlayers: tableData.maxPlayers,
                    players: []
                  }
                ]
              }
            ]
          }
        };
      }
    );

    FixtureRunningCashGamesApi.fetchJoinSeatRequests.mockImplementation(
      (runningCashGameId: string, tableId: string) => {
        return {
          status: 200,
          data: [
            {
              id: 'player31',
              flopId: 1183
            },
            {
              id: 'player32',
              flopId: 1184
            },
            {
              id: 'player33',
              flopId: 11099
            }
          ]
        };
      }
    );

    FixtureRunningCashGamesApi.fetchWaitingList.mockImplementation(
      FetchWaitingListResult
    );

    FixtureRunningCashGamesApi.addNewTable.mockImplementation(
      (runningGame: any) => {
        return {
          status: 204,
          data: {}
        };
      }
    );

    let store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...RunningCashGamesRedux
    }).store;
    let wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RunningCashGamesList />
        </Provider>
      )
    );

    // Expected New game created
    store.subscribe(() => {
      const gameCreated = store
        .getState()
        .cashgames.runningCashGames.list.find((g: any) => g.id === '231478');
      // We expect 2 tables on this Game
      if (gameCreated.tables.length === 2) {
        done();
      }
    });

    // Get First BodyRow
    const bodyRow = wrapper
      .find('BodyRow')
      .at(0)
      .find('#add-table-231478')
      .find('button');
    bodyRow.simulate('click');

    // Populate Form
    // Fill TableId Input
    const tableIdInput = wrapper.find('#tableId').find('input');
    tableIdInput.simulate('change', {
      target: { value: tableData.tableId }
    });

    // Submitting the form
    store.dispatch(submit(RunningCashGamesConstants.ADD_TABLE_FORM));
  });

  it('+++ Manage Waiting List => Show List/ Add Player / Remove Player', async done => {
    // Prepare Mock FixtureApi Function
    FixtureRunningCashGamesApi.fetchRunningCashGames.mockImplementation(
      RunningGamesContentOneGameResult
    );

    FixtureRunningCashGamesApi.fetchWaitingList.mockImplementation(
      FetchWaitingListResult
    );

    FixtureRunningCashGamesApi.addNewPlayerToWaitingList.mockImplementation(
      (gameId: string) => {
        return {
          status: 201,
          data: {},
          headers: {
            location: 'https//blablabala/player18'
          }
        };
      }
    );

    FixtureRunningCashGamesApi.removePlayerFromWaitingList.mockImplementation(
      (gameId: string, playerId: string) => {
        return {
          status: 204
        };
      }
    );

    let store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...RunningCashGamesRedux
    }).store;
    let wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RunningCashGamesList />
        </Provider>
      )
    );

    let waitingListLoaded = false;
    let waitForRemovePlayer = false;

    const playerName = 'Serge Benamou';

    // Data correctly display
    store.subscribe(() => {
      const currentGame = store
        .getState()
        .cashgames.runningCashGames.list.find((g: any) => g.id === '231478');

      const lastPlayerLoad = store
        .getState()
        .players.list.find((p: any) => p.id === 1099);
      // We expect 3 player in waiting list
      if (
        !waitingListLoaded &&
        currentGame.waitingList &&
        currentGame.waitingList.length === 3 &&
        lastPlayerLoad &&
        lastPlayerLoad.data &&
        lastPlayerLoad.data.firstName
      ) {
        waitingListLoaded = true;
        // Count The Player List in Waiting List
        setTimeout(() => {
          wrapper.update();
          expect(wrapper.find('Memo(WaitingListItem)').length).toEqual(3);

          // Remove a Player on Waiting List
          const removePlayerFromWLBtn = wrapper
            .find('Memo(WaitingListItem)')
            .at(0)
            .find('#remove-player-from-wl-player1')
            .find('button');

          removePlayerFromWLBtn.simulate('click');

          // Confirm Remove
          const confirmRemovePlayerFromWLBtn = wrapper
            .find('Memo(WaitingListItem)')
            .at(0)
            .find('#confirm-remove-player-from-wl-player1')
            .find('button');

          confirmRemovePlayerFromWLBtn.simulate('click');
        }, 1000);
      }

      // Assert Remove Ok
      if (
        waitingListLoaded &&
        !waitForRemovePlayer &&
        currentGame.waitingList.length === 2
      ) {
        waitForRemovePlayer = true;
        expect(
          currentGame.waitingList.find((p: any) => p.id === 'player1')
        ).toBeUndefined();

        // Add New Player
        // Add Player Button
        const addPlayerBtn = wrapper.find('#add-player-wl').find('button');

        addPlayerBtn.simulate('click');

        setTimeout(() => {
          // Fill Add Player Form
          // Fill Player Name Input
          const nameInput = wrapper.find('#name').find('input');
          nameInput.simulate('change', {
            target: { value: playerName }
          });

          // Submitting the form
          store.dispatch(submit(RunningCashGamesConstants.ADD_PLAYER_FORM));
        }, 500);
      }

      // Assert Add New Player
      if (
        waitingListLoaded &&
        waitForRemovePlayer &&
        currentGame.waitingList.length === 3
      ) {
        expect(
          currentGame.waitingList.find(
            (p: any) => p.id === 'player18' && p.name === playerName
          )
        ).toBeDefined();

        done();
      }
    });

    // Get First BodyRow
    const bodyRow = wrapper
      .find('BodyRow')
      .at(0)
      .find('#waiting-list-231478');
    bodyRow.simulate('click');
  });

  it('+++ Manage Seated Players => Show List/ Add Player / Remove Player / Sit Player / Call Player', async done => {
    // Prepare Mock FixtureApi Function
    FixtureRunningCashGamesApi.fetchRunningCashGames.mockImplementation(
      RunningGamesContentOneGameResult
    );

    FixtureRunningCashGamesApi.fetchWaitingList.mockImplementation(
      FetchWaitingListResult
    );

    FixtureRunningCashGamesApi.removePlayer.mockImplementation(
      (playerId: string) => {
        return {
          status: 204
        };
      }
    );

    FixtureRunningCashGamesApi.addNewPlayer.mockImplementation(
      (tableId: string, player: GamesApiDefinitions.PlayerDTO) => {
        return {
          status: 201,
          data: {},
          headers: {
            location: 'https//blablabala/playerId19'
          }
        };
      }
    );

    FixtureRunningCashGamesApi.sitPlayer.mockImplementation(
      (gameId: string, tableId: string, playerId: string) => {
        return {
          status: 204
        };
      }
    );

    let store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...RunningCashGamesRedux
    }).store;
    let wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RunningCashGamesList />
        </Provider>
      )
    );

    let seatedPlayerLoaded = false;
    let waitForRemovePlayer = false;
    let waitForAddPlayer = false;

    const playerName = 'Jean Jean';

    // Data correctly display
    store.subscribe(() => {
      const currentGame = store
        .getState()
        .cashgames.runningCashGames.list.find((g: any) => g.id === '231478');

      const lastPlayerLoad = store
        .getState()
        .players.list.find((p: any) => p.id === 1099);
      // We expect 2 tables on this Game
      if (
        !seatedPlayerLoaded &&
        currentGame.waitingList &&
        currentGame.waitingList.length === 3 &&
        lastPlayerLoad &&
        lastPlayerLoad.data &&
        lastPlayerLoad.data.firstName
      ) {
        seatedPlayerLoaded = true;
        // Count The Player List in Waiting List and In Seated Player List
        setTimeout(() => {
          wrapper.update();
          expect(wrapper.find('Memo(WaitingListItem)').length).toEqual(3);
          expect(wrapper.find('Memo(SeatedPlayerItem)').length).toEqual(10);

          // Remove the first Player (with id player1)
          const removePlayerFromWLBtn = wrapper
            .find('Memo(SeatedPlayerItem)')
            .at(0)
            .find('#removePlayer-player1')
            .find('button');

          removePlayerFromWLBtn.simulate('click');

          // Confirm Remove
          const confirmRemovePlayerFromWLBtn = wrapper
            .find('Memo(SeatedPlayerItem)')
            .at(0)
            .find('#confirmDeletePlayer-player1')
            .find('button');

          confirmRemovePlayerFromWLBtn.simulate('click');
        }, 1000);
      }

      // Assert Remove Ok
      if (
        seatedPlayerLoaded &&
        !waitForRemovePlayer &&
        currentGame.tables[0].players.length === 1
      ) {
        waitForRemovePlayer = true;
        expect(
          currentGame.tables[0].players.find((p: any) => p.id === 'player1')
        ).toBeUndefined();

        // Add New Player
        // Add Player Button
        const addPlayerBtn = wrapper.find('#add-player').find('button');

        addPlayerBtn.simulate('click');

        setTimeout(() => {
          // Fill Add Player Form
          // Fill Player Name Input
          const nameInput = wrapper.find('#name').find('input');
          nameInput.simulate('change', {
            target: { value: playerName }
          });

          // Submitting the form
          store.dispatch(submit(RunningCashGamesConstants.ADD_PLAYER_FORM));
        }, 500);
      }

      // Assert Add New Player
      if (
        seatedPlayerLoaded &&
        waitForRemovePlayer &&
        !waitForAddPlayer &&
        currentGame.tables[0].players.length === 2
      ) {
        waitForAddPlayer = true;
        expect(
          currentGame.tables[0].players.find(
            (p: any) => p.id === 'playerId19' && p.name === playerName
          )
        ).toBeDefined();

        done();
      }

      // Assert Sit Player
      // if (
      //   seatedPlayerLoaded &&
      //   waitForRemovePlayer &&
      //   waitForAddPlayer &&
      //   currentGame.tables[0].players.length === 3
      // ) {
      //   done();
      // }
    });

    // Expand the first Row
    const expandRowButton = wrapper
      .find('TableRow')
      .at(0)
      .find('.ant-table-row-expand-icon')
      .at(0);
    expandRowButton.simulate('click');

    // Click on Seat Players Cell
    const tableRowSeatedPlayersCell = wrapper
      .find('BodyRow')
      .at(1)
      .find('#seated-players-231478');
    tableRowSeatedPlayersCell.simulate('click');
  });

  it('+++ Manage Join Seat Request => Show List/ Accept Request / Decline Request', async done => {
    // Prepare Mock FixtureApi Function
    FixtureRunningCashGamesApi.fetchRunningCashGames.mockImplementation(
      RunningGamesContentOneGameResult
    );

    FixtureRunningCashGamesApi.fetchWaitingList.mockImplementation(
      FetchWaitingListResult
    );

    FixtureRunningCashGamesApi.fetchJoinSeatRequests.mockImplementation(
      (runningCashGameId: string, tableId: string) => {
        return {
          status: 200,
          data: [
            {
              id: 'player31',
              flopId: 1183
            },
            {
              id: 'player32',
              flopId: 1184
            },
            {
              id: 'player33',
              flopId: 11099
            }
          ]
        };
      }
    );

    let store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...RunningCashGamesRedux
    }).store;
    let wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RunningCashGamesList />
        </Provider>
      )
    );

    let checkJoinSeat = false;

    // Data correctly display
    store.subscribe(() => {
      const currentGame = store
        .getState()
        .cashgames.runningCashGames.list.find((g: any) => g.id === '231478');

      const lastPlayerLoad = store
        .getState()
        .players.list.find((p: any) => p.id === 1096);
      // We expect 3 join seat request
      if (
        !checkJoinSeat &&
        currentGame.tables[0].joinSeatRequestList &&
        currentGame.tables[0].joinSeatRequestList.length === 3 &&
        lastPlayerLoad &&
        lastPlayerLoad.data &&
        lastPlayerLoad.data.firstName
      ) {
        // console.log(wrapper.debug());
        checkJoinSeat = true;
        // Count The Memo(JoinSeatRequestItem)
        setTimeout(() => {
          wrapper.update();
          expect(wrapper.find('Memo(JoinSeatRequestItem)').length).toEqual(3);
          done();
        }, 1000);
      }
    });
    // Expand the first Row
    const expandRowButton = wrapper
      .find('TableRow')
      .at(0)
      .find('.ant-table-row-expand-icon')
      .at(0);
    expandRowButton.simulate('click');

    // Click on Join Seat Request Cell
    const tableRowJoinSeatRequestCell = wrapper
      .find('BodyRow')
      .at(1)
      .find('#join-seat-request-231478');
    tableRowJoinSeatRequestCell.simulate('click');
  });

  it('+++ Close A table', async done => {
    // Prepare Mock FixtureApi Function
    FixtureRunningCashGamesApi.fetchRunningCashGames.mockImplementation(
      RunningGamesContentOneGameResult
    );

    FixtureRunningCashGamesApi.fetchWaitingList.mockImplementation(
      FetchWaitingListResult
    );

    FixtureRunningCashGamesApi.closeTable.mockImplementation(
      (tableId: string) => {
        return {
          status: 204
        };
      }
    );

    let store = createStore({
      ...initialStateGlobal,
      ...initialStateAuthent,
      ...initialStateCasinos,
      ...RunningCashGamesRedux
    }).store;
    let wrapper = mount(
      wrapperMemoryRouter(
        <Provider store={store}>
          <RunningCashGamesList />
        </Provider>
      )
    );

    // Expected table was Removed
    store.subscribe(() => {
      const gameCreated = store
        .getState()
        .cashgames.runningCashGames.list.find((g: any) => g.id === '231478');

      // We expect 1 table on this Game after close one table
      if (gameCreated.tables.length === 1) {
        done();
      }
    });

    // Expand the first Row
    const expandRowButton = wrapper
      .find('TableRow')
      .at(0)
      .find('.ant-table-row-expand-icon')
      .at(0);
    expandRowButton.simulate('click');

    // Click on Close Table button
    const closeTableButton = wrapper
      .find('BodyRow')
      .at(1)
      .find('#close-table-45654465')
      .find('button');
    closeTableButton.simulate('click');

    // Click on Confirm Button
    const confirmCloseTableButton = wrapper
      .find('BodyRow')
      .at(1)
      .find('#confirmCloseTable-45654465')
      .find('button');
    confirmCloseTableButton.simulate('click');
  });
});
