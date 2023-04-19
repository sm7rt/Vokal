import { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';
import React from 'react';
import styles from './HeaderDropdown.module.less';

declare type OverlayFunc = () => React.ReactNode;

export interface HeaderDropdownProps extends DropDownProps {
  overlayClassName?: string;
  overlay: React.ReactNode | OverlayFunc;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlayClassName: cls,
  ...restProps
}) => (
  <Dropdown overlayClassName={`${styles.container} ${cls}`} {...restProps} />
);

export default HeaderDropdown;
