import React from 'react';
import { storiesOf } from '@storybook/react';
import EventCard from '../EventCard';
import {
  withProvider,
  ContainerFluidDecorator,
  CenterMediumWidthDecorator
} from '../../../../../.storybook/util';

// Stories For SigninForm
storiesOf('Features/Events/Component/EventCard', module)
  .addDecorator(storyFn => withProvider(storyFn)) // Used if it's a redux form
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Default', () => (
    <EventCard
      itemId="eventId1"
      onClickCard={() => console.log('Card Clicked')}
      onChangeBanner={() => console.log('On Change Banner')}
      onEdit={() => console.log('On Edit')}
      onRemove={() => console.log('On Remove')}
      editable
      onActiveCard={() => console.log('On Active Card')}
    />
  ))
  .add('With Long Name', () => (
    <EventCard
      itemId="eventId2"
      onClickCard={() => console.log('Card Clicked')}
      onChangeBanner={() => console.log('On Change Banner')}
      onEdit={() => console.log('On Edit')}
      onRemove={() => console.log('On Remove')}
      editable
      onActiveCard={() => console.log('On Active Card')}
    />
  ))
  .add('Event Card Overlay', () => (
    <EventCard
      itemId="eventId1"
      onClickCard={() => console.log('Card Clicked')}
      onChangeBanner={() => console.log('On Change Banner')}
      onEdit={() => console.log('On Edit')}
      onRemove={() => console.log('On Remove')}
      editable
      onActiveCard={() => console.log('On Active Card')}
      overlay
    />
  ));
