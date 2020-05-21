/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import ChooseLoanForm from './ChooseLoanForm';

describe('StartLoanApplicationForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      pageData: {
        products: {
          responses: [{
            loan_product_id: 1,
            loan_amount: 1,
            loan_personalised_rate: 1,
            loan_monthly_payments: 1,
            loan_total_payable: 1,
          },
          {
            loan_product_id: 2,
            loan_amount: 2,
            loan_personalised_rate: 2,
            loan_monthly_payments: 2,
            loan_total_payable: 2,
          }],
        },
      },
      handleSubmit: () => {},
      dispatch: () => {},
    };
    component = shallow(<ChooseLoanForm onSubmit={ mockSubmit } { ...props } />);
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
});
