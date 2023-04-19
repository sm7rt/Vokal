import * as React from 'react';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';
import { LoadingContainer } from '../../../../../../common/components/container';
import RenderCount from '../../../../../../common/performance/RenderCount';
import GameSizeField from '../../../../components/form/fields/GameSizeField';
import GameVariantField from '../../../../components/form/fields/GameVariantField';
import AddTableFieldArray from '../../../../components/form/TableFieldArray';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type RunningGameCreationProps = {};

//* ******************** */
// FORM PROPS */
//* ******************** */
type RunningGameCreationFormType = {};

// Global Props
type GlobalProps = InjectedFormProps<
  RunningGameCreationFormType,
  RunningGameCreationProps
> &
  RunningGameCreationProps;

/**
 * Interest List Creation Component
 */
const RunningGameCreationComp = (props: GlobalProps) => {
  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  //* ******************** */
  // RENDER */
  //* ******************** */
  // const { t } = useTranslation();
  return (
    <Form className="form d-flex flex-column flex-fill modal-overflow">
      <RenderCount componentName="RunningGameCreationForm" />
      {/***********************
       * Game Variant Field *
       ***********************/}
      <GameVariantField />
      {/***********************
       * Game Size Field *
       ***********************/}
      <GameSizeField />
      {/***********************
       * Add Table Field Array *
       ***********************/}
      <AddTableFieldArray
        formName={RunningCashGamesConstants.CREATE_RUNNING_GAME_FORM}
      />
    </Form>
  );
};

// Create Redux form
const RunningGameCreationForm = reduxForm<
  RunningGameCreationFormType,
  RunningGameCreationProps
>({
  form: RunningCashGamesConstants.CREATE_RUNNING_GAME_FORM
})(RunningGameCreationComp);

// Export Default
export default LoadingContainer(['FETCH_REGISTERED_PLAYERS'])(
  React.memo(RunningGameCreationForm)
);
