/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import AddressForm from './AddressForm.jsx';

describe('StartLoanApplicationForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      invalid: false,
      handleSubmit: () => {},
    };
    component = shallow(<AddressForm onSubmit={ mockSubmit } { ...props } />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('<form> element should have a form attribute', () => {
    expect(component.find('form').length).toEqual(1);
  });

  it('<Fields> element number of Fields attribute', () => {
    expect(component.find('Field').length).toEqual(1);
  });

  it('<FieldArray> element number of FieldArray attribute', () => {
    expect(component.find('FieldArray').length).toEqual(1);
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
