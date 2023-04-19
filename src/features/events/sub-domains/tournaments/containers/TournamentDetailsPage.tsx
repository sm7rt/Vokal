import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Card, Popconfirm, Row } from 'antd';
import { push } from 'connected-react-router';
import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isDirty, submit } from 'redux-form';
import useReactRouter from 'use-react-router';
import { IRootState } from '../../../../../common/models/StateModel.d';
import EventsActions from '../../../redux/EventsRedux';
import TournamentFormat from '../components/TournamentFormat';
import TournamentInformation from '../components/TournamentInformation';
import TournamentStructure from '../components/TournamentStructure';
import TournamentsConstants from '../constants/TournamentsConstants';
import { tournamentFromListSelector } from '../redux/TournamentsRedux';
import RenderCount from '../../../../../common/performance/RenderCount';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  location: {
    state: {
      title: string;
    };
  };
};

type MatchParamsEventId = {
  eventId: string;
  tournamentId: string;
};

/**
 * Details Festival Page
 */
const DetailsFestivalPage = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { match } = useReactRouter<MatchParamsEventId>();
  const { eventId, tournamentId } = match.params;
  const tournament = useSelector((state: IRootState) =>
    tournamentFromListSelector(state, tournamentId)
  );
  const [tab, setTab] = useState('information');

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  /* eslint-disable */
  useEffect(() => {
    dispatch(
      EventsActions.fetchTournamentDetailsRequest(eventId, tournamentId)
    );
  }, []);

  //* ******************** */
  // FORM VALUE / SELECTORS   */
  //* ******************** */
  const informationFormSelector = isDirty(
    TournamentsConstants.FORM_GENERAL_INFO
  );
  const informationFormDirty = useSelector(informationFormSelector);

  const formatFormSelector = isDirty(TournamentsConstants.FORM_FORMAT_INFO);
  const formatFormDirty = useSelector(formatFormSelector);

  const structureDirty = tournament && tournament.structureUpdated;

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  const saveTournamentDetails = () => {
    // Information
    if (informationFormDirty) {
      dispatch(submit(TournamentsConstants.FORM_GENERAL_INFO));
    }

    if (formatFormDirty) {
      dispatch(submit(TournamentsConstants.FORM_FORMAT_INFO));
    }

    if (structureDirty) {
      dispatch(
        EventsActions.updateTournamentStructureRequest(eventId, tournamentId)
      );
    }
  };

  /**
   * Submit Information Form
   * @param data
   */
  const onSubmitInformationForm = (data: any) =>
    dispatch(
      EventsActions.updateTournamentInformationRequest(
        eventId,
        tournamentId,
        data
      )
    );

  /**
   * Submit format form
   */
  const onSubmitFormatForm = (data: any) => {
    // Send null when fields are unchecked
    //
    if (!data.rebuyAllowed) {
      data.rebuyDetails = null;
    }
    if (!data.reEntryAllowed) {
      data.reEntryDetails = null;
    }
    if (!data.addOnAllowed) {
      data.addOnDetails = null;
    }

    dispatch(
      EventsActions.updateTournamentFormatRequest(eventId, tournamentId, data)
    );
  };

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Fragment>
      <RenderCount componentName="TournamentDetailsPage" />
      <PageHeaderWrapper
        title={tournament && tournament.name && tournament.name.toUpperCase()}
        extra={
          <Row style={{ marginTop: 10 }}>
            <Button
              type="primary"
              disabled={
                !informationFormDirty && !formatFormDirty && !structureDirty
              }
              icon="save"
              onClick={() => saveTournamentDetails()}
            >
              Save
            </Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                dispatch(
                  EventsActions.deleteTournamentRequest(eventId, tournamentId)
                );
                dispatch(
                  push(`/admin/events/managment/${eventId}/tournaments`)
                );
              }}
            >
              <Button type="danger" icon="delete" className="ml-2">
                Delete
              </Button>
            </Popconfirm>
          </Row>
        }
        tabActiveKey={tab}
        tabList={[
          {
            key: 'information',
            tab: t('TOURNAMENT_INFORMATION')
          },
          {
            key: 'format',
            tab: t('TOURNAMENT_FORMAT')
          },
          {
            key: 'structure',
            tab: t('TOURNAMENT_STRUCTURE')
          },
          {
            key: 'result',
            tab: t('TOURNAMENT_RESULT')
          }
        ]}
        onTabChange={setTab}
      />
      <Card className="w-100 mt-2">
        {tab === 'information' && (
          <TournamentInformation
            initialValues={tournament}
            onSubmit={onSubmitInformationForm}
          />
        )}
        {tab === 'format' && (
          <TournamentFormat
            initialValues={tournament}
            onSubmit={onSubmitFormatForm}
          />
        )}
        {tab === 'structure' && <TournamentStructure />}
      </Card>
    </Fragment>
  );
};

// Export Default
export default React.memo(DetailsFestivalPage);
