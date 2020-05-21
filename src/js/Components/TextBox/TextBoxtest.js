/* global it, expect, describe, jest */
import React from 'react';
import { shallow } from 'enzyme';
import PopopBox from './index';


describe('My component', () => {
  it('should call simpleDialogHandler', () => {
    const wrapper = shallow(<PopopBox />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'simpleDialogHandler');
    wrapper.find('button').simulate('click');
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
