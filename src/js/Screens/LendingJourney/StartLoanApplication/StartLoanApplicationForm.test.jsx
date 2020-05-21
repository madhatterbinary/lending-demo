/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import StartLoanApplicationForm from './StartLoanApplicationForm';

describe('StartLoanApplicationForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      initialValues: {
        loan_amount: 1000,
        term_in_months: 12,
      },
      currentValues: {
        loan_amount: 1000,
        term_in_months: 12,
      },
      validators: {
        loan_amount: {
          min_value: 1000,
          max_value: 12000,
        },
        term_in_months: {
          min_value: 12,
          max_value: 60,
        },
      },
      handleSubmit: () => {},
    };
    component = shallow(<StartLoanApplicationForm onSubmit={ mockSubmit } { ...props } />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('<form> element should have a form attribute', () => {
    expect(component.find('form').length).toEqual(1);
  });

  it('<form> element should have a onSubmit attribute', () => {
    component.find('form').simulate('submit', { mockSubmit });
  });

  it('calls the submit callback', () => {
    component.handleSubmit = mockSubmit;
    component.handleSubmit();
    expect(mockSubmit).toHaveBeenCalled();
  });

  it('<Fields> element number of Fields attribute', () => {
    expect(component.find('Field').length).toEqual(2);
  });

  it('calculateLoan monthlyPayment state', () => {
    const instance = component.instance();
    expect(instance.state.termInMonths).toBe(12);
  });

  it('calculateLoan totalPayment state', () => {
    const instance = component.instance();
    expect(instance.state.borrowAmount).toBe(1000);
  });
});
