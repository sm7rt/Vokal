import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import {
  ContainerFluidDecorator,
  withProvider
} from '../../../../../../.storybook/util';
import { initialStateGlobal } from '../../../../../../test/redux/InitialState';
import Immutable from 'seamless-immutable';
import MessagePanel from '../SystemMessagePanel';

const initialState = {
  ...initialStateGlobal,
  messages: Immutable([
    {
      id: 'SUCCESS-1',
      gravity: 'SUCCESS',
      headerText: '',
      text: 'Congratulations, The action was succeed',
      displayMode: 'PANEL'
    }
  ])
};

/**
 * Stories For MainSidebar
 */
storiesOf('Components/Layout/MessagePanel', module)
  .addDecorator(StoryRouter())
  .addDecorator(storyFn => withProvider(storyFn, initialState))
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <MessagePanel />);
