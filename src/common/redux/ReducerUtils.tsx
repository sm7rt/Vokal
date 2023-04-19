import { AnyAction } from 'redux';
import { ImmutableObject } from 'seamless-immutable';
import { HasIDType } from '../models/index.d';

/**
 * Handle Pageable Result Reducer
 * Sample Redux Representation :
 *        list: Array<T>
 *        listIds: Array<string>,
 *        filters: F,
 *        page: number
 *        size: number
 * @param {*} state
 * @param {*} param1
 */
export const handlePageableResultReducer = <
  S extends ImmutableObject<any>,
  T extends HasIDType,
  F
>(
  state: S,
  {
    data, // The list
    filters, // Current filter
    page, // Current Page
    last, // Indicator of last page reached
    totalElements
  }: AnyAction
): S => {
  // If it's the first page
  if (page === 1) {
    return state.merge({
      listIds: data.map((c: T) => c.id),
      list: data,
      filters,
      page: page + 1,
      last,
      totalElements
    });
  } else {
    // We Concat list
    return state.merge({
      listIds: state.listIds.concat(data.map((c: T) => (c.id ? c.id : ''))),
      list: state.list.concat(data),
      filters,
      page: page + 1,
      last,
      totalElements
    });
  }
};

/**
 * Handle Pageable Result Reducer
 * Sample Redux Representation :
 *     list: Array<T>
 *     'path': {
 *        listIds: Array<string>,
 *        filters: F,
 *        page: number
 *        size: number
 *     }
 *
 * @param {*} state
 * @param {*} param1
 */
export const handlePageableResultWithPathReducer = <
  S extends ImmutableObject<any>,
  T extends HasIDType,
  F
>(
  state: S,
  {
    data, // The list
    filters, // Current filter
    page, // Current Page
    last, // Indicator of last page reached
    totalElements
  }: AnyAction,
  path: Array<string>,
  listIdsPath = 'listIds'
): S => {
  // If it's the first page
  if (page === 1) {
    return state.setIn(path, {
      [listIdsPath]: data.map((c: T) => c.id),
      filters,
      page: page + 1,
      last,
      totalElements
    });
  } else {
    // We Concat list
    return state.setIn(path, {
      [listIdsPath]: state[path].listIds.concat(
        data.map((c: T) => (c.id ? c.id : ''))
      ),
      filters,
      page: page + 1,
      last,
      totalElements
    });
  }
};
