import { Col, Row } from 'antd';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import Image1 from '../../../assets/images/slide1.png';
import Image2 from '../../../assets/images/slide2.png';
import Image3 from '../../../assets/images/slide3.png';
import Logo from '../../../assets/images/logo.png';
import RenderCount from '../../../common/performance/RenderCount';
import AuthenticationActions from '../redux/AuthenticationRedux';

type MatchParam = {
  email: string;
};

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type AuthLayoutProps = {
  children: any;
};

/**
 * Auth Layout
 * @param props: Props of Component
 */
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { match, location } = useReactRouter<MatchParam>();
  /**
   * Show Bottom Link in Auth Module
   */
  const showBottomLink = () => {
    if (location.pathname === '/auth/signin') {
      return (
        <p className="text-center w-100 mb-1 text-secondary">
          {t('DONT_HAVE_ACCOUNT_TEXT')}{' '}
          <Link className="text-decoration-underline" to={`/auth/account`}>
            {t('SIGNUP_TEXT')}
          </Link>
        </p>
      );
    } else if (location.pathname === '/auth/account') {
      return (
        <p className="text-center w-100 mb-1 text-secondary">
          {t('ALREADY_HAVE_ACCOUNT_TEXT')}{' '}
          <Link className="text-decoration-underline" to={`/auth/signin`}>
            {t('SIGNIN_TEXT')}
          </Link>
        </p>
      );
    } else if (
      location.pathname === `/auth/account/${match.params.email}/email_check`
    ) {
      return (
        <p className="mb-1">
          {t('RESEND_MAIL_TEXT')}{' '}
          <span
            id="resendEmailButton"
            className="text-decoration-underline text-primary cursor-pointer"
            onClick={() =>
              dispatch(
                AuthenticationActions.resendEmailRequest(match.params.email)
              )
            }
          >
            {t('RESEND_MAIL_LINK')}
          </span>
        </p>
      );
    }
    return null;
  };

  return (
    <Col>
      <RenderCount componentName="AuthLayout" />
      <Row>
        <Col
          style={{
            height: '100vh',
            background: '#fff',
            overflowY: 'auto'
          }}
          className="d-flex flex-column justify-content-between"
          lg={10}
          md={24}
        >
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            className="w-100 p-4"
          >
            <Row type="flex" align="middle">
              <Link to="/">
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1"
                  height="40px"
                  width="40px"
                  src={Logo}
                  alt="Flop Ad Logo"
                />
              </Link>
              <h5 className="d-none d-md-inline ml-1 font-weight-bold m-0">
                FLOP AD
              </h5>
            </Row>
          </Row>
          <Row
            type="flex"
            align="middle"
            justify="center"
            className="flex-fill"
          >
            {children}
          </Row>
          <Row className="p-2 justify-content-center">
            <Col md={20}>{showBottomLink()}</Col>
          </Row>
        </Col>
        <Col
          style={{
            height: '100vh',
            background: '#f7f7f7'
          }}
          lg={14}
          md={0}
        >
          <Row>
            <Carousel
              showThumbs={false}
              showStatus={false}
              interval={3000}
              autoPlay
            >
              <div>
                <img src={Image1} alt="Carousel 1" />
                <p className="legend">
                  {t('AUTH_FIRST_SLIDE_TEXT')
                    .split('\n')
                    .map((item: string, key: number) => {
                      return (
                        <Fragment key={key}>
                          {item}
                          <br />
                        </Fragment>
                      );
                    })}
                </p>
              </div>
              <div>
                <img src={Image2} alt="Carousel 2" />
                <p className="legend">
                  {t('AUTH_SECOND_SLIDE_TEXT')
                    .split('\n')
                    .map((item: string, key: number) => {
                      return (
                        <Fragment key={key}>
                          {item}
                          <br />
                        </Fragment>
                      );
                    })}
                </p>
              </div>
              <div>
                <img src={Image3} alt="Carousel 3" />
                <p className="legend">
                  {t('AUTH_THIRD_SLIDE_TEXT')
                    .split('\n')
                    .map((item: string, key: number) => {
                      return (
                        <Fragment key={key}>
                          {item}
                          <br />
                        </Fragment>
                      );
                    })}
                </p>
              </div>
            </Carousel>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

// Export AuthLayout
// Export Default
export default React.memo(AuthLayout);
