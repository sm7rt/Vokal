import React from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';
import RenderCount from '../../../../common/performance/RenderCount';
import { ATextarea } from '../../../../common/components/form/AntdSimpleField';
import CommonConstants from '../../../../common/constants/CommonConstants';

const AddMessageForm = ({ handleSubmit, onSubmitForm }) => {
  return (
    <Form
      className="d-flex flex-row align-items-start"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <RenderCount componentName="AddMessageForm" />
      <Field
        id="message"
        name="message"
        size="large"
        validate={[required()]}
        component={ATextarea}
        className="d-flex flex-fill full-width-parent m-0 input-grey"
      />
    </Form>
  );
};

export default reduxForm({
  form: CommonConstants.ADD_MESSAGE_FORM
})(AddMessageForm);
