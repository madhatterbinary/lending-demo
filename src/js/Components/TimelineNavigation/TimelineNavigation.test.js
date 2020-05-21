/* global it, expect, describe, jest, beforeEach */
import React from 'react';
import { shallow } from 'enzyme';
import TimelineNavigation from './index';

const timelineProps = {
  timelineItems: [{
    title: 'details',
    link: '/userinformation/details',
    hidden: false,
  }, {
    title: 'address',
    link: '/userinformation/address',
    hidden: false,
  }, {
    title: 'expenses',
    link: '/userinformation/expenses',
    hidden: false,
  }],
  localmatch: '',
};

describe('TimelineNavigation Component', () => {
  let component;

  beforeEach(() => {
    const myMock = jest.fn();
    component = shallow(<TimelineNavigation timelineItems={ timelineProps.timelineItems } to={ timelineProps.timelineItems.link } onChange={ myMock } />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });
});
