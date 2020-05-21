/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import VerifyIdentityForm from './VerifyIdentityForm';

describe('VerifyIdentityForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      pageData: {
        loan_monthly_payments: '1',
      },
      questions: [{
        question_name: 'question_name',
        question_text: 'question_text',
        header_text: 'header_text',
        options: [],
      },
      {
        question_name: 'question_name',
        question_text: 'question_text',
        header_text: 'header_text',
        options: [],
      }],
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
    };
    component = shallow(<VerifyIdentityForm onSubmit={ mockSubmit } { ...props } />);
  });

  it('renders without crashing', () => {
    expect(component.exists()).toEqual(true);
  });

  it('<form> element should have a form attribute', () => {
    expect(component.find('form').length).toEqual(1);
  });

  it('questions element number of questions attribute', () => {
    expect(component.find('Field').length).toEqual(props.questions.length);
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
