/* eslint-disable camelcase */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddressSearchField from 'js/Components/AddressSearchField';
import { Link } from 'react-router-dom';
import moment from 'moment';

/*
  Component holds the UI and data for one single ADDRESSITEM
  Multiple of these can be included in the address form
*/
class AddressesPanel extends PureComponent {
    static propTypes = {
      fields: PropTypes.object,
      options: PropTypes.object,
      submitting: PropTypes.bool,
      location: PropTypes.object,
      invalid: PropTypes.bool.isRequired,
      pathname: PropTypes.string,
      currentStep: PropTypes.string,
      addresses: PropTypes.object,
    };

    static defaultProps = {
      fields: [],
      options: {},
      location: {},
      pathname: '',
      currentStep: '',
      addresses: {},
    };

    state = {
      currentFieldsLength: -1,
      currentIndex: 0,
    };

    static getDerivedStateFromProps(props, state) {
      // when an object is added, update component state to force rendering
      if (props.fields.length !== state.currentFieldsLength) {
        return { currentFieldsLength: props.fields.length };
      }

      // Return null to indicate no change to state.
      return null;
    }

    createFieldAddress = () => {
      const { fields } = this.props;
      fields.push({});
    };

    shouldAddPreviousAddress = (fields) => {
      // const todayDate = moment();
      const lastAddress = fields.get(fields.length - 1);
      if (fields.length > 0) {
        if (lastAddress.move_in_date
              && !moment(lastAddress.move_in_date).isBefore(moment().subtract(3, 'years'))
        ) {
          return true;
        }
      }
      return false;
    };

    renderPreviousAddressButton = (fields) => {
      if (this.shouldAddPreviousAddress(fields)) {
        return (
          <button className='btn btn-outline-primary' type='button' onClick={ this.createFieldAddress }>
            Add previous address
          </button>
        );
      }
      return <div />;
    };

    renderPreviousAddressMessage = (fields) => {
      if (this.shouldAddPreviousAddress(fields)) {
        return (
          <Fragment>
            <h2 className='mb-1' style={{ fontSize: '1em', color: '#e83d52', marginTop: 90 }}>Please add your previous address</h2>
            <p style={{ fontSize: '1em', color: '#e83d52' }}>We require 3 years of address history.</p>
          </Fragment>
        );
      }
      return <div />;
    }

    setPathname = () => {
      const { pathname, currentStep } = this.props;
      if (currentStep === 'savings_customer_address_details') {
        return '/savings/onboarding/details';
      }
      if (currentStep === 'savings_customer_residency_comm_details') {
        return '/savings/onboarding/address';
      }
      if (currentStep === 'contact_details') {
        return '/lending/onboarding/details';
      }
      return `/${ pathname.substr(1, 7) }/${ pathname.substr(9, 100) }`;
    }

    getCurrentIndex = (i) => {
      this.setState({ currentIndex: i });
    };

    // eslint-disable-next-line no-unused-vars
  setCurrentIndex = () => {
    const { currentIndex } = this.state;
    // eslint-disable-next-line no-unused-vars
    const indx = currentIndex;
  };

  // savings_customer_address_details   savings_customer_residency_comm_details
  render() {
    const { fields, options, submitting, location, invalid, addresses } = this.props;

    return (
      <div className='container mb-5'>
        {fields.map((address, index) => {
          return (
          // eslint-disable-next-line react/no-array-index-key
            <div key={ index } className='row'>
              <div className='col p-0'>
                <Fragment>
                  <AddressSearchField
                    address={ address }
                    index={ index }
                    fields={ fields }
                    options={ options }
                    location={ location }
                    setCurrentIndex={ x => this.getCurrentIndex(x) }
                    addresses={ addresses }
                  />
                  {/* If duration does not match 3 years, ask for more details */}
                  {this.renderPreviousAddressMessage(fields)}
                </Fragment>
              </div>
            </div>
          );
        })}
        <div className='row'>
          <div className='col p-0 pt-5 text-right'>
            <Link to={ this.setPathname() }>
              <button type='submit' className='btn btn-outline-primary pr-4 mr-4' disabled={ submitting }><i className='material-icons'>chevron_left</i>Back</button>
            </Link>
            <button className='btn btn-primary pl-4' type='submit' data-cy='action-next-step' disabled={ submitting }>Next step<i className='material-icons'>chevron_right</i></button>
            {this.renderPreviousAddressButton(fields)}
          </div>
        </div>
        <div className='row mb-4 text-right'>
          <div className='col' />
          <div className='col text-right'><label htmlFor='submit-warning' className='warning'>{ invalid ? 'form incomplete, check above.' : ''}</label></div>
        </div>
      </div>
    );
  }
}
export default AddressesPanel;
