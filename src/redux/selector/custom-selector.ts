import { createSelectorCreator, defaultMemoize } from 'reselect';
import Immutable from 'seamless-immutable';
import _ from 'lodash';

/**
 * Make Immutable Comparaison between 2 objects
 */
export const immutableComparison = (obj1, obj2) => {
  if (!obj1 && !obj2) {
    return true;
  }

  if (!obj1 || !obj2) {
    return false;
  }

  // Manage Object
  const isObject = obj1 instanceof Object;
  if (isObject) {
    // Check Immutable
    const result = Immutable.isImmutable(obj1)
      ? _.isEqual(
          Immutable.asMutable(obj1, { deep: true }),
          Immutable.asMutable(obj2, { deep: true })
        )
      : _.isEqual(obj1, obj2);

    // if (!result) {
    //   console.log('Is different', obj1);
    //   console.log('Is different', obj2);
    // } else {
    //   console.log('Is Equals', obj1);
    //   console.log('Is Equals', obj2);
    // }
    return result;
  }
  return obj1 === obj2;
};

/**
 * Create Immutable Equal Selector in order to have the good comparaison between 2 Immutable Obj
 */
export const createImmutableEqualSelector = createSelectorCreator(
  defaultMemoize,
  immutableComparison
);
