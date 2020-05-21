/* global it, expect, describe, beforeEach */
import React from 'react';
import { shallow } from 'enzyme';
import Features from './index';


describe('Features Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Features text1='lala' text2='lolo' text3='lulu' />);
    expect(component.exists()).toEqual(true);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('to have the timeline-navigation-items class', () => {
    expect(component.find('p').length).toEqual(3);
  });

  it('should display correct text when passed in as a child', () => {
    expect(component.find('p').at(0).text()).toEqual('lala');
    expect(component.find('p').at(1).text()).toEqual('lolo');
    expect(component.find('p').at(2).text()).toEqual('lulu');
  });
});
