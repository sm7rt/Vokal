import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import InviteUserModal from '../InviteUserModal';
import {
  withProvider,
  ContainerFluidDecorator,
  CenterMediumWidthDecorator,
  ReduxFormDecorator
} from '../../../../../../.storybook/util';

// Stories For InviteUserModal
storiesOf('Features/Users/Components/modal/InviteUserModal', module)
  .addDecorator(ReduxFormDecorator)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Default', () => {
    const [visible, setVisible] = useState(true);
    return (
      <InviteUserModal
        visible={visible}
        setVisible={setVisible}
        onSubmit={() => {}}
      />
    );
  });
