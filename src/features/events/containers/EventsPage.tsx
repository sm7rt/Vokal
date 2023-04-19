import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Col, Input, Icon } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderCount from '../../../common/performance/RenderCount';
import EventList from '../components/EventsList';
import EventsActions, { eventsListSelector } from '../redux/EventsRedux';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../common/models/StateModel';
import debounce from 'lodash/debounce';

/**
 * Events Page
 */
const EventsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('running');
  const eventListObj = useSelector((state: IRootState) =>
    eventsListSelector(state, tab === 'running' ? 'RUNNING' : 'FINISHED')
  );

  /**
   * Search an Event
   */
  const searchEvent = (value: string) => {
    if (tab === 'running') {
      dispatch(
        EventsActions.fetchRunningEventsRequest(
          {
            name: value
          },
          1,
          eventListObj.size
        )
      );
    } else {
      dispatch(
        EventsActions.fetchFinishedEventsRequest(
          {
            name: value
          },
          1,
          eventListObj.size
        )
      );
    }
  };

  return (
    <Col className="h-100 d-flex flex-column">
      <RenderCount componentName="EventsPage" />
      <PageHeaderWrapper
        tabActiveKey={tab}
        tabList={[
          {
            key: 'running',
            tab: t('RUNNING_EVENTS')
          },
          {
            key: 'finished',
            tab: t('FINISHED_EVENTS')
          }
        ]}
        onTabChange={setTab}
        title={t('CREATE_MANAGE_SPECIAL_POKER_EVENTS')}
        tabBarExtraContent={
          <Input
            placeholder="Search for an event"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={event => {
              const value = event.target.value;
              const debounceSearch = debounce(() => searchEvent(value), 500);
              return debounceSearch();
            }}
            style={{ width: 300, top: -2 }}
          />
        }
      />
      <EventList type={tab === 'running' ? 'RUNNING' : 'FINISHED'} />
    </Col>
  );
};

export default React.memo(EventsPage);
