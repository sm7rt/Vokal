import { createReducer, createActions } from 'reduxsauce';
import { AnyAction } from 'redux';
import Immutable from 'seamless-immutable';
import {
  ILayoutImmutableState,
  INavItem,
  IRootState
} from '../models/StateModel.d';

/**
 * Initial NavBar Items
 */
const navBarItems: Array<INavItem> = [
  {
    title: 'DASHBOARD',
    items: [
      {
        title: 'Overview',
        to: '/admin/home',
        htmlBefore: '<i class="material-icons">bar_chart</i>',
        htmlAfter: ''
      }
    ]
  }
  // {
  //   title: 'SETTINGS',
  //   items: [
  //     {
  //       title: 'Account',
  //       htmlBefore: '<i class="material-icons">account_box</i>',
  //       to: '/admin/settings/account'
  //     }
  //   ]
  // },
  // {
  //   title: 'SUPPORT',
  //   items: [
  //     {
  //       title: 'FAQ',
  //       htmlBefore: '<i class="material-icons">assignment</i>',
  //       to: '/admin/support/faq'
  //     },
  //     {
  //       title: 'Contact Us',
  //       htmlBefore: '<i class="material-icons">email</i>',
  //       to: '/admin/support/contactus'
  //     }
  //   ]
  // }
];

/* ------------- Types and Action Creators ------------- */

/**
 * Define Actions of Reducer
 */
const { Types, Creators } = createActions({
  collapseSideBar: ['collapsed']
});

export const LayoutTypes = Types;

export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE: ILayoutImmutableState = Immutable({
  sidebar: {
    navItems: navBarItems,
    collapsed: false
  }
});

/* ------------- Reducers ------------- */

/**
 * Update collapsed State SideBar
 * @param state
 * @param param1
 */
export const collapseSideBar = (
  state: ILayoutImmutableState,
  { collapsed }: AnyAction
) => state.setIn(['sidebar', 'collapsed'], collapsed);

/* ------------- Hookup Reducers To Types ------------- */
// Login Reducer,
export const reducer = createReducer(INITIAL_STATE, {
  [Types.COLLAPSE_SIDE_BAR]: collapseSideBar
});

/* ------------- Selectors ------------- */
// Get Collapsed Sidebar Indicator
export const collapseSideBarSelector = (state: IRootState) =>
  state.layout.sidebar.collapsed;

// Sidebar Menu Selector
export const sidebarMenuSelector = (state: IRootState) =>
  state.layout.sidebar.navItems;
