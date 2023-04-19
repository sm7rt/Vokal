import {
  put,
  call,
  fork,
  all,
  cancelled,
  cancel,
  take,
  select,
  delay
} from 'redux-saga/effects';
import InterestListActions, {
  interestListFromListSelector,
  InterestListTypes
} from '../redux/InterestListRedux';
import SystemMessagesAction from '../../../../../common/redux/SystemMessagesRedux';
import { AnyAction } from 'redux';
import { InterestListServiceType } from '../../../models/CashGamesModel.d';
import { parseParams } from '../../../../../utils/ApiUtils';
import PlayersActions from '../../../../players/redux/PlayersRedux';
import MessagesActions from '../../../../messages/redux/MessagesRedux';
import LayoutCashGamesActions from '../../../redux/LayoutCashGamesRedux';
import i18n from '../../../../../i18n';
import {
  ownerSelector,
  currentCasinoSelector
} from '../../../../authentication/redux/AuthenticationRedux';
import { casinoFromListSelector } from '../../../../casinos/redux/CasinosRedux';
import moment from 'moment';
import MomentTimeZone from 'moment-timezone';
import { getHeaderId } from '../../../../../utils/LocationUtils';

const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_SERVER_FORMAT = 'YYYY-MM-DDTHH:mm:s.SSSZZ';

/**
 * Get Interest List Players Number
 * @param {*} api Api to use
 * @param {*} interestListId Id of Events
 */
function* fetchInterestListsPlayersNumber(
  api: InterestListServiceType,
  interestListId: string
) {
  // API Call
  const fetchPlayersNumberResponse = yield call(
    api.fetchPlayersCount,
    interestListId
  );
  if (fetchPlayersNumberResponse.status === 200) {
    yield put(
      InterestListActions.fillInterestListPlayersNumber(
        interestListId,
        fetchPlayersNumberResponse.data || 0
      )
    );
  } else if (fetchPlayersNumberResponse.status === 404) {
    yield put(
      InterestListActions.fillInterestListPlayersNumber(interestListId, 0)
    );
  }
}

/**
 * Fetch All info for a Cash Game
 * @param api
 * @param interestListId
 * @param cashGame
 */
export function* fetchInterestList(
  api: InterestListServiceType,
  { interestListId, interestList }
) {
  if (!interestList) {
    // We Need to Call the Api
    // Success Create Events
    const fetchEventDetailData = yield call(
      api.fetchInterestListDetails,
      interestListId
    );
    interestList = fetchEventDetailData.data;
  }

  yield put(
    InterestListActions.fetchInterestListRequest(interestListId, interestList)
  );

  // Get Players Number
  yield fork(fetchInterestListsPlayersNumber, api, interestListId);

  // Get Messages Number
  yield put(
    MessagesActions.fetchMessagesCountRequest(interestListId, 'INTEREST_LIST')
  );

  yield put(
    InterestListActions.fetchInterestListSuccessResponse(interestListId)
  );
}

/**
 * fetchInterestList Middleware
 * @param {*} api
 * @param {*} action
 */
function* fetchInterestListPulling(
  api: InterestListServiceType,
  action: AnyAction
) {
  const { filters, sorts, page, size } = action;
  // Get casino
  const casinoId = yield select(currentCasinoSelector);
  const commonFilters = {
    gameStates:
      filters.gameOrigin === 'FLOP_USER' ? filters.gameStates : ['ACCEPTED'],
    gameOrigin: filters.gameOrigin,
    dateFrom: encodeURIComponent(
      // date By Default is Current Date Minus 6 Hours
      moment()
        .subtract(6, 'hour')
        .format(DATE_SERVER_FORMAT)
    ),
    casinoId,
    sort:
      sorts.length > 0 && sorts[0].sortDirection === 'descend' ? 'DESC' : 'ASC'
  };

  let newFilters;

  if (filters.date) {
    // Construct dateFrom
    const dateFrom = moment(filters.date, DATE_FORMAT).set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    // Construct dateTo
    const dateTo = moment(filters.date, DATE_FORMAT).set({
      hour: 23,
      minute: 59,
      second: 59,
      millisecond: 999
    });
    newFilters = {
      ...commonFilters,
      dateFrom: encodeURIComponent(dateFrom.format(DATE_SERVER_FORMAT)),
      dateTo: encodeURIComponent(dateTo.format(DATE_SERVER_FORMAT))
    };
  } else {
    newFilters = commonFilters;
  }

  // Construct QueryParams from filters params
  const queryParams = `${parseParams(newFilters)}&size=${size}&page=${page}`;
  try {
    while (true) {
      const fetchInterestListResponse = yield call(
        api.fetchInterestList,
        'CASH_GAME',
        queryParams
      );
      if (fetchInterestListResponse.status === 200) {
        // Authentication Success
        yield put(
          InterestListActions.fetchInterestListListSuccessResponse(
            fetchInterestListResponse.data.content,
            filters,
            page,
            fetchInterestListResponse.data.last,
            fetchInterestListResponse.data.totalElements,
            size,
            sorts
          )
        );

        // Fetch Events Informations
        yield all(
          fetchInterestListResponse.data.content.map(
            (interestList: GamesApiDefinitions.LiveCashGameDocument) =>
              fork(fetchInterestList, api, {
                interestListId: interestList.id,
                interestList
              })
          )
        );

        // Load Image for All Events
      } else {
        yield put(InterestListActions.fetchInterestListListFailureResponse());
      }
      yield delay(5000);
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(InterestListActions.fetchInterestListListCancelResponse());
    }
  }
}

export function* fetchInterestListList(
  api: InterestListServiceType,
  action: AnyAction
) {
  // starts the task in the background
  const fetchInterestListPullingTask = yield fork(
    fetchInterestListPulling,
    api,
    action
  );

  // wait for a cancel actions
  yield take(InterestListTypes.CANCEL_INTEREST_LIST_PULLING);

  // Cancel the task
  yield cancel(fetchInterestListPullingTask);
}

/**
 * Accept Game
 * @param {*} api
 * @param {*} action
 */
export function* acceptInterestList(
  api: InterestListServiceType,
  action: AnyAction
) {
  const { interestListId } = action;
  // API Call
  const acceptInterestListResponse = yield call(
    api.acceptInterestList,
    interestListId
  );
  if (acceptInterestListResponse.status === 204) {
    yield put(
      InterestListActions.acceptInterestListSuccessResponse(interestListId)
    );

    yield put(
      SystemMessagesAction.addMessage(
        'ACCEPT_GAME_SUCCESS',
        'SUCCESS',
        i18n.t('ACCEPT_GAME_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    yield put(InterestListActions.acceptInterestListFailureResponse());

    yield put(
      SystemMessagesAction.addMessage(
        'ACCEPT_GAME_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('ACCEPT_GAME_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Decline Game
 * @param {*} api
 * @param {*} action
 */
export function* declineInterestList(
  api: InterestListServiceType,
  action: AnyAction
) {
  const { interestListId } = action;
  // API Call
  const declineInterestListResponse = yield call(
    api.declineInterestList,
    interestListId
  );
  if (declineInterestListResponse.status === 204) {
    yield put(
      InterestListActions.declineInterestListSuccessResponse(interestListId)
    );

    yield put(
      SystemMessagesAction.addMessage(
        'DECLINE_GAME_SUCCESS',
        'SUCCESS',
        i18n.t('DECLINE_GAME_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    yield put(InterestListActions.declineInterestListFailureResponse());

    yield put(
      SystemMessagesAction.addMessage(
        'DECLINE_GAME_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('DECLINE_GAME_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * fetchRegisteredPlayers Middleware
 * @param {*} api
 * @param {*} action
 */
export function* fetchRegisteredPlayers(
  api: InterestListServiceType,
  action: AnyAction
) {
  const { interestListId } = action;
  try {
    const fetchRegisteredPlayersResponse = yield call(
      api.fetchRegisteredPlayers,
      interestListId
    );
    if (fetchRegisteredPlayersResponse.status === 200) {
      // Authentication Success
      yield put(
        InterestListActions.fetchRegisteredPlayersSuccessResponse(
          interestListId,
          fetchRegisteredPlayersResponse.data
        )
      );

      // Fetch Users Informations
      yield all(
        fetchRegisteredPlayersResponse.data.map((user: any) =>
          put(PlayersActions.fetchPlayerRequest(user.accountId))
        )
      );

      // Load Image for All Events
    } else {
      yield put(InterestListActions.fetchRegisteredPlayersFailureResponse());
    }
  } finally {
    // If Task is cancel we return an action to clean LoadingRedux
    if (yield cancelled()) {
      yield put(InterestListActions.fetchRegisteredPlayersCancelResponse());
    }
  }
}

/**
 * Create New Interest List Middleware
 * @param {*} api
 * @param {*} action
 */
export function* createNewInterestList(
  api: InterestListServiceType,
  action: AnyAction
) {
  const { data } = action;

  // Select Casino Id
  const managedCasinoId = yield select(currentCasinoSelector);

  // Get casino Info
  const casino = yield select(casinoFromListSelector, managedCasinoId);

  // Select Customer Account id
  const owner = yield select(ownerSelector);

  // Extract Hour / minutes from data.startingTime
  const hour = moment(data.startingTime).format('HH');
  const minute = moment(data.startingTime).format('mm');
  const startTime = `${hour}:${minute}`;

  // Manage Date
  const interestListDate = MomentTimeZone.tz(
    `${data.startingDate} ${startTime}+0000`,
    'YYYY-MM-DD HH:mmZZ',
    'UTC'
  ).format(DATE_SERVER_FORMAT);

  // We construct Interest List
  const interestList: any = {
    casinoId: managedCasinoId,
    casino: casino.name,
    country: casino.country,
    city: casino.city,
    ownerId: owner.id, // Set Customer Account Id as OwnerId
    gameOrigin: 'CASINO',
    gameVariant: data.gameVariant,
    gameSize: `${data.smallBlind}/${data.bigBlind}`,
    date: interestListDate
  };

  // We Launch A create Interest List Call
  const createInterestListResponse = yield call(
    api.createInterestList,
    interestList
  );

  if (createInterestListResponse.status === 201) {
    // We Get Interest List Id IN LOCATION PROPERTY
    const interestListId = getHeaderId(createInterestListResponse);
    // Success Create Events
    const fetchEventDetailData = yield call(
      api.fetchInterestListDetails,
      interestListId
    );
    const interestList = fetchEventDetailData.data;

    yield fork(fetchInterestList, api, { interestListId, interestList });

    yield put(
      InterestListActions.createInterestListSuccessResponse(interestListId)
    );
    yield put(
      SystemMessagesAction.addMessage(
        'CREATE_INTEREST_LIST_SUCCESS',
        'SUCCESS',
        `Your interest list was successfully created.`,
        '',
        'PANEL'
      )
    );
  } else {
    yield put(
      InterestListActions.createInterestListFailureResponse(
        createInterestListResponse.data
      )
    );
    yield put(
      SystemMessagesAction.addMessage(
        'CREATE_INTEREST__ERROR',
        'ERROR',
        `An error Occured, while trying to create this interest list. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Cancel Interest List
 * @param {*} api
 * @param {*} action
 */
export function* cancelInterestList(
  api: InterestListServiceType,
  action: AnyAction
) {
  const { interestListId } = action;
  // API Call
  const deleteInterestListResponse = yield call(
    api.deleteInterestList,
    interestListId
  );
  if (deleteInterestListResponse.status === 204) {
    yield put(
      InterestListActions.deleteInterestListSuccessResponse(interestListId)
    );

    yield put(
      SystemMessagesAction.addMessage(
        'DELETE_INTEREST_LIST_SUCCESS',
        'SUCCESS',
        i18n.t('DELETE_INTEREST_LIST_ACTION_SUCCESS'),
        '',
        'PANEL'
      )
    );
  } else {
    yield put(InterestListActions.deleteInterestListFailureResponse());

    yield put(
      SystemMessagesAction.addMessage(
        'DELETE_INTEREST_LIST_ERROR',
        'ERROR',
        i18n.t('GLOBAL_ERROR_MESSAGE', {
          action: i18n.t('DELETE_INTEREST_LIST_ACTION_ERROR')
        }),
        '',
        'PANEL'
      )
    );
  }
}

/**
 * Start Interest List Middleware
 * @param {*} api
 * @param {*} action
 */
export function* startInterestList(
  api: InterestListServiceType,
  action: AnyAction
) {
  const { interestListId, data, waitingList } = action;

  // Select Interest List
  const interestList = yield select(
    interestListFromListSelector(),
    interestListId
  );

  // We construct Interest List
  const runningGameData: any = {
    flopGameId: interestListId,
    table: data.tables.map((table: any) => ({
      buyIn: 0, // TODO Set a BuyIn
      gameSize: interestList.gameSize,
      gameVariant: interestList.gameVariant,
      maxPlayers: table.maxPlayers,
      tableId: table.tableId,
      players: table.players.map((playerId: string) => ({
        flopId: playerId
      }))
    })),
    waitingListPlayers: waitingList.map((playerId: string) => ({
      flopId: playerId
    }))
  };

  // We Launch start Interest List Call
  const startInterestListResponse = yield call(
    api.startInterestList,
    runningGameData
  );

  if (startInterestListResponse.status === 204) {
    // Redirect to Running Games
    yield put(LayoutCashGamesActions.changeTab('running'));

    // No need to remove item because we change tabs (when come back to interest list tab the list is reloaded)
    yield put(
      InterestListActions.startInterestListSuccessResponse(interestListId)
    );
    yield put(
      SystemMessagesAction.addMessage(
        'START_INTEREST_LIST_SUCCESS',
        'SUCCESS',
        `Your game was successfully started.`,
        '',
        'PANEL'
      )
    );
  } else {
    yield put(InterestListActions.startInterestListFailureResponse());
    yield put(
      SystemMessagesAction.addMessage(
        'START_INTEREST_LIST_ERROR',
        'ERROR',
        `An error Occured, while trying to start this interest list. Please Contact your administrator.`,
        '',
        'PANEL'
      )
    );
  }
}
