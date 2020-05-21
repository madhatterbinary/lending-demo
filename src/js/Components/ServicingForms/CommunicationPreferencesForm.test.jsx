/* global it, expect, describe, beforeEach, jest */
import React from 'react';
import { shallow } from 'enzyme';
import CommunicationPreferencesForm from './CommunicationPreferencesForm.jsx';

describe('SignDocsForm main view Component', () => {
  let component;
  let props;
  let mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    props = {
      handleSubmit: () => {
      },
      pageData: {
        agreement_documents: {
        },
      },
      submitting: false,
      invalid: false,
      dispatch: () => {},

    };
    component = shallow(<CommunicationPreferencesForm onSubmit={ mockSubmit } { ...props } />);
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
