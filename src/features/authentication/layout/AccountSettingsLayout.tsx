import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import RenderCount from '../../../common/performance/RenderCount';
import { Layout } from 'antd';
import { LoadingContainer } from '../../../common/components/container';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type AuthLayoutProps = {
  children: any;
};

/**
 * AccountSettings Layout Component
 * @param props: Props of Component
 */
const AccountSettingsLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <RenderCount componentName="AccountSettingsLayout" />
      {children}
    </Layout>
  );
};

export default LoadingContainer([
  'FETCH_CASINO_DETAILS',
  'SAVE_GENERAL_INFORMATION',
  'SAVE_POKER_ROOM_INFORMATION'
])(React.memo(AccountSettingsLayout));
