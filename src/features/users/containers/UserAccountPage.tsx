import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ownerSelector } from '../../authentication/redux/AuthenticationRedux';
import UsersActions from '../redux/UserRedux';
import { useTranslation } from 'react-i18next';
import ProfileCard from '../components/ProfileCard';
// import ActivityFeedList from '../components/ActivityFeedList';
import { Row, Col } from 'antd';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {};

/**
 * Users Account Page
 */
const UserAccountPage = (props: Props) => {
  const { t } = useTranslation();
  const { id } = useSelector(ownerSelector);
  const dispatch = useDispatch();

  // Loading Profile Info (Only on mount)
  /* eslint-disable */
  useEffect(() => {
    id && dispatch(UsersActions.fetchUserRequest(id));
  }, [id]);

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Fragment>
      <PageHeaderWrapper title={t('USER_ACCOUNT_TITLE')} />
      <Row
        className="mt-3 d-flex align-items-stretch"
        style={{ minHeight: 'calc(100% - 54px)' }}
      >
        <Col md={8}>
          <ProfileCard />
        </Col>
        <Col md={15} offset={1}>
          {/* <ActivityFeedList /> */}
        </Col>
      </Row>
    </Fragment>
  );
};

export default React.memo(UserAccountPage);
