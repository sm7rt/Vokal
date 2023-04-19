import { Col, Row, Card } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RenderCount from '../../../common/performance/RenderCount';
import PokerRoomSection from './form/PokerRoomSection';
import OfferedGamesList from './OfferedGamesList';

/**
 * Poker Room Information Form
 */
const PokerRoomInformationForm = ({ disabled }) => {
  const { t } = useTranslation();
  return (
    <Row type="flex" className="form flex-fill">
      <RenderCount componentName="PokerRoomInformationSection" />
      <Col className="justify-content-between d-flex flex-column min-h-100 col">
        <Row type="flex" className="justify-content-center w-100">
          <Col md={11} lg={7}>
            <Card>
              <h6 className="mb-4 font-weight-bold text-secondary">
                {t('SETTINGS_POKER_ROOM_CHARACTERISTICS_TITLE')}
              </h6>
              <PokerRoomSection disabled={disabled} />
            </Card>
          </Col>
          <Col md={12} lg={16} xl={16} offset={1}>
            <Card>
              <h6 className="mb-4 font-weight-bold text-secondary">
                {t('SETTINGS_OFFERED_GAMES_TITLE')}
              </h6>
              <OfferedGamesList disabled={disabled} />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default React.memo(PokerRoomInformationForm);
