import { Col, Form, Row } from 'antd';
import React, { Fragment } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import useReactRouter from 'use-react-router';
import { LoadingContainer } from '../../../../../common/components/container';
import RenderCount from '../../../../../common/performance/RenderCount';
import TournamentsConstants from '../constants/TournamentsConstants';
import GameCharacteristics from './form/GameCharacteristics';
import GeneralInformation from './form/GeneralInformation';

type TournamentInformationFormType = {};

type TournamentInformationComponentProps = {};

type GlobalProps = InjectedFormProps<
  TournamentInformationFormType & TournamentInformationComponentProps
> &
  TournamentInformationComponentProps;

type MatchParamsEventId = {
  eventId: string;
  tournamentId: string;
};

/**
 * Tournament Information
 */
const TournamentInformationComponent = (props: GlobalProps) => {
  const { match } = useReactRouter<MatchParamsEventId>();
  const { eventId } = match.params;

  return (
    <Fragment>
      <Form className="form w-100 p-4">
        <RenderCount componentName="TournamentInformation" />
        <Row>
          <Col md={10}>
            <GeneralInformation eventId={eventId} />
          </Col>
          <Col md={10} offset={2}>
            <GameCharacteristics />
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

//* ******************** */
// Redux Form            */
//* ******************** */
const TournamentInformationForm = reduxForm<
  TournamentInformationFormType,
  TournamentInformationComponentProps
>({
  form: TournamentsConstants.FORM_GENERAL_INFO
})(TournamentInformationComponent);

export default LoadingContainer(['UPDATE_TOURNAMENT_INFORMATION'])(
  TournamentInformationForm
);
