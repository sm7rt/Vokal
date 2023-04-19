import { Card, Col, Empty, List, Row } from 'antd';
import React from 'react';
import RenderCount from '../../../common/performance/RenderCount';
import './PlayersTransfert.scss';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  titleListLeft: string;
  dataSourceLeft: Array<number>;
  renderItemLeft: (item: any) => any;
  titleListRight: string;
  dataSourceRight: Array<number>;
  renderItemRight: (item: any) => any;
  emptyMessageRight: string;
  disableRightButtons: boolean;
  maxPlayers: number;
};

// PlayersTransfert
const PlayersTransfert = ({
  titleListLeft,
  dataSourceLeft,
  renderItemLeft,
  titleListRight,
  dataSourceRight,
  renderItemRight,
  emptyMessageRight,
  maxPlayers
}: Props) => {
  // Complete dataSourceLeft with Table Capacity
  const numberFreeSeat = maxPlayers - dataSourceLeft.length;
  const finalDataSourceLeft = dataSourceLeft.concat([]);
  for (let i = 0; i < numberFreeSeat; i++) {
    finalDataSourceLeft.push(0);
  }

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */

  return (
    <Row>
      <RenderCount componentName="PlayersTransfert" />
      <Col md={12}>
        <div className="d-flex flex-column justify-content-start align-items-center full-height-modal">
          <Card title={titleListLeft} className="w-100 card-transfert">
            <List
              dataSource={finalDataSourceLeft}
              renderItem={renderItemLeft}
              className="w-100"
            />
          </Card>
        </div>
      </Col>

      <Col md={12}>
        <div className="d-flex flex-column justify-content-start align-items-center full-height-modal">
          <Card title={titleListRight} className="w-100 card-transfert">
            {dataSourceRight.length === 0 ? (
              <Empty description={emptyMessageRight}> </Empty>
            ) : (
              <List
                dataSource={dataSourceRight || []}
                renderItem={renderItemRight}
                className="w-100"
              />
            )}
          </Card>
        </div>
      </Col>
    </Row>
  );
};

// Export Default
export default React.memo(PlayersTransfert);
