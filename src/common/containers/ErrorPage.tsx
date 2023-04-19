import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import BadRequestImage from '../../assets/images/400.png';
import UnAuthorizedImage from '../../assets/images/403.png';
import NotFoundImage from '../../assets/images/404.png';
import ServerErrorImage from '../../assets/images/500.png';
import ServerMaintenanceImage from '../../assets/images/ServerMaintenance.png';
import { useSelector } from 'react-redux';
import { getTimeRemainingFromEnd } from '../redux/AvailabilityRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type ErrorPageProps = {
  image: any;
  altImage: string;
  title: string;
  text: string;
  variableText?: string;
  hideButton?: boolean;
};

/**
 * ErrorPage
 */
const ErrorPage = ({
  image,
  altImage,
  title,
  text,
  variableText,
  hideButton
}: ErrorPageProps) => {
  const { t } = useTranslation();

  return (
    <Col className="d-flex flex-column justify-content-around align-items-center h-100">
      <Row>
        <img src={image} alt={altImage} height="400" />
      </Row>
      <Row className="justify-content-center text-center w-100">
        <Col>
          <h3 className="text-uppercase text-secondary">{t(title)}</h3>
          <p className="text-greyDisable">
            {t(text, variableText)
              .split('\n')
              .map((item, key) => {
                return (
                  <Fragment key={key}>
                    {item}
                    <br />
                  </Fragment>
                );
              })}
          </p>
          {!hideButton && (
            <Link to="/">
              <Button className="text-uppercase mt-5" type="primary">
                {' '}
                {t('BACK_TO_HOME_PAGE')}
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </Col>
  );
};

// Bad Request Page
export const BadRequestPage = () => (
  <ErrorPage
    image={BadRequestImage}
    altImage="Bad Request"
    title="BAD_REQUEST_TITLE"
    text="BAD_REQUEST_TEXT"
  />
);

// Not Found Page
export const NotFoundPage = () => (
  <ErrorPage
    image={NotFoundImage}
    altImage="Not Found"
    title="NOT_FOUND_TITLE"
    text="NOT_FOUND_TEXT"
  />
);

// UnAuthorized Page
export const UnAuthorizedPage = () => (
  <ErrorPage
    image={UnAuthorizedImage}
    altImage="UnAuthorized"
    title="UNAUTHORIZED_TITLE"
    text="UNAUTHORIZED_TEXT"
  />
);

// Server Error Page
export const ServerErrorPage = () => (
  <ErrorPage
    image={ServerErrorImage}
    altImage="Server Error"
    title="SERVER_ERROR_TITLE"
    text="SERVER_ERROR_TEXT"
  />
);

// Server Maintenance Page
export const ServerMaintenancePage = () => {
  const availableHoursLeft = useSelector(getTimeRemainingFromEnd);

  return (
    <ErrorPage
      image={ServerMaintenanceImage}
      altImage="Server Maintenance"
      title="SERVER_MAINTENANCE_TITLE"
      text="SERVER_MAINTENANCE_TEXT"
      variableText={{ availableHoursLeft }}
      hideButton
    />
  );
};
