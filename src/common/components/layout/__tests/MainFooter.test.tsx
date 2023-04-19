import React from 'react';
import MainFooter from '../MainFooter';
import { mount } from 'enzyme';
import { wrapperMemoryRouter } from '../../../../../test/util';

describe('>>>Main Footer ---Dumb Component', () => {
  let wrapper: any;
  beforeEach(() => {
    // Mock functions
    wrapper = mount(wrapperMemoryRouter(<MainFooter />));
  });

  it('+++ render the component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
