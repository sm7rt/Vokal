import { Icon, Menu } from 'antd';

import { ClickParam } from 'antd/es/menu';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown/HeaderDropdown';
import styles from './SelectLang.module.less';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface SelectLangProps {
  className?: string;
}
const SelectLang: React.FC<SelectLangProps> = props => {
  const { t } = useTranslation();
  const { className } = props;
  const selectedLang = i18next.language;
  const changeLang = ({ key }: ClickParam): void => i18next.changeLanguage(key);
  const locales = ['en', 'fr', 'es'];
  const languageLabels = {
    en: 'English',
    fr: 'Français',
    es: 'Español'
  };
  const languageIcons = {
    en: 'GB',
    fr: 'FR',
    es: 'ES'
  };
  const langMenu = (
    <Menu
      className={styles.menu}
      selectedKeys={[selectedLang]}
      onClick={changeLang}
    >
      {locales.map(locale => (
        <Menu.Item key={locale}>
          <span role="img" aria-label={languageLabels[locale]}>
            {languageIcons[locale]}
          </span>{' '}
          {languageLabels[locale]}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <HeaderDropdown overlay={langMenu} placement="bottomRight">
      <span className={`${styles.dropDown} ${className}`}>
        <Icon type="global" title={t('navBar.lang')} />
      </span>
    </HeaderDropdown>
  );
};

export default SelectLang;
