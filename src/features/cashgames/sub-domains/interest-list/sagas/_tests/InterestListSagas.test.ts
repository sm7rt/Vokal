import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { select } from 'redux-saga/effects';
import { SortType } from '../../../../../../common/models';
import MessagesAction from '../../../../../../common/redux/SystemMessagesRedux';
import i18n from '../../../../../../i18n';
import {
  currentCasinoSelector,
  ownerSelector
} from '../../../../../authentication/redux/AuthenticationRedux';
import { casinoFromListSelector } from '../../../../../casinos/redux/CasinosRedux';
import PlayersActions from '../../../../../players/redux/PlayersRedux';
import LayoutCashGamesActions from '../../../../redux/LayoutCashGamesRedux';
import InterestListActions, {
  interestListFromListSelector
} from '../../redux/InterestListRedux';
import FixtureInterestListApi from '../../services/FixtureInterestListApi';
import {
  acceptInterestList,
  cancelInterestList,
  createNewInterestList,
  declineInterestList,
  fetchInterestListList,
  fetchRegisteredPlayers,
  startInterestList
} from '../InterestListSagas';

// Testing fetchInterestList Middleware Success
test('fetchInterestList Middleware Success', () => {
  const filters = {
    gameType: 'FLOP_GAMES',
    states: ['ACCEPTED']
  };
  const page = 1;
  const size = 20;
  const sorts: Array<SortType> = [];
  const Response = {
    status: 200,
    data: {
      content: [
        {
          id: '231478',
          state: 'PENDING',
          date: '2019-08-08T08:18:00.73',
          gameSize: '10/20',
          gameVariant: 'NLH',
          fees: '50 $'
        }
      ],
      last: true,
      totalElements: 21
    }
  };

  const PlayersNumberResponse = {
    status: 200,
    data: 3
  };

  return expectSaga(fetchInterestListList, FixtureInterestListApi, {
    filters,
    page,
    size,
    sorts
  })
    .provide([
      [select(currentCasinoSelector), 'casinoId1'],
      [select(casinoFromListSelector, 'casinoId1'), { name: 'Casino' }],
      [matchers.call.fn(FixtureInterestListApi.fetchInterestList), Response],
      [
        matchers.call.fn(FixtureInterestListApi.fetchPlayersCount),
        PlayersNumberResponse
      ]
    ])
    .put(
      InterestListActions.fetchInterestListListSuccessResponse(
        Response.data.content,
        filters,
        page,
        Response.data.last,
        Response.data.totalElements,
        size,
        sorts
      )
    )

    .put(
      InterestListActions.fetchInterestListRequest(
        Response.data.content[0].id,
        Response.data.content[0]
      )
    )
    .put(
      InterestListActions.fillInterestListPlayersNumber(
        Response.data.content[0].id,
        3
      )
    )
    .run();
});

// Testing the acceptInterestList MiddleWare Success
test('acceptInterestList Middleware Success', () => {
  // Prepare
  const action = {
    interestListId: '123654'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(acceptInterestList, FixtureInterestListApi, action)
    .provide([
      [
        matchers.call.fn(FixtureInterestListApi.acceptInterestList),
        serviceResultSuccess
      ]
    ])
    .put(
      InterestListActions.acceptInterestListSuccessResponse(
        action.interestListId
      )
    )
    .put(
      MessagesAction.addMessage(
        'ACCEPT_GAME_SUCCESS',
        'SUCCESS',
        i18n.t('ACCEPT_GAME_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing the declineInterestList MiddleWare Success
test('declineInterestList Middleware Success', () => {
  // Prepare
  const action = {
    interestListId: '123654'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(declineInterestList, FixtureInterestListApi, action)
    .provide([
      [
        matchers.call.fn(FixtureInterestListApi.declineInterestList),
        serviceResultSuccess
      ]
    ])
    .put(
      InterestListActions.declineInterestListSuccessResponse(
        action.interestListId
      )
    )
    .put(
      MessagesAction.addMessage(
        'DECLINE_GAME_SUCCESS',
        'SUCCESS',
        i18n.t('DECLINE_GAME_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing the  fetchRegisteredPlayers MiddleWare Success
test('fetchRegisteredPlayers Middleware Success', () => {
  // Prepare
  const action = {
    interestListId: '123654'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 200,
    data: [
      {
        accountId: 10
      },
      {
        accountId: 19
      }
    ]
  };

  // Act & Assert
  return expectSaga(fetchRegisteredPlayers, FixtureInterestListApi, action)
    .provide([
      [
        matchers.call.fn(FixtureInterestListApi.fetchRegisteredPlayers),
        serviceResultSuccess
      ]
    ])
    .put(
      InterestListActions.fetchRegisteredPlayersSuccessResponse(
        action.interestListId,
        serviceResultSuccess.data
      )
    )
    .put(
      PlayersActions.fetchPlayerRequest(serviceResultSuccess.data[0].accountId)
    )
    .put(
      PlayersActions.fetchPlayerRequest(serviceResultSuccess.data[1].accountId)
    )
    .run();
});

// Testing the createNewInterestList MiddleWare Success
test('createNewInterestList Middleware Success', () => {
  // Prepare
  const action = {
    data: {
      gameVariant: 'NLH',
      smallBlind: '1',
      bigBlind: '2',
      startingDate: '2019-08-31',
      startingTime: '2019-08-30T07:30:52.000Z'
    }
  };

  // Service Result Success
  const newInterestListId = '45465654';
  const serviceResultSuccess = {
    status: 201,
    data: {},
    headers: {
      location: `https//blablabala/${newInterestListId}`
    }
  };

  const detailsServiceResultSuccess = {
    status: 200,
    data: {
      id: newInterestListId,
      state: 'PENDING',
      date: '2019-09-08T08:18:00.73',
      gameSize: '50/100',
      gameVariant: 'NLH',
      fees: '50 $'
    }
  };

  const PlayersNumberResponse = {
    status: 200,
    data: 3
  };

  // Act & Assert
  return expectSaga(createNewInterestList, FixtureInterestListApi, action)
    .provide([
      [select(currentCasinoSelector), 'casinoId1'],
      [
        select(casinoFromListSelector, 'casinoId1'),
        { id: 'casinoId1', name: 'Casino1', country: 'France', city: 'Antibes' }
      ],
      [select(ownerSelector), { accountId: 32 }],
      [
        matchers.call.fn(FixtureInterestListApi.createInterestList),
        serviceResultSuccess
      ],
      [
        matchers.call.fn(FixtureInterestListApi.fetchInterestListDetails),
        detailsServiceResultSuccess
      ],
      [
        matchers.call.fn(FixtureInterestListApi.fetchPlayersCount),
        PlayersNumberResponse
      ]
    ])
    .put(
      InterestListActions.createInterestListSuccessResponse(newInterestListId)
    )
    .put(
      MessagesAction.addMessage(
        'CREATE_INTEREST_LIST_SUCCESS',
        'SUCCESS',
        `Your interest list was successfully created.`,
        '',
        'PANEL'
      )
    )
    .put(
      InterestListActions.fetchInterestListRequest(
        newInterestListId,
        detailsServiceResultSuccess.data
      )
    )

    .put(
      InterestListActions.fillInterestListPlayersNumber(newInterestListId, 3)
    )

    .run();
});

// Testing the cancelInterestList MiddleWare Success
test('cancelInterestList Middleware Success', () => {
  // Prepare
  const action = {
    interestListId: '123654'
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204,
    data: {}
  };

  // Act & Assert
  return expectSaga(cancelInterestList, FixtureInterestListApi, action)
    .provide([
      [
        matchers.call.fn(FixtureInterestListApi.deleteInterestList),
        serviceResultSuccess
      ]
    ])
    .put(
      InterestListActions.deleteInterestListSuccessResponse(
        action.interestListId
      )
    )
    .put(
      MessagesAction.addMessage(
        'DELETE_INTEREST_LIST_SUCCESS',
        'SUCCESS',
        i18n.t('DELETE_INTEREST_LIST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    )
    .run();
});

// Testing the startInterestList MiddleWare Success
xtest('startInterestList Middleware Success', () => {
  const interestListId = '45465654';
  // Prepare
  const action = {
    data: {
      tables: [
        {
          tableId: '1',
          maxPlayers: 10,
          players: [1096, 1087]
        }
      ]
    },
    interestListId,
    waitingList: [1076, 1064]
  };

  // Service Result Success
  const serviceResultSuccess = {
    status: 204
  };

  const interestList = {
    id: interestListId,
    state: 'PENDING',
    date: '2019-09-08T08:18:00.73',
    gameSize: '50/100',
    gameVariant: 'NLH',
    fees: '50 $'
  };

  // Act & Assert
  return expectSaga(startInterestList, FixtureInterestListApi, action)
    .provide([
      [select(interestListFromListSelector(), interestListId), interestList],
      [
        matchers.call.fn(FixtureInterestListApi.startInterestList),
        serviceResultSuccess
      ]
    ])
    .put(LayoutCashGamesActions.changeTab('running'))
    .put(InterestListActions.startInterestListSuccessResponse(interestListId))
    .put(
      MessagesAction.addMessage(
        'START_INTEREST_LIST_SUCCESS',
        'SUCCESS',
        `Your game was successfully started.`,
        '',
        'PANEL'
      )
    )

    .run();
});
