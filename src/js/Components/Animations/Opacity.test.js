/* global it, expect, describe */
import React from 'react';
import { shallow } from 'enzyme';
import Opacity from './Opacity';


describe('Opacity Component', () => {
  let component;

  it('renders without crashing', () => {
    component = shallow(<Opacity>Opacity content</Opacity>);
    expect(component.exists()).toEqual(true);
  });

  it('renders the a CCCTransition component', () => {
    component = shallow(<Opacity>Opacity content</Opacity>);
    expect(component.find('CSSTransition').length).toEqual(1);
  });
});
