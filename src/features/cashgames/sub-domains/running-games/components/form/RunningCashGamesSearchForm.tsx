import { Checkbox, Form } from 'antd';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import RenderCount from '../../../../../../common/performance/RenderCount';
import RunningCashGamesActions from '../../redux/RunningCashGamesRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type RunningCashGamesSearchComponentProps = {};

/**
 * RunningCashGamesSearch Component which show the RunningCashGamesSearch Form
 */
const RunningCashGamesSearchComponent = (
  props: RunningCashGamesSearchComponentProps
) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */
  const onChange = (values: Array<string>) =>
    dispatch(
      RunningCashGamesActions.updateRunningCashGamesFilters(
        'gameStates',
        values
      )
    );

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Form className="form d-flex justify-start" layout="inline">
      <RenderCount componentName="RunningCashGamesSearchForm" />
      <Form.Item label={t('CASH_GAMES_STATUS_LABEL')} className="ml-3">
        <Checkbox.Group
          options={[
            { label: 'Low', value: 'LOW' },
            { label: 'Medium', value: 'MEDIUM' },
            { label: 'Full', value: 'FULL' }
          ]}
          defaultValue={['LOW', 'MEDIUM', 'FULL']}
          onChange={onChange}
        />
      </Form.Item>
    </Form>
  );
};

// Export Default
export default React.memo(RunningCashGamesSearchComponent);
