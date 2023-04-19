import { Button, Icon, Row, Table, Tag, Tooltip } from 'antd';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderCount from '../../../../../../common/performance/RenderCount';
import { useRunningCashGames } from '../../hooks/RunningCashGamesHooks';
import './RunningCashGamesDataTable.scss';
type Props = {};

/**
 * Calculate Total Players for a Game
 * @param runningGame
 */
const calculateTotalPlayers = (runningGame: any) => {
  let totalPlayers = 0;
  if (runningGame && runningGame.tables) {
    runningGame.tables.forEach((table: any) => {
      if (table.players) {
        totalPlayers = totalPlayers + table.players.length;
      }
    });
  }
  return totalPlayers;
};

//* ********************** */
// COLUMNS COMPONENTS      */
//* ********************** */
/**
 * Game Size Column
 */
const GameSizeColumn = React.memo(
  ({ runningGameId }: { runningGameId: string }) => {
    const runningGame = useRunningCashGames(runningGameId);

    if (runningGame) {
      return (
        <Fragment>
          <RenderCount componentName={`GameSizeColumn-${runningGameId}`} />
          <span>{runningGame.gameSize}</span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Game Variant Column
 */
const GameVariantColumn = React.memo(
  ({ runningGameId }: { runningGameId: string }) => {
    const runningGame = useRunningCashGames(runningGameId);

    if (runningGame) {
      return (
        <Fragment>
          <RenderCount componentName={`GameVariantColumn-${runningGameId}`} />
          <span>{runningGame.gameVariant}</span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Total Tables Column
 */
const TotalTableColumn = React.memo(
  ({ runningGameId }: { runningGameId: string }) => {
    const runningGame = useRunningCashGames(runningGameId);

    if (runningGame) {
      return (
        <Fragment>
          <RenderCount componentName={`TotalTableColumn-${runningGameId}`} />
          <span>{runningGame.tables.length}</span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Total Seated PLayers Column
 */
const TotalSeatedPlayersColumn = React.memo(
  ({ runningGameId }: { runningGameId: string }) => {
    const runningGame = useRunningCashGames(runningGameId);

    // Calculate Total Players
    const totalPlayers = calculateTotalPlayers(runningGame);

    if (runningGame) {
      return (
        <Fragment>
          <RenderCount
            componentName={`TotalSeatedPlayersColumn-${runningGameId}`}
          />
          <span>{totalPlayers}</span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Total Seated Available Column
 */
const TotalSeatedAvailableColumn = React.memo(
  ({ runningGameId }: { runningGameId: string }) => {
    const runningGame = useRunningCashGames(runningGameId);

    // Calculate Total Seat Available
    const totalPlayers = calculateTotalPlayers(runningGame);

    // Calculate Total Capacity
    let totalCapacity = 0;
    if (runningGame && runningGame.tables) {
      runningGame.tables.forEach((table: any) => {
        totalCapacity = totalCapacity + table.maxPlayers;
      });
    }

    // Calculate Total Seat Available
    const totalSeatAvailable = totalCapacity - totalPlayers;

    if (runningGame) {
      return (
        <Fragment>
          <RenderCount
            componentName={`TotalSeatedAvailableColumn-${runningGameId}`}
          />
          <span>{totalSeatAvailable}</span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Waiting List Number Column
 */
const WaitingListNumberColumn = React.memo(
  ({
    runningGameId,
    onShowWaitingList
  }: {
    runningGameId: string;
    onShowWaitingList: (id: string) => void;
  }) => {
    const runningGame = useRunningCashGames(runningGameId);

    if (runningGame) {
      return (
        <Fragment>
          <RenderCount
            componentName={`WaitingListNumberColumn-${runningGameId}`}
          />
          <span
            id={`waiting-list-${runningGameId}`}
            className="text-primary cursor-pointer text-decoration-underline"
            onClick={() => onShowWaitingList(runningGameId)}
          >
            {runningGame.waitingList ? runningGame.waitingList.length : 0}
          </span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Running Game Actions Column
 */
const RunningGamesActionsColumn = React.memo(
  ({
    runningGameId,
    overlayRow,
    onAddNewTable
  }: {
    runningGameId: string;
    overlayRow: string;
    onAddNewTable: (id: string) => void;
  }) => {
    const { t } = useTranslation();
    const runningGame = useRunningCashGames(runningGameId);

    if (runningGame) {
      return (
        <Fragment>
          <RenderCount
            componentName={`RunningGamesActionsColumn-${runningGameId}`}
          />
          <Fragment>
            {!overlayRow && (
              <Row type="flex" justify="end">
                <Tooltip title={t('ADD_NEW_TABLE')} placement="bottom">
                  <Button
                    id={`add-table-${runningGameId}`}
                    shape="circle"
                    icon="plus"
                    className="cursor-pointer text-success border-success"
                    onClick={() => onAddNewTable(runningGameId)}
                  />
                </Tooltip>
                {/* <Tooltip title={t('MANAGE_WAITING_LIST')} placement="bottom">
                    <Button
                      shape="circle"
                      icon="user"
                      className="cursor-pointer ml-2 text-primary border-primary"
                      // onClick={() => onPromoteCashGame(cashGame.id)}
                    />
                  </Tooltip> */}
              </Row>
            )}
          </Fragment>
        </Fragment>
      );
    }
    return null;
  }
);

//* ******************** */
// DATATABLE CONFIG      */
//* ******************** */

// Running CashGames DataTable
const RunningCashGamesDataTable = React.memo(
  ({
    datas, // sorts, // size, // totalElements, // handleTableChange,
    onEditTable,
    onAddNewTable,
    onShowSeatedPlayers,
    onShowJoinSeatRequests,
    onShowWaitingList,
    onCloseTable
  }: Props) => {
    const { t } = useTranslation();
    const [overlayRow, setOverlayRow] = useState();

    const columns = [
      {
        key: 'game-variant',
        title: t('CASH_GAMES_VARIANT_LABEL'),
        render: (runningGameId: string) => {
          const obj = {
            children: <GameVariantColumn runningGameId={runningGameId} />,
            props: {}
          };
          // Manage Merge Columns for Confirm Decline
          if (runningGameId === overlayRow) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      },
      {
        key: 'game-size',
        title: t('CASH_GAMES_SIZE_LABEL'),
        render: (runningGameId: string) => {
          const obj = {
            children: <GameSizeColumn runningGameId={runningGameId} />,
            props: {}
          };
          // Manage Merge Columns for Confirm Decline
          if (runningGameId === overlayRow) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      },
      {
        key: 'game-totalTables',
        title: t('CASH_GAMES_TOTAL_TABLES'),
        render: (runningGameId: string) => {
          const obj = {
            children: <TotalTableColumn runningGameId={runningGameId} />,
            props: {}
          };
          // Manage Merge Columns for Confirm Decline
          if (runningGameId === overlayRow) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      },
      {
        key: 'game-totalSeatedPlayers',
        title: t('CASH_GAMES_TOTAL_PLAYERS_LABEL'),
        render: (runningGameId: string) => {
          const obj = {
            children: (
              <TotalSeatedPlayersColumn runningGameId={runningGameId} />
            ),
            props: {}
          };
          // Manage Merge Columns for Confirm Decline
          if (runningGameId === overlayRow) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      },
      {
        key: 'game-totalSeatsAvailable',
        title: t('CASH_GAMES_TOTAL_SEAT_AVAILABLE_LABEL'),
        render: (runningGameId: string) => {
          const obj = {
            children: (
              <TotalSeatedAvailableColumn runningGameId={runningGameId} />
            ),
            props: {}
          };
          // Manage Merge Columns for Confirm Decline
          if (runningGameId === overlayRow) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      },
      {
        key: 'game-waitinglist',
        title: t('CASH_GAMES_WAITING_LIST_LABEL'),
        render: (runningGameId: string) => {
          const obj = {
            children: (
              <WaitingListNumberColumn
                runningGameId={runningGameId}
                onShowWaitingList={onShowWaitingList}
              />
            ),
            props: {}
          };
          // Manage Merge Columns for Confirm Decline
          if (runningGameId === overlayRow) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      },
      {
        key: 'game-action',
        className: 'action-buttons-column',
        render: (runningGameId: string) => {
          const obj = {
            children: (
              <RunningGamesActionsColumn
                runningGameId={runningGameId}
                overlayRow={overlayRow}
                onAddNewTable={onAddNewTable}
              />
            ),
            props: {}
          };
          // Manage Merge Columns for Confirm Decline
          if (runningGameId === overlayRow) {
            obj.props.colSpan = 0;
          }
          return obj;
        }
      }
    ];

    const ExpandedRowRender = ({
      runningGameId
    }: {
      runningGameId: string;
    }) => {
      const runningGame = useRunningCashGames(runningGameId);

      const columns = [
        {
          key: 'table-state',
          render: (table: any) => {
            // Calculate Table State
            const seatPlayers = table.players ? table.players.length : 0;
            const tableCapacity = table.maxPlayers;
            const seatsAvailable = tableCapacity - seatPlayers;
            const levelCapacity = Math.floor(tableCapacity / 3);

            let tableState = 'LOW';
            if (seatPlayers > levelCapacity) {
              tableState = 'MEDIUM';
            }
            if (seatsAvailable === 0) {
              tableState = 'FULL';
            }

            const obj = {
              children:
                table.id !== overlayRow ? (
                  <Tag
                    className="text-center"
                    style={{ width: '100px' }}
                    color={
                      tableState === 'FULL'
                        ? '#52C41A'
                        : tableState === 'MEDIUM'
                        ? '#FAAD14'
                        : '#F5222D'
                    }
                  >
                    {tableState}
                  </Tag>
                ) : (
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>
                      <Icon type="info-circle" />
                      <span className="ml-1">
                        {t('CLOSE_TABLE_CONFIRMATION_TEXT')}
                      </span>
                    </div>
                    <div>
                      <Button
                        onClick={() => setOverlayRow(null)}
                        className="bg-transparent border-white text-white"
                      >
                        {t('CANCEL_BUTTON')}
                      </Button>
                      <Button
                        onClick={() => {
                          onCloseTable(runningGameId, table.id);
                          setOverlayRow(null);
                        }}
                        id={`confirmCloseTable-${table.id}`}
                        className="ml-2 bg-white text-danger"
                      >
                        {t('CLOSE_BUTTON')}
                      </Button>
                    </div>
                  </div>
                ),
              props: {}
            };
            // Manage Merge Columns for Confirm Decline
            if (table.id === overlayRow) {
              obj.props.colSpan = 24;
            }
            return obj;
          }
        },
        {
          key: 'table-number',
          render: (table: any) => {
            const obj = {
              children: `Table ${table.tableId}`,
              props: {}
            };
            // Manage Merge Columns for Confirm Decline
            if (table.id === overlayRow) {
              obj.props.colSpan = 0;
            }
            return obj;
          }
        },
        {
          key: 'table-capacity',
          render: (table: any) => {
            const obj = {
              children: `${table.maxPlayers || 0} seats`,
              props: {}
            };
            // Manage Merge Columns for Confirm Decline
            if (table.id === overlayRow) {
              obj.props.colSpan = 0;
            }
            return obj;
          }
        },
        {
          key: 'table-players',
          render: (table: any) => {
            const obj = {
              children: (
                <span
                  id={`seated-players-${runningGameId}`}
                  className="text-primary cursor-pointer text-decoration-underline"
                  onClick={() => onShowSeatedPlayers(runningGameId, table.id)}
                >
                  {(table.players && table.players.length) || 0} seated players
                </span>
              ),
              props: {}
            };
            // Manage Merge Columns for Confirm Decline
            if (table.id === overlayRow) {
              obj.props.colSpan = 0;
            }
            return obj;
          }
        },
        {
          key: 'table-requests',
          render: (table: any) => {
            const obj = {
              children: (
                <span
                  id={`join-seat-request-${runningGameId}`}
                  className="text-primary cursor-pointer text-decoration-underline"
                  onClick={() =>
                    onShowJoinSeatRequests(runningGameId, table.id)
                  }
                >
                  {(table.joinSeatRequestList &&
                    table.joinSeatRequestList.length) ||
                    0}{' '}
                  requests to join the table
                </span>
              ),
              props: {}
            };
            // Manage Merge Columns for Confirm Decline
            if (table.id === overlayRow) {
              obj.props.colSpan = 0;
            }
            return obj;
          }
        },
        {
          key: 'table-action',
          className: 'action-buttons-column pr-4',
          render: (table: any) => {
            const obj = {
              children: (
                <Fragment>
                  {!overlayRow && (
                    <Row type="flex" justify="end">
                      <Tooltip title={t('EDIT_TABLE')} placement="bottom">
                        <Button
                          shape="circle"
                          icon="edit"
                          id={`edit-table-${table.id}`}
                          className="cursor-pointer text-success border-success"
                          onClick={() => onEditTable(runningGameId, table.id)}
                        />
                      </Tooltip>
                      <Tooltip title={t('CLOSE_TABLE')} placement="bottom">
                        <Button
                          shape="circle"
                          icon="close"
                          id={`close-table-${table.id}`}
                          className="cursor-pointer ml-2 text-danger border-danger"
                          onClick={() => setOverlayRow(table.id)}
                        />
                      </Tooltip>
                    </Row>
                  )}
                </Fragment>
              ),
              props: {}
            };
            // Manage Merge Columns for Confirm Decline
            if (table.id === overlayRow) {
              obj.props.colSpan = 0;
            }
            return obj;
          }
        }
      ];

      return (
        <Table
          columns={columns}
          dataSource={runningGame.tables}
          pagination={false}
          rowClassName={(table, index) => {
            if (table.id === overlayRow) {
              return 'inner-row" bg-danger text-white w-100 h-100';
            }
            return 'inner-row';
          }}
          rowKey="id"
        />
      );
    };

    return (
      <Fragment>
        <RenderCount componentName="RunningCashGamesDataTable" />
        <Table
          // onChange={(pagination, filters, sorter) => {
          //   // console.log('pagination Change', sorter);
          //   handleTableChange(pagination, sorter);
          // }}
          className="w-100 running-dataTable"
          columns={columns}
          expandedRowRender={(runningGameId: string) => (
            <ExpandedRowRender runningGameId={runningGameId} />
          )}
          dataSource={datas}
          rowKey={(record: string) => record}
          pagination={false}
          // pagination={{
          //   defaultPageSize: size,
          //   total: totalElements,
          //   showSizeChanger: false
          //   // pageSizeOptions: ['10', '20', '30', '40', '50']
          // }}
          rowClassName={(record, index) => {
            if (record === overlayRow) {
              return 'bg-danger text-white w-100 h-100';
            }
            return 'expandable-row';
          }}
        />
      </Fragment>
    );
  }
);

export default RunningCashGamesDataTable;
