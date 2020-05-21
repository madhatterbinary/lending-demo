import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormHOC from 'js/Store/hoc/FormContainer';
import 'js/Components/ServicingForms/CommunicationPreferencesForm.scss';
import Form from 'js/Components/ServicingForms/CommunicationPreferencesForm';

class CommunicationPreferences extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }

  static defaultProps = {
    children: null,
  };

  render() {
    const { children } = this.props;
    return (
      <div className='communication-preferences-screen'>
        { children }
      </div>
    );
  }
}

export default FormHOC(CommunicationPreferences, Form, '/lending/preferences');
