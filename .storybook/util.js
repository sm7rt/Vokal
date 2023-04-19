import React from 'react';
import Immutable from 'seamless-immutable';
import { Provider } from 'react-redux';
import createStore from '../test/redux';
import { initialStateGlobal } from '../test/redux/InitialState';
import { reduxForm } from 'redux-form';
import { Col, Row } from 'antd';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

/********* Container Fluid Decorator  **********/

const ContainerFluidDecorator = (storyFn: any) => (
  <div className="p-2">{storyFn()}</div>
);

/**************************************/

/********* Center Decorators Medium Width **********/

const CenterMediumWidthDecorator = (storyFn: any) => (
  <Col md={12} offset={6} style={{ height: '100vh' }}>
    <Row type="flex" className="w-100 h-100" justify="center" align="middle">
      {storyFn()}
    </Row>
  </Col>
);

/**************************************/

/******** Provider Decorators *********/

const withProvider = (story, initialState = initialStateGlobal) => {
  const { store } = createStore(initialState);
  return (
    <Provider store={store}>
      {' '}
      <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
    </Provider>
  );
};

/**************************************/

/******** Redux Form Decorators *********/

const ReduxFormDecorator = (
  storyFn: any,
  initialValues?: any = {},
  formName?: string = 'withReduxForm'
) => {
  const FormComponent = reduxForm({
    form: formName,
    initialValues
  })(storyFn);
  return <FormComponent />;
};

/**************************************/

export {
  ContainerFluidDecorator,
  CenterMediumWidthDecorator,
  withProvider,
  ReduxFormDecorator
};
