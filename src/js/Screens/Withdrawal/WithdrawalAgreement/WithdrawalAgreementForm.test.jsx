/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import WithdrawalAgreementForm from './WithdrawalAgreementForm';

describe('WithdrawalAgreementForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;

  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      submitting: false,
      pristine: true,
      handleSubmit: () => {},
    };
    component = shallow(<WithdrawalAgreementForm onSubmit={ mockSubmit } { ...props } />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('<form> element should have a form attribute', () => {
    expect(component.find('form').length).toEqual(1);
  });

  it('field element number of fields attribute', () => {
    expect(component.find('Field').length).toEqual(1);
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
