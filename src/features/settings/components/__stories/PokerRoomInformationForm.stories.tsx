import { storiesOf } from '@storybook/react';
import React from 'react';
import StoryRouter from 'storybook-react-router';
import {
  ContainerFluidDecorator,
  withProvider,
  ReduxFormDecorator
} from '../../../../../.storybook/util';
import PokerRoomInformationForm from '../PokerRoomInformationForm';
import {
  initialStateGlobal,
  initialStateSettings
} from '../../../../../test/redux/InitialState';

// Stories For SigninForm
storiesOf('Features/Settings/Components/PokerRoomInformationForm', module)
  .addDecorator(StoryRouter())
  .addDecorator(ReduxFormDecorator) // Used if it's a redux form
  .addDecorator(storyFn =>
    withProvider(storyFn, {
      ...initialStateGlobal,
      ...initialStateSettings
    })
  ) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <PokerRoomInformationForm
      onSubmitForm={data => {
        console.log(data);
      }}
    />
  ));
