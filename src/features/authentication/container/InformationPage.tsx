import React from 'react';
import { Col } from 'antd';

type InformationPageProps = {
  title: string;
  text: string;
  okButton?: any;
};

type GlobalProps = InformationPageProps;

/**
 * InformationPage
 * @param param0
 */
const InformationPage = ({ title, text, okButton }: GlobalProps) => {
  return (
    <Col span="20">
      <Col className="text-center p-4">
        <h5 className="font-weight-bold text-uppercase mb-5">{title}</h5>
        <p className="text-justify">{text}</p>
      </Col>
      {okButton && (
        <div className="d-flex mt-4 flex-row justify-content-center">
          {okButton}
        </div>
      )}
    </Col>
  );
};

export default React.memo(InformationPage);
