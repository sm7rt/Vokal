import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { reduxForm, Form } from 'redux-form';

// Wrapper With MemoryRouter
export const wrapperMemoryRouter = (
  component: any,
  initialEntries: Array<string> = ['/'],
  initialIndex: number = 0
) => {
  return (
    <MemoryRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      {component}
    </MemoryRouter>
  );
};

export const wrapperConnectedRouter = (component: any, history: any) => (
  <ConnectedRouter history={history}>{component}</ConnectedRouter>
);

export const wrapperReduxForm = (
  children: any,
  onSubmit?: (data: any) => void,
  formName?: string = 'withReduxForm'
) => {
  const wrapperForm = props => (
    <Form onSubmit={props.handleSubmit(onSubmit)}>
      <children.component {...props} />
    </Form>
  );

  const FormComponent = reduxForm({
    form: formName
  })(wrapperForm);
  return <FormComponent />;
};

/**************************************/
