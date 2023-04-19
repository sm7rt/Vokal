import { useSelector } from 'react-redux';
import { IRootState } from '../../../../../common/models/StateModel';
import { interestListFromListSelector } from '../redux/InterestListRedux';

// Keep A Map With InterestListId and Selector
const mapInterestListIdSelector = new Map();

/**
 * Use interest List hooks
 * @param interestListId
 */
export const useInterestList = (interestListId: string) => {
  // Keep a Cache InterestListId / Selector Because Selector Cache Size is One ()  "https://github.com/reduxjs/reselect#sharing-selectors-with-props-across-multiple-component-instances"
  let existingSelector = mapInterestListIdSelector.get(interestListId);
  if (!existingSelector) {
    existingSelector = interestListFromListSelector();
    mapInterestListIdSelector.set(interestListId, existingSelector);
  }

  const interestList = useSelector((state: IRootState) =>
    existingSelector(state, interestListId)
  );
  return interestList;
};
