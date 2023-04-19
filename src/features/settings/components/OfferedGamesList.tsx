import { Button, Form, List, Modal, Select } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Field, reduxForm, submit } from 'redux-form';
import { required } from 'redux-form-validators';
import {
  AInput,
  ASelect
} from '../../../common/components/form/AntdSimpleField';
import { GameType } from '../models/SettingsModel';
import SettingsActions, {
  getGames,
  hasEditedGame
} from '../redux/SettingsRedux';
import './OfferedGamesList.css';
import GameVariant from '../../../common/sagas/static/GameVariant';
import { GameVariantType } from '../../../common/redux/ParametersModel.d';
import { SettingsContext } from '../containers/SettingContext';

/**
 * Offered Game Line Form
 */
const OfferedGameFormComp = () => {
  const { t } = useTranslation();
  return (
    <Form
      id="gameCreationForm"
      layout="inline"
      className={`w-100 offeredGameItem`}
    >
      <Field
        label={t('VARIANT_LABEL')}
        id="variant"
        name="variant"
        component={ASelect}
        hasFeedback
        validate={[required()]}
        className="variantInput"
        style={{ width: '200px' }}
        size="small"
      >
        {GameVariant.map((c: GameVariantType, index: number) => (
          <Select.Option key={index} value={c.shortName}>
            {c.shortName}
          </Select.Option>
        ))}
      </Field>
      <Field
        label={t('BLIND_LABEL')}
        id="smallBlind"
        name="smallBlind"
        component={AInput}
        hasFeedback
        validate={[required()]}
        className="blindInput"
        size="small"
      />
      <Field
        label={t('SLASH')}
        id="bigBlind"
        name="bigBlind"
        component={AInput}
        hasFeedback
        validate={[required()]}
        className="blindInput"
        size="small"
      />
    </Form>
  );
};

const formName = 'OFFERED-GAME';

const OfferedGameForm = reduxForm<GameType, void>({
  form: formName
})(OfferedGameFormComp);

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type OfferedGamesListFieldProps = {
  disabled?: boolean;
};

/**
 * OfferedGamesListField Component
 */
const OfferedGamesList = ({ disabled }: OfferedGamesListFieldProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const games = useSelector(getGames);
  const oneGameEditing = useSelector(hasEditedGame);
  const setOfferedGamesEdited = useContext(SettingsContext);
  console.log(setOfferedGamesEdited);
  return (
    <List
      className="offeredGameList"
      itemLayout="horizontal"
      dataSource={games}
      split={false}
      footer={
        !oneGameEditing && (
          <div>
            <Button
              id="addGameButton"
              type="primary"
              shape="circle"
              ghost
              disabled={disabled}
              icon="plus"
              onClick={() => {
                dispatch(SettingsActions.addGame());
                setOfferedGamesEdited(true);
              }}
            />{' '}
            {games.length === 0
              ? t('SETTINGS_ADD_FIRST_GAME')
              : t('SETTINGS_ADD_ANOTHER_GAME')}
          </div>
        )
      }
      renderItem={(item: GameType, index: number) => (
        <List.Item
          actions={
            !disabled &&
            (item.edited
              ? [
                  <Button
                    type="danger"
                    shape="circle"
                    icon="close"
                    onClick={() =>
                      dispatch(SettingsActions.cancelEditGame(index))
                    }
                  />,
                  <Button
                    type="primary"
                    shape="circle"
                    icon="check"
                    onClick={() => dispatch(submit(formName))}
                  />
                ]
              : !oneGameEditing
              ? [
                  <Button
                    id="editGameButton"
                    type="primary"
                    shape="circle"
                    ghost
                    icon="edit"
                    onClick={() => {
                      dispatch(SettingsActions.editGame(index));
                      setOfferedGamesEdited(true);
                    }}
                  />,
                  <Button
                    id="deleteGameButton"
                    type="danger"
                    shape="circle"
                    ghost
                    icon="close"
                    onClick={() =>
                      Modal.confirm({
                        title: t('SETTINGS_REMOVE_GAME_CONFIRMATION_TEXT'),
                        okText: t('YES_BUTTON'),
                        okType: 'danger',
                        cancelText: t('NO_BUTTON'),
                        onOk() {
                          dispatch(SettingsActions.removeGame(index));
                          setOfferedGamesEdited(true);
                        }
                      })
                    }
                  />
                ]
              : [])
          }
        >
          {item.edited ? (
            <OfferedGameForm
              onSubmit={(data: GameType) => {
                dispatch(SettingsActions.validateGame(index, data));
              }}
              initialValues={item}
            />
          ) : (
            <div
              className={`w-100 offeredGameItem`}
            >{`${item.variant} ${item.smallBlind}/${item.bigBlind}`}</div>
          )}
        </List.Item>
      )}
    />
  );
};

export default React.memo(OfferedGamesList);
