import { Col, Row, Card, Button } from 'antd';
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { LoadingContainer } from '../../../../../common/components/container';
import { IRootState } from '../../../../../common/models/StateModel.d';
import RenderCount from '../../../../../common/performance/RenderCount';
import { tournamentFromListSelector } from '../redux/TournamentsRedux';
import StructureDataTable from './datatable/StructureDataTable';
import TournamentsConstants from '../constants/TournamentsConstants';
import TemplateStructure from '../../../../../assets/templates/Structure_Template.xlsx';
import ExcelParser from '../../../../../common/components/form/file/ExcelParser';
import EventsActions from '../../../redux/EventsRedux';

type TournamentStructureComponentProps = {};

type MatchParams = {
  tournamentId: string;
  eventId: string;
};

/**
 * Tournament Structure
 */
const TournamentStructure = (props: TournamentStructureComponentProps) => {
  let fileExcelInput: any; // File containing excel input
  let downloadTemplateFile: any; // Link for download Template file
  const dispatch = useDispatch();
  const { match } = useReactRouter<MatchParams>();
  const { tournamentId, eventId } = match.params;
  const tournament = useSelector((state: IRootState) =>
    tournamentFromListSelector(state, tournamentId)
  );

  /**
   * Manage Handle Csv Data for fill the structure
   */
  const handleCsvData = (datas: GamesApiDefinitions.StructureLevel[]) => {
    dispatch(EventsActions.importStructure(eventId, tournamentId, datas));
  };

  //* ******************** */
  // RENDER */
  //* ******************** */

  return (
    <Fragment>
      <RenderCount componentName="TournamentStructure" />
      <Row>
        <Col md={10}>
          <Card title="Upload A Structure">
            <span>
              Follow steps below to upload a structure to this tournament.
            </span>
            <ul>
              <li>
                Get the template Excel file{' '}
                <span
                  onClick={e => {
                    e.preventDefault();
                    downloadTemplateFile.click();
                  }}
                  className="text-primary cursor-pointer font-weight-bold"
                >
                  here
                </span>
                .
              </li>
              <li>Fill this file. Be careful to respect sample format.</li>
              <li>
                Then Click on the following button to upload your structure.
              </li>
            </ul>
            <div className="text-right">
              <Button
                icon="upload"
                type="primary"
                onClick={() => fileExcelInput.click()}
              >
                {TournamentsConstants.IMPORT_FILE}
              </Button>
            </div>
          </Card>
        </Col>
        <Col md={12} offset={2}>
          <StructureDataTable
            datas={
              tournament && tournament.tournamentStructure
                ? tournament.tournamentStructure.levels
                : []
            }
          />
        </Col>
      </Row>
      <ExcelParser
        keys={['type', 'level', 'smallBlind', 'bigBlind', 'ante', 'duration']}
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

export default LoadingContainer(['UPDATE_TOURNAMENT_STRUCTURE'])(
  React.memo(TournamentStructure)
);
