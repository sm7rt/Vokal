import { Checkbox, DatePicker, Form, Radio } from 'antd';
import { Moment } from 'moment';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import RenderCount from '../../../../../../common/performance/RenderCount';
import InterestListActions, {
  interestListDisplayListSelector
} from '../../redux/InterestListRedux';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type InterestListSearchComponentProps = {};

/**
 * InterestListSearch Component which show the InterestListSearch Form
 */
const InterestListSearchComponent = (
  props: InterestListSearchComponentProps
) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const interestListListObj = useSelector(interestListDisplayListSelector);

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  // On Change Type Callback
  const onChangeType = (event: any) =>
    dispatch(
      InterestListActions.updateInterestListFilters(
        'gameOrigin',
        event.target.value
      )
    );

  // On Change Status Callback
  const onChangeStatus = (values: Array<string>) =>
    dispatch(
      InterestListActions.updateInterestListFilters('gameStates', values)
    );

  // On Change Date Callback
  const onChangeDate = (value: Moment) =>
    dispatch(
      InterestListActions.updateInterestListFilters(
        'date',
        value ? value.format('YYYY-MM-DD') : null
      )
    );

  //* ******************** */
  // RENDER */
  //* ******************** */
  return (
    <Form className="form d-flex justify-content-between w-100" layout="inline">
      <RenderCount componentName="InterestListSearchForm" />
      <Form.Item label={t('CASH_GAMES_TYPE_LABEL')}>
        <Radio.Group
          onChange={onChangeType}
          defaultValue={interestListListObj.filters.gameOrigin}
        >
          <Radio value="FLOP_USER">{t('FLOP_GAMES')}</Radio>
          <Radio value="CASINO">{t('CASINO_GAMES')}</Radio>
        </Radio.Group>
      </Form.Item>
      {interestListListObj.filters &&
        interestListListObj.filters.gameOrigin === 'FLOP_USER' && (
          <Form.Item label={t('CASH_GAMES_STATUS_LABEL')} className="ml-3">
            <Checkbox.Group
              options={[
                { label: 'Pending', value: 'PENDING' },
                { label: 'Accepted', value: 'ACCEPTED' },
                { label: 'Declined', value: 'DECLINED' }
              ]}
              defaultValue={interestListListObj.filters.gameStates}
              onChange={onChangeStatus}
            />
          </Form.Item>
        )}
      <Form.Item label={t('CASH_GAMES_DATE_LABEL')}>
        <DatePicker
          // defaultValue={interestListListObj.filters.date || moment()}
          onChange={onChangeDate}
          format="YYYY-MM-DD"
        />
      </Form.Item>
    </Form>
  );
};

// Export Default
export default React.memo(InterestListSearchComponent);
