/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import AmountForm from './AmountForm';

describe('AmountForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;

  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      handleSubmit: () => {
      },
      submitting: false,
      options: {},

    };
    component = shallow(<AmountForm onSubmit={ mockSubmit } { ...props } />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('<form> element should have a form attribute', () => {
    expect(component.find('form').length).toEqual(1);
  });

  it('questions element number of questions attribute', () => {
    expect(component.find('Field').length).toEqual(2);
  });

  it('<form> element should have a onSubmit attribute', () => {
    component.find('form').first().simulate('submit', { mockSubmit });
  });

  it('calls the submit callback', () => {
    component.handleSubmit = mockSubmit;
    component.handleSubmit();
    expect(mockSubmit).toHaveBeenCalled();
  });
});
