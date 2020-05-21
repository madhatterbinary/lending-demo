/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import PaymentDetailsForm from './PaymentDetailsForm';

jest.mock('react-redux', () => ({
  connect(/* mapStateToProps, mapDispatchToProps */) {
    return function (WrappedComponent) {
      function FakeConnect() {
        return <WrappedComponent />;
      }
      const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';
      FakeConnect.displayName = `Connect(${ name })`;
      return FakeConnect;
    };
  },
  useSelector: () => ({ application: { inWaitingRoom: false } }),
}));

describe('PaymentDetailsForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      pageData: {
        loan_monthly_payments: '1',
      },
      options: {
        repayment_date: [{
          id: '',
          label: '',
        }],
        user_provided_tax_position: 'user_provided_tax_position',
        user_provided_income_period: '0',
      },
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
    };
    component = shallow(<PaymentDetailsForm onSubmit={ mockSubmit } { ...props } />);
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
