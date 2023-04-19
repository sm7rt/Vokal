import { Spin, Col, Row } from 'antd';
import React, { Fragment } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { GrantStatusType } from '../models';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type RouteGuardProps = {
  component: any;
  layout: any;
  onEnter?: (props: any) => void;
  componentProps?: (props: any) => any;
  secure?: boolean;
  authorizationStatus?: GrantStatusType;
};

type GlobalProps = RouteGuardProps & RouteProps;

const CheckingAccessComp = () => (
  <Row
    type="flex"
    justify="center"
    align="middle"
    className="text-center w-100 vh100"
  >
    <Col md="8">
      <h3 className="text-uppercase text-secondary mt-5">Checking Access</h3>
      <Spin size="large" />
    </Col>
  </Row>
);

/**
 * Private Route Component
 * @param param0
 */
class RouteGuard extends React.Component<GlobalProps> {
  componentDidMount() {
    const { onEnter } = this.props;
    onEnter && onEnter(this.props);
  }

  render() {
    const {
      component,
      onEnter,
      layout,
      componentProps,
      authorizationStatus,
      secure,
      ...rest
    } = this.props;
    if (!secure || authorizationStatus === 'GRANTED') {
      return (
        <Route
          {...rest}
          render={(props: any) => (
            <Fragment>
              <this.props.layout {...props}>
                <this.props.component {...props} {...componentProps(props)} />
              </this.props.layout>
            </Fragment>
          )}
        />
      );
    } else if (!authorizationStatus || authorizationStatus === 'PENDING') {
      return <CheckingAccessComp />;
    }
    return <Redirect to="/auth/unauthorized" />;
  }
}

RouteGuard.defaultProps = {
  componentProps: (props: any) => ({}),
  secure: false,
  authorizationStatus: 'GRANTED',
  isCheckAccessPending: false
};

// Export Default
export default RouteGuard;
