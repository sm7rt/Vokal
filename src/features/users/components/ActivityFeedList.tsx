import { Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import UsersActions, { userFromListSelector } from '../redux/UserRedux';
import { IRootState } from '../../../common/models/StateModel';
import ActivitiesDataTable from './datatable/ActivitiesDataTable';
//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {};

/**
 * Activity Feed List
 */
const ActivityFeedList = (props: Props) => {
  const profile = useSelector(
    (state: IRootState) =>
      state.authentication.signin &&
      userFromListSelector(state, state.authentication.signin.id)
  );

  const dispatch = useDispatch();

  const userId = profile.id;

  // When cancel editing
  const fetchActivities = (page: number, size: number) => {
    dispatch(UsersActions.fetchActivitiesFeedRequest(userId, page, size));
  };

  const activitiesFeed = profile.activitiesFeed ? profile.activitiesFeed : [];
  //* ******************** */
  // COMPONENT             */
  //* ******************** */
  /* eslint-disable */

  /**
   * Render
   */
  return (
    <Card className="h-100" title="Activity Feed">
      <ActivitiesDataTable
        defaultPageSize={10}
        data={activitiesFeed.data}
        totalElements={activitiesFeed.totalElements}
        fetchActivities={fetchActivities}
      />
    </Card>
  );
};

export default React.memo(ActivityFeedList);
