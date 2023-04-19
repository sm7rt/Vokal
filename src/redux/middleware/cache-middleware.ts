import moment, { Moment } from 'moment';
import { AnyAction, Store } from 'redux';

type FetchReduxActionCacheType = {
  actionType: string;
  actionId: string;
  startingDate: Moment;
};

type CacheableType = {
  actionType: string;
  cacheDuration: number;
};

// This action need to have a "id" param
const CACHEABLE_ACTIONS = [
  {
    actionType: 'FETCH_PLAYER_REQUEST',
    cacheDuration: 300
  },
  {
    actionType: 'FETCH_CASINO_DETAILS_REQUEST',
    cacheDuration: 300
  }
];

// Repo de Fetch Redux Actions
const fetchReduxActionRepo: Array<FetchReduxActionCacheType> = [];

/**
 * Manage Cache Middleware
 * @param store
 */
const cacheMiddleware = (store: Store) => next => (action: AnyAction) => {
  // Identify if it's a cacheable Redux Action
  const currentCacheableAction = CACHEABLE_ACTIONS.find(
    (cacheableAction: CacheableType) =>
      cacheableAction.actionType === action.type
  );
  // handle Fetch Request action only and cacheable redux action
  if (!currentCacheableAction) {
    // console.log('Not cacheable action : ', action.type);
    // We trigger the action to the next middleware
    return next(action);
  }

  // Try to find the same redux action
  const fetchRequestInstance = fetchReduxActionRepo.find(
    (obj: FetchReduxActionCacheType) =>
      action.type === obj.actionType && action.id === obj.actionId
  );
  // If This Request Type with this params not exist
  if (!fetchRequestInstance) {
    // We add it
    fetchReduxActionRepo.push({
      actionType: action.type,
      actionId: action.id,
      startingDate: moment()
    });

    // We trigger the action to the next middleware
    return next(action);
  } else {
    // We check if cache has not expired
    const { cacheDuration } = currentCacheableAction;
    const startingDate = fetchRequestInstance.startingDate;

    // Check if cache has expired or forceRefresh indicator is set to true
    const diffDate = moment().diff(startingDate, 'seconds');
    if (diffDate > cacheDuration || action.forceRefresh) {
      // console.log('Cache expired : {}, {}', action.type, action.id);
      // Put a new starting date in
      fetchRequestInstance.startingDate = moment();

      // If cache expired
      // We trigger the action to the next middleware
      return next(action);
    } else {
      // console.log('Use Cache: {}, {}', action.type, action.id);
      // Else Return a Cancel Response
      return store.dispatch({
        type: action.type.replace('_REQUEST', '_CANCEL_RESPONSE')
      });
    }
  }
};

export default cacheMiddleware;
