/* global it, expect, describe, beforeEach */
import React from 'react';
import { shallow } from 'enzyme';
import TopBarNavigation from './index';


describe('TopBarNavigation Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<TopBarNavigation>TopBarNavigation content</TopBarNavigation>);
    expect(component.exists()).toEqual(true);
    expect(component.find('.layout-container').length).toBe(1);
  });

  it('to have the timeline-navigation-items class', () => {
    expect(component.find('.layout-container').length).toEqual(1);
  });

  it('should display correct text when passed in as a child', () => {
    expect(component.find('.layout-container').at(0).text()).toEqual('TopBarNavigation content');
  });
});
