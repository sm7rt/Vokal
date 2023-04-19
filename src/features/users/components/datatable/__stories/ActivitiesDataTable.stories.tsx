import { storiesOf } from '@storybook/react';
import React from 'react';
import { ContainerFluidDecorator } from '../../../../../../.storybook/util';
import ActivitiesDataTable from '../ActivitiesDataTable';
import { activities } from '../../../services/FixtureUserApi';

// Stories For ActivitiesDataTable
storiesOf('Features/Users/Components/ActivitiesDatatable', module)
  .addDecorator(ContainerFluidDecorator)
  .add('Default', () => (
    <ActivitiesDataTable
      defaultPageSize={10}
      data={activities}
      totalElements={3}
      fetchActivities={() => {}}
    />
  ));
