import React from 'react';
import { storiesOf } from '@storybook/react';
import { CenterMediumWidthDecorator } from '../../../../../../.storybook/util';
import PasswordStrengthMeter from '../PasswordStrengthMeter';
// Stories For SigninForm
storiesOf('Components/Form/PasswordStrengthMeter', module)
  .addDecorator(CenterMediumWidthDecorator) // Used to center component
  .add('Too Weak', () => <PasswordStrengthMeter password="toto" />)
  .add('Medium', () => <PasswordStrengthMeter password="Totototo" />)
  .add('Good', () => <PasswordStrengthMeter password="Totototo2" />)
  .add('Great', () => <PasswordStrengthMeter password="Carmin6*EiEZERZ" />);
