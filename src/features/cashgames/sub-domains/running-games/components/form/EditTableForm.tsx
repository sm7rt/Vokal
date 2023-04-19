import * as React from 'react';
import { Form, InjectedFormProps, reduxForm } from 'redux-form';
import RenderCount from '../../../../../../common/performance/RenderCount';
import GameSizeField from '../../../../components/form/fields/GameSizeField';
import GameVariantField from '../../../../components/form/fields/GameVariantField';
import RunningCashGamesConstants from '../../constants/RunningCashGamesConstants';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type EditTableFormProps = {};

//* ******************** */
// FORM PROPS */
//* ******************** */
type EditTableFormType = {};

// Global Props
type GlobalProps = InjectedFormProps<EditTableFormType, EditTableFormProps> &
  EditTableFormProps;

/**
 * Edit Table Form
 */
const EditTableFormComp = (props: GlobalProps) => {
  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  //* ******************** */
  // RENDER */
  //* ******************** */
  // const { t } = useTranslation();
  return (
    <Form className="form d-flex flex-column flex-fill modal-overflow">
      <RenderCount componentName="EditTableFormComp" />
      {/***********************
       * Game Variant Field *
       ***********************/}
      <GameVariantField />
      {/***********************
       * Game Size Field *
       ***********************/}
      <GameSizeField />
    </Form>
  );
};

// Create Redux form
const EditTableForm = reduxForm<EditTableFormType, EditTableFormProps>({
  form: RunningCashGamesConstants.EDIT_TABLE_FORM
})(EditTableFormComp);

// Export Default
export default React.memo(EditTableForm);
