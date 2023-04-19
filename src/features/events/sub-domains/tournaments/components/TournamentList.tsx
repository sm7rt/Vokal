import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingContainer } from '../../../../../common/components/container';
import { IRootState } from '../../../../../common/models/StateModel.d';
import EventsActions from '../../../redux/EventsRedux';
import { tournamentsLinkWithDataSelector } from '../redux/TournamentsRedux';
import TournamentDataTable from './datatable/TournamentDataTable';
import { push } from 'connected-react-router';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  eventId: string; // The festival Id
};

/**
 * Tournament List
 */
const TournamentListComp = (props: Props) => {
  const dispatch = useDispatch();
  const { eventId } = props;
  const tournamentLink = useSelector((state: IRootState) =>
    tournamentsLinkWithDataSelector(state, eventId)
  );

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  /* eslint-disable */
  useEffect(() => {
    dispatch(
      EventsActions.fetchEventTournamentsRequest(
        eventId,
        {},
        1,
        tournamentLink.size
      )
    );
  }, []);

  // On Tournament clicked
  const onClickTournament = (tournamentId: string) => {
    dispatch(
      push(`/admin/events/managment/${eventId}/tournaments/${tournamentId}`)
    );
  };

  /**
   * Render
   */
  return (
    <div
      className="d-flex flex-column justify-content-start align-items-center w-100"
      id="tournamentTable"
    >
      <TournamentDataTable
        datas={tournamentLink.tournaments}
        onDelete={(tournamentId: string) =>
          dispatch(EventsActions.deleteTournamentRequest(eventId, tournamentId))
        }
        onClickTournament={onClickTournament}
        totalElements={tournamentLink.totalElements}
        onChangePage={(currentPage: number, size: number) =>
          dispatch(
            EventsActions.fetchEventTournamentsRequest(
              eventId,
              tournamentLink.filters,
              currentPage,
              tournamentLink.size
            )
          )
        }
        // festivalStartingDate={event.startDate}
        // festivalEndingDate={event.endDate}
      />
    </div>
  );
};

export default LoadingContainer([
  'FETCH_EVENT_TOURNAMENTS',
  'CREATE_TOURNAMENT'
])(React.memo(TournamentListComp));
