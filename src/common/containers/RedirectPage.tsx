import { Spin, Col, Row } from 'antd';
import React from 'react';
import RedirectImage from '../../assets/images/Redirect.png';

/**
 * RedirectPage
 */
const RedirectPage = () => (
  <Col className="d-flex flex-column justify-content-center align-items-center">
    <Row>
      <img src={RedirectImage} alt="Not Found" />
    </Row>
    <Row className="justify-content-center text-center w-100">
      <Col md="8">
        <h3 className="text-uppercase text-secondary mt-5">
          Waiting to Redirect
        </h3>
        <Spin size="large" />
      </Col>
    </Row>
  </Col>
);

export default RedirectPage;
