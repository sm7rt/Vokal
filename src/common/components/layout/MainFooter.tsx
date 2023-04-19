import { Row } from 'antd';
import React from 'react';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type MainFooterProps = {
  /**
   * The copyright info.
   */
  copyright: string;
};

/**
 * Main Footer Component
 * @param props : Props of Component
 */
const MainFooter = ({ copyright }: MainFooterProps) => (
  <Row>
    <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
  </Row>
);

// Default Props for The Component
MainFooter.defaultProps = {
  copyright: 'Copyright © 2019 WeOpt'
};

export default MainFooter;
