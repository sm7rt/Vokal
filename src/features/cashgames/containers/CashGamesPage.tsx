import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Col } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RenderCount from '../../../common/performance/RenderCount';
import InterestList from '../sub-domains/interest-list/components/InterestList';
import RunningCashGamesList from '../sub-domains/running-games/components/RunningCashGamesList';
import { useSelector, useDispatch } from 'react-redux';
import LayoutCashGamesActions, {
  currentCashGamesTabSelector
} from '../redux/LayoutCashGamesRedux';

/**
 * CashGames Page
 */
const CashGamesPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentTab = useSelector(currentCashGamesTabSelector);

  return (
    <Col className="h-100 d-flex flex-column">
      <RenderCount componentName="CashGamesPage" />
      <PageHeaderWrapper
        tabActiveKey={currentTab}
        tabList={[
          {
            key: 'interest',
            tab: t('INTEREST_CASH_GAMES')
          },
          {
            key: 'running',
            tab: t('RUNNING_CASH_GAMES')
          }
          // {
          //   key: 'finished',
          //   tab: t('FINISHED_CASH_GAMES')
          // },
          // {
          //   key: 'revenue',
          //   tab: t('REVENUE_MANAGMENT_CASH_GAMES')
          // }
        ]}
        onTabChange={(key: string) => {
          dispatch(LayoutCashGamesActions.changeTab(key));
        }}
        title={t('CASH_GAMES')}
      />
      {currentTab === 'interest' && <InterestList />}
      {currentTab === 'running' && <RunningCashGamesList />}
    </Col>
  );
};

export default React.memo(CashGamesPage);
