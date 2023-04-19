import { Col, Row, Card } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { InjectedFormProps } from 'redux-form';
import RenderCount from '../../../common/performance/RenderCount';
import { GeneralInformationFormType } from '../models/SettingsModel';
import CasinoAddressSection from './form/CasinoAddressSection';
import CasinoContactSection from './form/CasinoContactSection';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type GeneralInformationProps = {
  disabled?: boolean;
};

// Global Props
type GlobalProps = InjectedFormProps<
  GeneralInformationFormType,
  GeneralInformationProps
> &
  GeneralInformationProps;

/**
 * General Information Form
 */
const GeneralInformationComp = ({ change, disabled }: GlobalProps) => {
  const { t } = useTranslation();
  return (
    <Row type="flex" className="justify-content-center w-100 flex-fill">
      <Col md={11} lg={11}>
        <Card>
          <h6 className="mb-4 font-weight-bold text-secondary">
            {t('SETTINGS_ADDRESS_TITLE')}
          </h6>
          <CasinoAddressSection change={change} disabled={disabled} />
        </Card>
      </Col>
      <Col md={11} lg={11} offset={1}>
        <Card>
          <RenderCount componentName="GeneralInformationSection" />
          <h6 className="mb-4 font-weight-bold text-secondary">
            {t('SETTINGS_CONTACT_TITLE')}
          </h6>
          <CasinoContactSection disabled={disabled} />
        </Card>
      </Col>
    </Row>
  );
};

export default React.memo(GeneralInformationComp);
