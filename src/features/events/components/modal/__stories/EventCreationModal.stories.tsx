import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import EventCreationModal from '../EventCreationModal';
import {
  withProvider,
  ContainerFluidDecorator,
  CenterMediumWidthDecorator,
  ReduxFormDecorator
} from '../../../../../../.storybook/util';

// Stories For EventCreationModal
storiesOf('Features/Events/Component/modal/EventCreationModal', module)
  .addDecorator(ReduxFormDecorator)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Default', () => {
    const [visible, setVisible] = useState(true);
    return (
      <EventCreationModal
        visible={visible}
        setVisible={setVisible}
        onSubmit={() => {}}
      />
    );
  });
