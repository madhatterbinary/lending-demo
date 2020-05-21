/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import SignDocsForm from './SignDocsForm';

describe('SignDocsForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      pageData: {
        agreement_documents: {
          information_about_your_loan: 'loan info',
          loan_agreement: 'agreement',
        },
        user_email: '',
      },
      submitting: false,
      invalid: false,
      dispatch: () => {},
      handleSubmit: () => {},
    };
    props.pageData.agreement_documents['pre-credit_contract_information'] = 'credit info';
    component = shallow(<SignDocsForm onSubmit={ mockSubmit } { ...props } />);
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
