import { Card, Icon, Row, Skeleton, Col, Button, Form } from 'antd';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import defaultImg from '../../../assets/images/default-event.png';
import { IRootState } from '../../../common/models/StateModel.d';
import { eventFromListSelector } from '../redux/EventsRedux';
import { createLoadingSelector } from '../../../common/redux/LoadingRedux';
import EventCreationForm from './form/EventCreationForm';
import EventsConstants from '../constants/EventsConstants';
import { submit, Field, reduxForm } from 'redux-form';
import AntdFileUploadField from '../../../common/components/form/AntdFileUploadField';
import EditableImage from '../../../common/components/avatar/EditableImage';
import './EventCard.scss';

const Meta = Card.Meta;

type EventCardProps = {
  itemId: string;
  onRemove: (id: string) => void;
  onChangeBanner: (id: string, data: any) => void;
  onEdit: (id: string, data: any) => void;
  onClickCard: (id: string) => void;
  overlay: boolean;
  onActiveCard: (id: string, active: boolean) => void;
};

// Event Card
const EventCard = (props: EventCardProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditCard, setShowEditCard] = useState(false);
  const [showEditBanner, setShowEditBanner] = useState(false);
  const dispatch = useDispatch();
  const {
    onChangeBanner,
    onEdit,
    onRemove,
    onClickCard,
    onActiveCard,
    itemId,
    overlay
  } = props;
  const item = useSelector((state: IRootState) =>
    eventFromListSelector(state, itemId)
  );

  const loading = useSelector((state: IRootState) =>
    createLoadingSelector([`FETCH_EVENT_${itemId}`])(state.loading)
  );

  const { t } = useTranslation();

  /**
   * Edit Event Card
   */
  const editEventCard = (type: 'DELETE' | 'EDIT' | 'EDIT_BANNER') => {
    onActiveCard(itemId, true);
    if (type === 'DELETE') {
      setShowDeleteConfirm(true);
    } else if (type === 'EDIT') {
      setShowEditCard(true);
    } else if (type === 'EDIT_BANNER') {
      setShowEditBanner(true);
    }
  };

  /**
   * Cancel edit Event Card
   */
  const cancelEditEventCard = (type: 'DELETE' | 'EDIT' | 'EDIT_BANNER') => {
    onActiveCard(itemId, false);
    if (type === 'DELETE') {
      setShowDeleteConfirm(false);
    } else if (type === 'EDIT') {
      setShowEditCard(false);
    } else if (type === 'EDIT_BANNER') {
      setShowEditBanner(false);
    }
  };

  /**
   * Remove Event
   */
  const removeEvent = () => {
    onRemove(itemId);
    cancelEditEventCard('DELETE');
  };

  /**
   * Edit Event
   */
  const editEvent = () => {
    dispatch(submit(`${EventsConstants.FORM_EDIT_EVENT}-${itemId}`));
  };

  /**
   * Edit Banner Event
   */
  const editBannerEvent = () => {
    dispatch(submit(`${EventsConstants.FORM_EDIT_BANNER}-${itemId}`));
  };

  /**
   * Banner Form Update
   */
  const BannerForm = reduxForm({
    form: `${EventsConstants.FORM_EDIT_BANNER}-${itemId}`
  })(() => (
    <Form style={{ height: '110px' }}>
      <Field
        id={`imageCard-${item.id}`}
        name="banner"
        component={AntdFileUploadField}
        hasFeedback
        previewWith={359}
        previewHeight={110}
        className="simple-upload mb-0"
        disabled={!showEditBanner}
        accept=".png,.jpg"
        children={(props: any) => (
          <EditableImage
            editable={showEditBanner}
            size={359}
            src={props.input.value.imageUrl || item.imageURI}
            shouldShowOverlay
          >
            {({ src }) => (
              <img
                alt="Banner Event"
                width="359px"
                height="110px"
                src={src || defaultImg}
              />
            )}
          </EditableImage>
        )}
      />
    </Form>
  ));

  return (
    <Fragment>
      {/* Classic Card with Cover  */}
      {!showEditCard && (
        <Card
          className={`event-card ${overlay && 'event-card-overlay'}`}
          cover={
            showEditBanner ? (
              <BannerForm
                onSubmit={data => {
                  onChangeBanner(itemId, data);
                  cancelEditEventCard('EDIT_BANNER');
                }}
              />
            ) : (
              <img
                id={`imageCard-${itemId}`}
                alt="Banner Event"
                width="359px"
                height="110px"
                src={item.imageURI || defaultImg}
                onClick={() => onClickCard(props.itemId)}
              />
            )
          }
          actions={
            !showDeleteConfirm && !showEditBanner
              ? [
                  <Icon
                    id={`editCard-${item.id}`}
                    type="edit"
                    onClick={() => editEventCard('EDIT')}
                  />,
                  <Icon
                    id={`editBanner-${item.id}`}
                    type="picture"
                    onClick={() => editEventCard('EDIT_BANNER')}
                  />,
                  <Icon
                    id={`deleteCard-${item.id}`}
                    type="delete"
                    onClick={() => editEventCard('DELETE')}
                  />
                ]
              : false
          }
        >
          {/* Classic Card  View */}
          {!showDeleteConfirm && !showEditBanner && (
            <Skeleton loading={loading} active>
              <Meta
                title={item.name}
                id={`metaCard-${item.id}`}
                description={
                  <Row type="flex" align="middle" justify="space-between">
                    <span
                      id={`eventNumber-${item.id}`}
                      className="text-primary font-weight-bold"
                    >{`${item.eventNumber || 0} events`}</span>
                    <span id={`dateRange-${item.id}`}>
                      {moment(item.startDate).format('Do MMM')} -
                      {moment(item.endDate).format('Do MMM YYYY')}
                    </span>
                  </Row>
                }
                onClick={() => onClickCard(props.itemId)}
              />
            </Skeleton>
          )}
          {/* Delete Confirm View */}
          {showDeleteConfirm && (
            <Col style={{ height: '93px' }}>
              <p>
                <Icon type="info-circle" className="mr-2 text-danger" />
                {t('REMOVE_EVENT_CONFIRMATION_TEXT')}
              </p>
              <Row type="flex" justify="end" className="mt-5">
                <Button
                  onClick={() => cancelEditEventCard('DELETE')}
                  className="mr-2"
                >
                  {t('CANCEL_BUTTON')}
                </Button>
                <Button
                  id="confirmDeleteButton"
                  onClick={removeEvent}
                  type="danger"
                >
                  {t('DELETE_BUTTON')}
                </Button>
              </Row>
            </Col>
          )}
          {/* Edit Banner View */}
          {showEditBanner && (
            <Col style={{ height: '93px' }}>
              <p>
                <Icon type="picture" className="mr-2 text-success" />
                {t('EDIT_BANNER_TEXT')}
              </p>
              <Row type="flex" justify="end" className="mt-5">
                <Button
                  onClick={() => cancelEditEventCard('EDIT_BANNER')}
                  className="mr-2"
                >
                  {t('CANCEL_BUTTON')}
                </Button>
                <Button
                  id="confirmDeleteButton"
                  onClick={editBannerEvent}
                  type="primary"
                >
                  {t('APPLY_BUTTON')}
                </Button>
              </Row>
            </Col>
          )}
        </Card>
      )}
      {showEditCard && (
        <Card className={`event-card`}>
          <EventCreationForm
            initialValues={item}
            edition
            form={`${EventsConstants.FORM_EDIT_EVENT}-${itemId}`}
            onSubmit={data => {
              onEdit(item.id, data);
              cancelEditEventCard('EDIT');
            }}
          />
          <Row type="flex" justify="end" className="mt-2">
            <Button
              onClick={() => cancelEditEventCard('EDIT')}
              className="mr-2"
            >
              {t('CANCEL_BUTTON')}
            </Button>
            <Button id="confirmEditButton" onClick={editEvent} type="primary">
              {t('APPLY_BUTTON')}
            </Button>
          </Row>
        </Card>
      )}
    </Fragment>
  );
};

export default EventCard;
