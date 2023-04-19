import { useSelector } from 'react-redux';
import { IRootState } from '../../../../../common/models/StateModel';
import { runningCashGamesFromListSelector } from '../redux/RunningCashGamesRedux';

// Keep A Map With RunningCashGamesId and Selector
const mapRunningCashGamesIdSelector = new Map();

/**
 * Use Running Cash Games hooks
 * @param runningCashGamesId
 */
export const useRunningCashGames = (runningCashGamesId: string) => {
  // Keep a Cache RunningCashGamesId / Selector Because Selector Cache Size is One ()  "https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances"
  let existingSelector = mapRunningCashGamesIdSelector.get(runningCashGamesId);
  if (!existingSelector) {
    existingSelector = runningCashGamesFromListSelector();
    mapRunningCashGamesIdSelector.set(runningCashGamesId, existingSelector);
  }

  const runningCashGame = useSelector((state: IRootState) =>
    existingSelector(state, runningCashGamesId)
  );
  return runningCashGame;
};
