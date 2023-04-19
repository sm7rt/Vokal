import React from 'react';
import ReactDOM from 'react-dom';
import {
  NotFoundPage,
  BadRequestPage,
  UnAuthorizedPage,
  ServerErrorPage
} from '../ErrorPage';
import { wrapperMemoryRouter } from '../../../../test/util';
describe('Error Page tests', () => {
  it('NotFoundPage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(wrapperMemoryRouter(<NotFoundPage />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('UnAuthorizedPage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(wrapperMemoryRouter(<UnAuthorizedPage />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('BadRequestPage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(wrapperMemoryRouter(<BadRequestPage />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('ServerErrorPage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(wrapperMemoryRouter(<ServerErrorPage />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
