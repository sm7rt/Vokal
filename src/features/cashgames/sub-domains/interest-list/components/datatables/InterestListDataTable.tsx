import { Button, Icon, Row, Table, Tag, Tooltip } from 'antd';
import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderCount from '../../../../../../common/performance/RenderCount';
import { useMessages } from '../../../../../messages/hooks/MessagesHooks';
import { useInterestList } from '../../hooks/InterestListHooks';

//* ********************** */
// COLUMNS COMPONENTS      */
//* ********************** */

/**
 * Render Status Col
 * @param param0
 */
const StatusColumn = React.memo(
  ({
    interestListId,
    declineRow,
    setDeclineRow,
    onDeclineCashGame
  }: {
    interestListId: string;
    declineRow: string;
    setDeclineRow: (id?: string) => void;
    onDeclineCashGame: (id: string) => void;
  }) => {
    const { t } = useTranslation();
    console.log('In Status Column', interestListId);
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount componentName={`StatusColumn-${interestListId}`} />
          {interestListId !== declineRow ? (
            <Tag
              color={
                interestList.state && interestList.state === 'ACCEPTED'
                  ? 'green'
                  : interestList.state === 'DECLINED'
                  ? 'red'
                  : 'orange'
              }
            >
              {interestList.state}
            </Tag>
          ) : (
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div>
                <Icon type="info-circle" />
                <span className="ml-1">{t('DECLINE_CONFIRMATION_TEXT')}</span>
              </div>
              <div>
                <Button
                  onClick={() => setDeclineRow(null)}
                  className="bg-transparent border-white text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onDeclineCashGame(interestListId);
                    setDeclineRow(null);
                  }}
                  id={`confirmDeclineGame-${interestListId}`}
                  className="ml-2 bg-white text-danger"
                >
                  Decline
                </Button>
              </div>
            </div>
          )}
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Date Column
 */
const DateColumn = React.memo(
  ({ interestListId }: { interestListId: string }) => {
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount componentName={`DateColumn-${interestListId}`} />
          <span>
            {interestList.date &&
              moment(interestList.date)
                .parseZone()
                .format('ddd DD MMM YYYY')}
          </span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Date Casino Column
 */
const DateCasinoColumn = React.memo(
  ({
    interestListId,
    cancelRow,
    setCancelRow,
    onCancelCashGame
  }: {
    interestListId: string;
    cancelRow: string;
    setCancelRow: (id: string) => void;
    onCancelCashGame: (id: string) => void;
  }) => {
    const { t } = useTranslation();
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount componentName={`DateColumn-${interestListId}`} />
          {interestListId !== cancelRow ? (
            interestList.date ? (
              moment(interestList.date)
                .parseZone()
                .format('ddd DD MMM YYYY')
            ) : (
              ''
            )
          ) : (
            <div className="d-flex flex-row justify-content-between align-items-center">
              <div>
                <Icon type="info-circle" />
                <span className="ml-1">{t('CANCEL_CONFIRMATION_TEXT')}</span>
              </div>
              <div>
                <Button
                  onClick={() => setCancelRow(null)}
                  className="bg-transparent border-white text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onCancelCashGame(interestListId);
                    setCancelRow(null);
                  }}
                  id={`confirmCancelGame-${interestListId}`}
                  className="ml-2 bg-white text-danger"
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Time Column
 */
const TimeColumn = React.memo(
  ({ interestListId }: { interestListId: string }) => {
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount componentName={`TimeColumn-${interestListId}`} />
          <span>
            {interestList.date &&
              moment(interestList.date)
                .parseZone()
                .format('h:mm A')}
          </span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Game Size Column
 */
const GameSizeColumn = React.memo(
  ({ interestListId }: { interestListId: string }) => {
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount componentName={`GameSizeColumn-${interestListId}`} />
          <span>{interestList.gameSize}</span>
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
  ({ interestListId }: { interestListId: string }) => {
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount componentName={`GameVariantColumn-${interestListId}`} />
          <span>{interestList.gameVariant}</span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Game Players Column
 */
const GamePlayersColumn = React.memo(
  ({
    interestListId,
    onShowRegisteredPlayers
  }: {
    interestListId: string;
    onShowRegisteredPlayers: (id: string) => void;
  }) => {
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount componentName={`GamePlayersColumn-${interestListId}`} />
          <span
            className="text-primary cursor-pointer text-decoration-underline"
            onClick={() => onShowRegisteredPlayers(interestListId)}
          >
            {interestList.playersNumber}
          </span>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Game Messages Column
 */
const GameMessagesColumn = React.memo(
  ({
    interestListId,
    onShowMessages
  }: {
    interestListId: string;
    onShowMessages: (id: string) => void;
  }) => {
    const messageObj = useMessages(interestListId, 'INTEREST_LIST');

    return (
      <Fragment>
        <RenderCount componentName={`GameMessagesColumn-${interestListId}`} />
        <span
          className="text-primary cursor-pointer text-decoration-underline"
          onClick={() => onShowMessages(interestListId)}
        >
          {(messageObj && messageObj.totalElements) || 0}
        </span>
      </Fragment>
    );
  }
);

/**
 * Flop Game Actions Column
 */
const FlopGameActionsColumn = React.memo(
  ({
    interestListId,
    declineRow,
    onAcceptCashGame,
    setDeclineRow,
    onStartCashGame
  }: {
    interestListId: string;
    declineRow: string;
    onAcceptCashGame: (id: string) => void;
    setDeclineRow: (id: string) => void;
    onStartCashGame: (id: string) => void;
  }) => {
    const { t } = useTranslation();
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount
            componentName={`FlopGameActionsColumn-${interestListId}`}
          />
          <Fragment>
            {!declineRow && (
              <Row>
                {interestList.state && interestList.state === 'PENDING' && (
                  <Fragment>
                    <Tooltip title={t('ACCEPT_CASH_GAMES')} placement="bottom">
                      <Button
                        shape="circle"
                        icon="check"
                        id={`acceptGame-${interestListId}`}
                        className="cursor-pointer text-success border-success"
                        onClick={() => onAcceptCashGame(interestListId)}
                      />
                    </Tooltip>
                    <Tooltip title={t('DECLINE_CASH_GAMES')} placement="bottom">
                      <Button
                        shape="circle"
                        icon="close"
                        id={`declineGame-${interestListId}`}
                        className="cursor-pointer ml-2 text-danger border-danger"
                        onClick={() => setDeclineRow(interestListId)}
                      />
                    </Tooltip>
                  </Fragment>
                )}
                {interestList.state && interestList.state === 'ACCEPTED' && (
                  <Fragment>
                    <Tooltip title={t('START_CASH_GAMES')} placement="bottom">
                      <Button
                        shape="circle"
                        icon="caret-right"
                        id={`startGame-${interestListId}`}
                        className="cursor-pointer text-success border-success"
                        onClick={() => onStartCashGame(interestListId)}
                      />
                    </Tooltip>
                    {/* <Tooltip title={t('PROMOTE_CASH_GAMES')} placement="bottom">
                      <Button
                        shape="circle"
                        icon="notification"
                        id={`promoteGame-${cashGame.id}`}
                        className="cursor-pointer ml-2 text-primary border-primary"
                        onClick={onPromoteCashGame}
                      />
                    </Tooltip> */}
                  </Fragment>
                )}
              </Row>
            )}
          </Fragment>
        </Fragment>
      );
    }
    return null;
  }
);

/**
 * Casino Game Actions Column
 */
const CasinoGameActionsColumn = React.memo(
  ({
    interestListId,
    cancelRow,
    setCancelRow,
    onStartCashGame
  }: {
    interestListId: string;
    onStartCashGame: (id: string) => void;
    cancelRow: string;
    setCancelRow: (id: string) => void;
  }) => {
    const { t } = useTranslation();
    const interestList = useInterestList(interestListId);

    if (interestList) {
      return (
        <Fragment>
          <RenderCount
            componentName={`FlopGameActionsColumn-${interestListId}`}
          />
          <Fragment>
            {!cancelRow && (
              <Row>
                <Tooltip title={t('START_CASH_GAMES')} placement="bottom">
                  <Button
                    shape="circle"
                    icon="caret-right"
                    id={`startGame-${interestListId}`}
                    className="cursor-pointer text-success border-success"
                    onClick={() => onStartCashGame(interestListId)}
                  />
                </Tooltip>
                {/* <Tooltip title={t('PROMOTE_CASH_GAMES')} placement="bottom">
                  <Button
                    shape="circle"
                    icon="notification"
                    className="cursor-pointer ml-2 text-primary border-primary"
                    onClick={() => onPromoteCashGame(cashGame.id)}
                  />
                </Tooltip> */}
                <Tooltip title={t('CANCEL_CASH_GAMES')} placement="bottom">
                  <Button
                    shape="circle"
                    icon="close"
                    id={`cancelGame-${interestListId}`}
                    className="cursor-pointer ml-2 text-danger border-danger"
                    onClick={() => setCancelRow(interestListId)}
                  />
                </Tooltip>
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

const commonColumn = ({
  t,
  onShowRegisteredPlayers,
  onShowMessages,
  overlayRow,
  sorts
}) => [
  {
    key: 'time',
    title: t('CASH_GAMES_TIME_LABEL'),
    render: (interestListId: string) => {
      const obj = {
        children: <TimeColumn interestListId={interestListId} />,
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === overlayRow) {
        obj.props.colSpan = 0;
      }
      return obj;
    }
  },
  {
    key: 'game-size',
    title: t('CASH_GAMES_SIZE_LABEL'),
    render: (interestListId: string) => {
      const obj = {
        children: <GameSizeColumn interestListId={interestListId} />,
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === overlayRow) {
        obj.props.colSpan = 0;
      }
      return obj;
    }
  },
  {
    key: 'game-variant',
    title: t('CASH_GAMES_VARIANT_LABEL'),
    render: (interestListId: string) => {
      const obj = {
        children: <GameVariantColumn interestListId={interestListId} />,
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === overlayRow) {
        obj.props.colSpan = 0;
      }
      return obj;
    }
  },
  {
    key: 'game-players',
    title: t('CASH_GAMES_PLAYERS_LABEL'),
    render: (interestListId: string) => {
      const obj = {
        children: (
          <GamePlayersColumn
            interestListId={interestListId}
            onShowRegisteredPlayers={onShowRegisteredPlayers}
          />
        ),
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === overlayRow) {
        obj.props.colSpan = 0;
      }
      return obj;
    }
  },
  {
    key: 'game-messages',
    title: t('CASH_GAMES_MESSAGES_LABEL'),
    render: (interestListId: string) => {
      const obj = {
        children: (
          <GameMessagesColumn
            interestListId={interestListId}
            onShowMessages={onShowMessages}
          />
        ),
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === overlayRow) {
        obj.props.colSpan = 0;
      }
      return obj;
    }
  }
];

// Flop Games Column
const flopGamesColumns = ({
  t,
  onAcceptCashGame,
  // onPromoteCashGame,
  onDeclineCashGame,
  onStartCashGame,
  onShowRegisteredPlayers,
  onShowMessages,
  declineRow,
  setDeclineRow,
  sorts
}: any) => [
  {
    key: 'game-state',
    title: t('CASH_GAMES_STATUS_LABEL'),
    render: (interestListId: string) => {
      const obj = {
        children: (
          <StatusColumn
            interestListId={interestListId}
            declineRow={declineRow}
            setDeclineRow={setDeclineRow}
            onDeclineCashGame={onDeclineCashGame}
          />
        ),
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === declineRow) {
        obj.props.colSpan = 24;
      }
      return obj;
    }
  },
  {
    key: 'date',
    title: t('CASH_GAMES_DATE_LABEL'),
    render: (interestListId: string) => {
      const obj = {
        children: <DateColumn interestListId={interestListId} />,
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === declineRow) {
        obj.props.colSpan = 0;
      }
      return obj;
    },
    sorter: true,
    defaultSortOrder: 'ascend'
  },
  ...commonColumn({
    t,
    onShowRegisteredPlayers,
    overlayRow: declineRow,
    onShowMessages,
    sorts
  }),
  // {
  //   title: t('CASH_GAMES_FEES_LABEL'),
  //   render: (cashGame: InterestListRow) => {
  //     const obj = {
  //       children: cashGame.fees,
  //       props: {}
  //     };
  //     // Manage Merge Columns for Confirm Decline
  //     if (cashGame.id === declineRow) {
  //       obj.props.colSpan = 0;
  //     }
  //     return obj;
  //   }
  // },
  {
    key: 'game-action',
    title: '',
    className: 'text-right action-buttons-column',
    render: (interestListId: string) => {
      const obj = {
        children: (
          <FlopGameActionsColumn
            interestListId={interestListId}
            declineRow={declineRow}
            onAcceptCashGame={onAcceptCashGame}
            setDeclineRow={setDeclineRow}
            onStartCashGame={onStartCashGame}
          />
        ),
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === declineRow) {
        obj.props.colSpan = 0;
      }
      return obj;
    }
  }
];

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  datas: Array<any>;
  onDelete: (id: string) => void;
  onResendMail: (mail: string) => void;
  onEditUserAccount: (id: string, data: string) => void;
  owner: AccountApiDefinitions.CustomerAccount;
};

// Flop CashGames DataTable
export const FlopCashGamesDataTable = React.memo(
  ({
    datas,
    onAcceptCashGame,
    // onPromoteCashGame,
    onDeclineCashGame,
    onStartCashGame,
    onShowRegisteredPlayers,
    onShowMessages,
    handleTableChange,
    totalElements,
    sorts,
    currentInterestListId,
    size
  }: Props) => {
    const { t } = useTranslation();
    const [declineRow, setDeclineRow] = useState();
    return (
      <Fragment>
        <RenderCount componentName="FlopCashGamesDataTable" />
        <Table
          onChange={(pagination, filters, sorter) => {
            handleTableChange(pagination, sorter);
          }}
          className="w-100"
          columns={flopGamesColumns({
            t,
            onAcceptCashGame,
            // onPromoteCashGame,
            onDeclineCashGame,
            onStartCashGame,
            onShowRegisteredPlayers,
            onShowMessages,
            declineRow,
            setDeclineRow,
            sorts
          })}
          dataSource={datas}
          rowKey={(record: string) => record}
          pagination={{
            defaultPageSize: size,
            total: totalElements,
            showSizeChanger: false
            // pageSizeOptions: ['10', '20', '30', '40', '50']
          }}
          rowClassName={(record, index) => {
            if (record === declineRow) {
              return 'bg-danger text-white w-100 h-100';
            } else if (record === currentInterestListId) {
              return 'row-selected';
            }
          }}
        />
      </Fragment>
    );
  }
);

// Casino Games Column
const casinoGamesColumns = ({
  t,
  // onPromoteCashGame,
  onStartCashGame,
  onCancelCashGame,
  cancelRow,
  setCancelRow,
  onShowRegisteredPlayers,
  onShowMessages,
  sorts
}: any) => [
  {
    key: 'date',
    title: t('CASH_GAMES_DATE_LABEL'),
    render: (interestListId: string) => {
      const obj = {
        children: (
          <DateCasinoColumn
            interestListId={interestListId}
            cancelRow={cancelRow}
            setCancelRow={setCancelRow}
            onCancelCashGame={onCancelCashGame}
          />
        ),
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === cancelRow) {
        obj.props.colSpan = 24;
      }
      return obj;
    },
    sorter: true,
    defaultSortOrder: 'ascend'
  },
  ...commonColumn({
    t,
    onShowRegisteredPlayers,
    onShowMessages,
    overlayRow: cancelRow,
    sorts
  }),
  {
    key: 'game-action',
    title: '',
    className: 'text-right action-buttons-column',
    render: (interestListId: string) => {
      const obj = {
        children: (
          <CasinoGameActionsColumn
            interestListId={interestListId}
            onStartCashGame={onStartCashGame}
            cancelRow={cancelRow}
            setCancelRow={setCancelRow}
          />
        ),
        props: {}
      };
      // Manage Merge Columns for Confirm Decline
      if (interestListId === cancelRow) {
        obj.props.colSpan = 0;
      }
      return obj;
    }
  }
];

// Casino CashGames DataTable
export const CasinoCashGamesDataTable = React.memo(
  ({
    datas, // onPromoteCashGame,
    onStartCashGame,
    onCancelCashGame,
    onShowRegisteredPlayers,
    onShowMessages,
    handleTableChange,
    totalElements,
    currentInterestListId,
    size,
    sorts
  }: Props) => {
    const { t } = useTranslation();
    const [cancelRow, setCancelRow] = useState();
    return (
      <Fragment>
        <RenderCount componentName="CasinoCashGamesDataTable" />
        <Table
          onChange={(pagination, filters, sorter) => {
            handleTableChange(pagination, sorter);
          }}
          className="w-100"
          columns={casinoGamesColumns({
            t,
            // onPromoteCashGame,
            onStartCashGame,
            onCancelCashGame,
            onShowRegisteredPlayers,
            onShowMessages,
            cancelRow,
            setCancelRow,
            sorts
          })}
          dataSource={datas}
          rowKey={(record: string) => record}
          pagination={{
            defaultPageSize: size,
            total: totalElements,
            showSizeChanger: false
            // pageSizeOptions: ['10', '20', '30', '40', '50']
          }}
          rowClassName={(record, index) => {
            if (record === cancelRow) {
              return 'bg-danger text-white w-100 h-100';
            } else if (record === currentInterestListId) {
              return 'row-selected';
            }
          }}
        />
      </Fragment>
    );
  }
);
