import { combineReducers } from 'redux';
import { reducer as InterestListReducers } from '../sub-domains/interest-list/redux/InterestListRedux';
import { reducer as RunningCashGamesReducers } from '../sub-domains/running-games/redux/RunningCashGamesRedux';
import { reducer as LayoutCashGamesReducers } from './LayoutCashGamesRedux';

// Export Default
export const reducers = combineReducers({
  interestList: InterestListReducers, // Interest List
  runningCashGames: RunningCashGamesReducers, // Running Game
  layout: LayoutCashGamesReducers // Running Game
});
