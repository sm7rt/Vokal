import { Row, Table, Popconfirm, Button } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from '../../styles/Tournaments.module.scss';
import TournamentsConstants from '../../constants/TournamentsConstants';

//* ******************** */
// DATATABLE CONFIG      */
//* ******************** */

// header For DataTable
const columns = ({ onDelete }: { onDelete: (id: string) => void }) => [
  {
    title: TournamentsConstants.ID_HEADER,
    dataIndex: 'eventID'
  },
  {
    title: TournamentsConstants.EVENT_NUMBER_HEADER,
    dataIndex: 'eventNumber'
  },
  {
    title: TournamentsConstants.DATE_HEADER,
    render: (data: GamesApiDefinitions.LiveTournamentDocument) =>
      data.date
        ? moment(data.date)
            .parseZone()
            .format('ddd DD MMM YY')
        : ''
  },
  {
    title: TournamentsConstants.START_TIME_HEADER,
    render: (data: GamesApiDefinitions.LiveTournamentDocument) =>
      data.date
        ? moment(data.date)
            .parseZone()
            .format('h:mm A')
        : ''
  },
  {
    title: TournamentsConstants.NAME_HEADER,
    dataIndex: 'name',
    className: styles.nameCell
  },
  {
    title: TournamentsConstants.GAME_HEADER,
    dataIndex: 'gameVariant'
  },
  {
    title: TournamentsConstants.BUY_IN_HEADER,
    dataIndex: 'buyIn'
  },
  {
    title: TournamentsConstants.FEES_HEADER,
    dataIndex: 'fee'
  },
  {
    title: TournamentsConstants.LATE_REG_HEADER,
    render: (data: GamesApiDefinitions.LiveTournamentDocument) =>
      data.lateRegistrationLevel
        ? `End of level ${data.lateRegistrationLevel}`
        : '-'
  },
  {
    title: 'Actions',
    render: (data: GamesApiDefinitions.LiveTournamentDocument) => {
      return (
        <Row>
          <Button
            type="primary"
            shape="circle"
            icon="edit"
            className="mr-2 cursor-pointer"
          />
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(data.id)}
          >
            <Button
              type="danger"
              shape="circle"
              icon="delete"
              className="cursor-pointer"
            />
          </Popconfirm>
        </Row>
      );
    }
  }
];

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  datas: Array<any>;
  onDelete: (id: string) => void;
  onClickTournament: (id: string) => void;
  totalElements: number;
  onChangePage: (currentPage: number, size: number) => void;
};

// Tournament DataTable
const TournamentDataTable = ({
  datas,
  onDelete,
  onClickTournament,
  totalElements,
  onChangePage
}: Props) => {
  return (
    <Table
      onChange={pagination => {
        console.log('pagination Change');
        onChangePage(pagination.current, pagination.pageSize);
      }}
      rowClassName={(record: any, index: number) =>
        `${styles.rowClassName} cursor-pointer`
      }
      className="w-100"
      pagination={{
        defaultPageSize: 20,
        total: totalElements,
        showSizeChanger: false
        // pageSizeOptions: ['10', '20', '30', '40', '50']
      }}
      columns={columns({ onDelete })}
      dataSource={datas}
      rowKey="id"
      onRow={(record, rowIndex) => {
        return {
          onClick: () => onClickTournament(record.id) // click row
        };
      }}
    />
  );
};

// Export Default
export default TournamentDataTable;
