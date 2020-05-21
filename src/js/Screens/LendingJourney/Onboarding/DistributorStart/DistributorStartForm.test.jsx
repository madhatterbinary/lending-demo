/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import DistributorStartForm from './DistributorStartForm';

describe('DistributorStartForm Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      pageData: {
        loan_offers: [{
          'term': 24,
          'initial_amount': '3000.00',
          'total_amount': '3604.51',
          'apr': '19.90000000',
          'monthly_payments': '150.19',
        }],
      },
      dispatch: () => {},
      handleSubmit: () => {},
    };
    component = shallow(<DistributorStartForm onSubmit={ mockSubmit } { ...props } />);
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
