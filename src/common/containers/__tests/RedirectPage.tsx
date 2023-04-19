import React from 'react';
import ReactDOM from 'react-dom';
import RedirectPage from '../RedirectPage';
describe('Redirect Page tests', () => {
  it('NotFoundPage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RedirectPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
