import React from 'react';
import { Field } from 'redux-form';
import { ASelect } from '../../../../../common/components/form/AntdSimpleField';
import { required } from 'redux-form-validators';
import GameVariant from '../../../../../common/sagas/static/GameVariant';
import { GameVariantType } from '../../../../../common/redux/ParametersModel.d';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

/**
 * Game Variant Field
 */
const GameVariantField = () => {
  const { t } = useTranslation();

  return (
    <Field
      label={t('INTEREST_GAME_VARIANT_LABEL')}
      id="gameVariant"
      name="gameVariant"
      component={ASelect}
      hasFeedback
      validate={[required()]}
      style={{ width: '300px' }}
    >
      {GameVariant.map((c: GameVariantType, index: number) => (
        <Select.Option key={index} value={c.shortName}>
          {c.shortName}
        </Select.Option>
      ))}
    </Field>
  );
};

export default React.memo(GameVariantField);
