import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { IRootState } from '../../../common/models/StateModel.d';
import RenderCount from '../../../common/performance/RenderCount';
import EventsActions, { eventsListSelector } from '../redux/EventsRedux';
import EventCard from './EventCard';
import { LoadingContainer } from '../../../common/components/container';
import EventCreationModal from '../components/modal/EventCreationModal';
import { useTranslation } from 'react-i18next';
import { Card, Row, Icon } from 'antd';
import { currentCasinoSelector } from '../../authentication/redux/AuthenticationRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  type: 'RUNNING' | 'FINISHED';
};

const useFetchEventsRequest = (
  type: 'RUNNING' | 'FINISHED',
  eventListObj: any
) => {
  const dispatch = useDispatch();
  /* eslint-disable */
  useEffect(() => {
    if (type === 'RUNNING') {
      dispatch(
        EventsActions.fetchRunningEventsRequest(
          eventListObj.filters,
          eventListObj.page,
          eventListObj.size
        )
      );
    } else {
      dispatch(
        EventsActions.fetchFinishedEventsRequest(
          eventListObj.filters,
          eventListObj.page,
          eventListObj.size
        )
      );
    }
  }, [type, eventListObj.filters]);
};

/**
 * Event List Page
 */
const EventList = (props: Props) => {
  const dispatch = useDispatch();
  const { history } = useReactRouter();
  const eventListObj = useSelector((state: IRootState) =>
    eventsListSelector(state, props.type)
  );
  const { t } = useTranslation();
  const { type } = props;
  const [visibleCreationEvent, setVisibleCreationEvent] = useState(false);
  const casinoId = useSelector(currentCasinoSelector);
  const [activeEvent, setActiveEvent] = useState();

  useFetchEventsRequest(props.type, eventListObj);

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  /**
   * When We Try to create a new festival
   */
  const onSubmitEventCreation = (data: any) => {
    dispatch(EventsActions.createEventRequest(casinoId, data));
  };

  /**
   * On Click on festival card
   */
  const onClickEventCard = (id: string) => {
    history.push(`/admin/events/managment/${id}/tournaments`);
  };

  /**
   * Indicate if we need to show EmptyState message
   */
  const isEmpty = () =>
    eventListObj.listIds.length === 0 &&
    (!eventListObj.filters || Object.keys(eventListObj.filters).length === 0);

  /**
   *
   * @param eventId
   * @param active
   */
  const onActiveCard = (eventId: string, active: boolean) => {
    if (active) {
      setActiveEvent(eventId);
    } else {
      setActiveEvent(null);
    }
  };

  //* ******************** */
  // RENDER */
  //* ******************** */
  // push, match,
  return (
    <div className="d-flex flex-fill flex-row justify-content-start h-100 m-3">
      <RenderCount componentName={`EventList`} />
      <div className={`d-flex flex-fill flex-column`}>
        <div className="d-flex flex-fill flex-column justify-content-start align-items-start">
          {/* Info Header */}
          {type === 'RUNNING' && isEmpty() && (
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              {/* Empty State Upcoming & Running Events */}
              <p className="m-0 text-darkGrey font-14">
                {t('EVENT_TOURNAMENT_EMPTY_STATE')}
              </p>
            </div>
          )}
          {/* Empty State Finished Events */}
          {type === 'FINISHED' && eventListObj.listIds.length === 0 && (
            <div className="d-flex flex-fill justify-content-center align-items-center  w-100">
              <p className="m-0 text-darkGrey font-14">
                {t('EVENT_FINISHED_TOURNAMENT_EMPTY_STATE')}
              </p>
            </div>
          )}

          {/* Event List Card */}
          <div className="d-flex flex-row justify-content-start align-items-start flex-wrap">
            {eventListObj.listIds.map((id: string) => (
              <div key={id} className="d-flex m-3">
                <EventCard
                  itemId={id}
                  onClickCard={onClickEventCard}
                  onRemove={(eventId: string) =>
                    dispatch(EventsActions.deleteEventRequest(eventId))
                  }
                  onChangeBanner={(eventId: string, data: any) =>
                    dispatch(
                      EventsActions.editEventBannerRequest(eventId, data)
                    )
                  }
                  onEdit={(eventId: string, data: any) =>
                    dispatch(EventsActions.editEventRequest(eventId, data))
                  }
                  editable={type === 'RUNNING'}
                  overlay={activeEvent && activeEvent !== id}
                  onActiveCard={onActiveCard}
                />
              </div>
            ))}
            {/* Empy Card */}
            {type === 'RUNNING' && (
              <div className="d-flex m-3">
                <Card
                  id="button-create-event"
                  className={`event-card ${activeEvent &&
                    'event-card-overlay'}`}
                  onClick={() => !activeEvent && setVisibleCreationEvent(true)}
                >
                  <Row
                    type="flex"
                    justify="center"
                    align="middle"
                    style={{ height: 205 }}
                  >
                    <Icon type="plus-circle" style={{ fontSize: 60 }} />
                  </Row>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      <EventCreationModal
        onSubmit={onSubmitEventCreation}
        visible={visibleCreationEvent}
        setVisible={setVisibleCreationEvent}
      />
    </div>
  );
};

export default LoadingContainer([
  'CREATE_EVENT',
  'DELETE_EVENT',
  'FETCH_RUNNING_EVENTS',
  'FETCH_FINISHED_EVENTS',
  'UPLOAD_BANNER'
])(React.memo(EventList));
