import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import { ContainerFluidDecorator } from '../../../../../.storybook/util';
import MainFooter from '../MainFooter';

/**
 * Stories For MainFooter
 */
storiesOf('Components/Layout/MainFooter', module)
  .addDecorator(StoryRouter())
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => <MainFooter />);
