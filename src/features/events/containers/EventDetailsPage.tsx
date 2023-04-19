import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Popover, Row } from 'antd';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import TemplateStructure from '../../../assets/templates/Tournaments_Schedule_Template.xlsx';
import ExcelParser from '../../../common/components/form/file/ExcelParser';
import { IRootState } from '../../../common/models/StateModel.d';
import MessagesActions from '../../../common/redux/SystemMessagesRedux';
import {
  addReentry,
  parsePPDate,
  parseStartStack,
  validateRequired
} from '../../../utils/ExcelUtils';
import { TournamentScheduleType } from '../models/EventsModel.d';
import EventsActions, { eventFromListSelector } from '../redux/EventsRedux';
import TournamentList from '../sub-domains/tournaments/components/TournamentList';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {};

type MatchParamsEventId = {
  eventId: string;
};

/**
 * Event Details Page
 */
const EventDetailsPage = (props: Props) => {
  const dispatch = useDispatch();
  const { match } = useReactRouter<MatchParamsEventId>();
  const { eventId } = match.params;
  const event = useSelector((state: IRootState) =>
    eventFromListSelector(state, eventId)
  );

  let fileExcelInput: any;
  let downloadTemplateFile: any;

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  /**
   * Manage Handle Csv Data for fill Tournaments Schedule
   */
  const handleCsvData = (data: Array<TournamentScheduleType>) => {
    let dataFormated;
    try {
      dataFormated = data.map((l, i) => ({
        date: parsePPDate(
          validateRequired(l.date, 'Date'),
          validateRequired(l.startTime, 'StartTime'),
          event.startDate,
          event.endDate
        ), // TODO Parse Date
        buyIn: l.buyIn, // Parse BuyIN
        // casino,this
        eventNumber: validateRequired(l.eventNumber, 'Event Number'),
        fee: l.fee,
        name: validateRequired(l.name, 'Event Name'),
        tournamentCurrency: validateRequired(l.currency, 'Currency'),
        gameVariant: validateRequired(l.gameVariant, 'Game Variant'),
        lateRegistrationLevel: parseInt(l.lateRegLevels, 10) || 0,
        startStack: parseStartStack(l.startStack),
        takeOut: parseInt(l.takeOut, 10) || 0,
        format: {
          ...addReentry(l)
        }
      }));
      // We call the service
      dispatch(EventsActions.uploadScheduleRequest(eventId, dataFormated));
    } catch (e) {
      dispatch(
        MessagesActions.addMessage(
          'TOURNAMENT_UPLOAD_SCHEDULE_ERROR',
          'ERROR',
          e.message,
          '',
          'PANEL'
        )
      );
      // Remove File inside Input
      fileExcelInput.value = null;
    }
  };

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Fragment>
      <PageHeaderWrapper
        title={`${event.name && event.name.toUpperCase()}`}
        extra={
          <Row style={{ marginTop: 10 }}>
            <Popover
              placement="topLeft"
              title="Information"
              content={
                <div>
                  <div>
                    You have the possibility to import your complete schedule
                    from an Excel File. This file should respect a template
                    format.
                  </div>
                  You don't have the template ? Download it from{' '}
                  <span
                    className="text-primary cursor-pointer"
                    onClick={() => downloadTemplateFile.click()}
                  >
                    here
                  </span>
                  .
                </div>
              }
              arrowPointAtCenter
            >
              <Button
                type="primary"
                icon="upload"
                onClick={() => fileExcelInput.click()}
              >
                Import Tournament Schedule
              </Button>
            </Popover>
          </Row>
        }
      />
      <Row type="flex" align="middle" justify="center" className="mt-4">
        <TournamentList eventId={eventId} />
      </Row>
      <ExcelParser
        keys={[
          'date',
          'startTime',
          'lateRegLevels',
          'eventNumber',
          'name',
          'gameVariant',
          'buyIn',
          'fee',
          'takeout',
          'currency',
          'startStack',
          'reEntry'
        ]}
        onDataUploaded={handleCsvData}
        onError={() => {}} //TODO
        render={(onChange: any) => (
          <input
            ref={ref => (fileExcelInput = ref)}
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={onChange}
          />
        )}
      />
      <a
        ref={ref => (downloadTemplateFile = ref)}
        className="hidden"
        href={TemplateStructure}
      >
        Download Structure
      </a>
    </Fragment>
  );
};

export default React.memo(EventDetailsPage);
