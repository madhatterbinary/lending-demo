/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import ExpensesForm from './ExpensesForm';

describe('StartLoanApplicationForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      pageData: { completed_pages: [1, 2, 3] },
      options: {
        employment_status: [{
          id: '',
          label: '',
        }],
        user_provided_tax_position: [{
          id: '',
          label: '',
        }],
        user_provided_income_period: [{
          id: '',
          label: '',
        }],
      },
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
    };
    component = shallow(<ExpensesForm onSubmit={ mockSubmit } { ...props } />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('<form> element should have a form attribute', () => {
    expect(component.find('form').length).toEqual(1);
  });

  it('<Fields> element number of Fields attribute', () => {
    expect(component.find('Field').length).toEqual(6);
  });

  it('<form> element should have a onSubmit attribute', () => {
    component.find('form').simulate('submit', { mockSubmit });
  });

  it('calls the submit callback', () => {
    component.handleSubmit = mockSubmit;
    component.handleSubmit();
    expect(mockSubmit).toHaveBeenCalled();
  });
});
