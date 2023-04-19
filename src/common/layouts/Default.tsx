import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  MenuDataItem,
  Settings
} from '@ant-design/pro-layout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import logo from '../../assets/images/logo.png';
import RightContent from '../components/layout/GlobalHeader/RightContent';
import MainFooter from '../components/layout/MainFooter';
import LayoutActions, { collapseSideBarSelector } from '../redux/LayoutRedux';
import { ownerSelector } from '../../features/authentication/redux/AuthenticationRedux';
import { IRootState } from '../models/StateModel';
import { userFromListSelector } from '../../features/users/redux/UserRedux';
import { customerSelector } from '../../features/customers/redux/CustomersRedux';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

// Footer Render
const footerRender: BasicLayoutProps['footerRender'] = _ => {
  return (
    <>
      <div
        style={{
          padding: '0px 24px 24px',
          textAlign: 'center'
        }}
      >
        <MainFooter />
      </div>
    </>
  );
};

const defaultSettings: Settings = {
  navTheme: 'dark',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  menu: {
    locale: true
  },
  title: 'Flop Ad',
  iconfontUrl: '//at.alicdn.com/t/font_1292368_itf17f4ygi.js'
};

/**
 * Default Layout Component
 * @param props: Props of Component
 */
const DefaultLayout = props => {
  const { children } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const sidebarCollapsed = useSelector(collapseSideBarSelector);
  const owner = useSelector(ownerSelector);
  const ownerProfile = useSelector((state: IRootState) =>
    userFromListSelector(state, owner.id)
  );
  const customer = useSelector(customerSelector);

  /**
   * init variables
   */
  const handleMenuCollapse = (payload: boolean): void => {
    dispatch && dispatch(LayoutActions.collapseSideBar(payload));
  };

  /**
   * use Authorized check all menu item
   */
  const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] => {
    return menuList.map(item => {
      const localItem = {
        ...item,
        children: item.children ? menuDataRender(item.children) : []
      };
      // We check the authority of item => Don't display if it's not authorized
      if (item.authority) {
        return ownerProfile.data &&
          ownerProfile.data.role &&
          item.authority === ownerProfile.data.role
          ? (localItem as MenuDataItem)
          : null;
      }
      return localItem as MenuDataItem;
    });
  };

  const route = {
    path: '/admin',
    routes: [
      {
        icon: 'icon-trophy',
        name: t('SPECIAL_EVENTS_MENU'),
        path: '/admin/events',
        hideChildrenInMenu: true,
        // We Hide the Special Events for Casino (Not For Operator)
        authority: customer.type === 'CASINO' && 'HIDDEN',
        // // optional secondary menu
        children: [
          {
            name: t('CREATE_MANAGE_MENU'),
            path: '/admin/events/managment',
            hideChildrenInMenu: true,
            breadcrumbName: t('BC_CREATE_MANAGE_MENU'),
            children: [
              {
                name: 'Tournaments list',
                path: '/admin/events/managment/:eventId/tournaments',
                children: [
                  {
                    name: 'Tournament details',
                    path:
                      '/admin/events/managment/:eventId/tournaments/:tournamentId'
                  }
                ]
              }
            ]
          },
          {
            name: t('PERFORMANCE_OVERVIEW'),
            path: '/admin/events/performance'
          }
        ]
      },
      // {
      //   icon: 'icon-tournaments',
      //   name: t('WEEKLY_TOURNAMENT_MENU'),
      //   path: '/admin/tournaments',
      //   // // optional secondary menu
      //   children: [
      //     {
      //       name: t('CREATE_MANAGE_MENU'),
      //       path: '/admin/tournaments/overwiew'
      //     },
      //     {
      //       name: t('PERFORMANCE_OVERVIEW'),
      //       path: '/admin/tournaments/performance'
      //     }
      //   ]
      // },
      {
        icon: 'icon-money',
        name: t('CASH_GAME_MENU'),
        path: '/admin/cashgames',
        hideChildrenInMenu: true,
        // optional secondary menu
        children: [
          {
            name: t('CREATE_MANAGE_MENU'),
            path: '/admin/cashgames/managment'
          },
          {
            name: t('PERFORMANCE_OVERVIEW'),
            path: '/admin/cashgames/performance'
          }
        ]
      },
      {
        icon: 'icon-administration',
        name: t('ADMINISTRATION_MENU'),
        path: '/admin/administration',
        hideChildrenInMenu: true,
        authority: 'ADMIN',
        // optional secondary menu
        children: [
          {
            name: t('CONTRACTS_MENU'),
            path: '/admin/administration/contracts'
          },
          {
            name: t('USER_MANAGMENT_MENU'),
            path: '/admin/administration/users'
          }
        ]
      },
      // {
      //   icon: 'icon-invoices',
      //   name: t('INVOICES_MENU'),
      //   path: '/admin/invoices',
      //   authority: 'ADMIN'
      // },
      {
        icon: 'icon-settings',
        name: t('SETTINGS_MENU'),
        path: '/admin/account/settings/casino',
        authority: 'ADMIN'
      }
    ]
  };

  /**
   * Item Render for BreadCrumb
   * @param route
   * @param params
   * @param routes
   * @param paths
   */
  const itemRender = (route: any, params: any, routes: any, paths: any) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
  };

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      collapsed={sidebarCollapsed}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      rightContentRender={rightProps => <RightContent {...rightProps} />}
      footerRender={footerRender}
      menuDataRender={menuDataRender}
      route={route}
      itemRender={itemRender}
      {...props}
      {...defaultSettings}
    >
      {children}
    </ProLayout>
  );
};

// Default Props for The Component
DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default React.memo(DefaultLayout);
