import { Icon, Tooltip } from 'antd';
import React from 'react';
import NoticeIcon from '../NoticeIcon/NoticeIcon';
import Avatar from './AvatarDropdown';
import styles from './GlobalHeader.module.less';
import { useTranslation } from 'react-i18next';
import MaintenanceIcon from '../MaintenanceIcon/MaintenanceIcon';

const body =
  'Hi, %0D%0APlease provide a full description of the issue you are reporting, including details such as why it is an issue, the specific circumstances in which you encountered the issue, and how the issue can be reproduced by someone else. Include any attachments, such as screenshots, that help us understand and evaluate the issue. %0D%0AThanks. %0D%0AThe FLOP Team.';

const MAIL_TO_LINK = `mailto:contact@firstlandofpoker.com?subject=Flop Ad Assistance&body=${body}`;

const RightContent: React.SFC<void> = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.right}>
      <MaintenanceIcon />
      <Tooltip title={t('HELP')}>
        <a href={MAIL_TO_LINK} className={styles.action}>
          <Icon type="question-circle-o" />
        </a>
      </Tooltip>
      <NoticeIcon count={0} className="mr-2" />
      <Avatar menu />
    </div>
  );
};

export default React.memo(RightContent);
