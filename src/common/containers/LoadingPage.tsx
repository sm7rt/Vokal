import React from 'react';
import { Row, Spin } from 'antd';

const PageLoading: React.FC = () => (
  <Row type="flex" justify="center" align="middle" className="vh100">
    <Spin size="large" />
  </Row>
);
export default PageLoading;
