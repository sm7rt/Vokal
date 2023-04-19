import { Table } from 'antd';
import * as React from 'react';
import TournamentsConstants from '../../constants/TournamentsConstants';
import TournamentStyles from '../../styles/Tournaments.module.scss';

//* ******************** */
// DATATABLE CONFIG      */
//* ******************** */

const BREAK_TYPE = 'BREAK';

// header For DataTable
const columns = [
  {
    title: TournamentsConstants.LEVEL_HEADER,
    render: (data: GamesApiDefinitions.StructureLevel) =>
      data.type !== BREAK_TYPE ? data.level : BREAK_TYPE
  },
  {
    title: TournamentsConstants.SB_HEADER,
    render: (data: GamesApiDefinitions.StructureLevel) =>
      data.type !== BREAK_TYPE && data.smallBlind
  },
  {
    title: TournamentsConstants.BB_HEADER,
    render: (data: GamesApiDefinitions.StructureLevel) =>
      data.type !== BREAK_TYPE && data.bigBlind
  },
  {
    title: TournamentsConstants.ANTE_HEADER,
    render: (data: GamesApiDefinitions.StructureLevel) =>
      data.type !== BREAK_TYPE && data.ante
  },
  {
    title: TournamentsConstants.DURATION_HEADER,
    dataIndex: 'duration'
  }
];

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  datas: Array<any>;
};

// Flop Button Icon Component
const StructureDataTable = ({ datas }: Props) => (
  <Table
    rowClassName={(record: any, index: number) =>
      record.type === BREAK_TYPE ? TournamentStyles.breakLine : ''
    }
    className="w-100"
    columns={columns}
    dataSource={datas}
    rowKey="id"
    pagination={false}
  />
);

// Export Default
export default StructureDataTable;
