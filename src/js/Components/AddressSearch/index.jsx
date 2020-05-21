import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';

const theme = {
  container: 'react-autosuggest__container',
  containerOpen: 'react-autosuggest__container--open',
  input: 'react-autosuggest__input form-control',
  inputOpen: 'react-autosuggest__input--open',
  inputFocused: 'react-autosuggest__input--focused',
  suggestionsContainer: 'react-autosuggest__suggestions-container',
  suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
  suggestionsList: 'react-autosuggest__suggestions-list list-group',
  suggestion: 'react-autosuggest__suggestion list-group-item list-group-item-action flex-column align-items-start',
  suggestionFirst: 'react-autosuggest__suggestion--first',
  suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
  sectionContainer: 'react-autosuggest__section-container ',
  sectionContainerFirst: 'react-autosuggest__section-container--first',
  sectionTitle: 'react-autosuggest__section-title',
};

class AddressSearch extends PureComponent {
    static propTypes = {
      addressesData: PropTypes.array,
      onSuggestionSelected: PropTypes.func.isRequired,
      searchAddress: PropTypes.func.isRequired,
    };

    static defaultProps = {
      addressesData: [],
    };

    state = {
      value: '',
      suggestions: [],
      isLoading: false,
      validPostcode: true,
      suggestionSelected: false,
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
      if (prevState.suggestions.length !== nextProps.addressesData.length) {
        return {
          isLoading: false,
          suggestions: nextProps.addressesData,
        };
      }
      return null;
    };

    escapeRegexCharacters = (str) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    getSuggestionValue = (suggestion) => {
      return `${ suggestion.line_1 },  ${ suggestion.line_2 }, ${ suggestion.postcode }, ${ suggestion.country }`;
    };

    getSuggestions = (value) => {
      const escapedValue = this.escapeRegexCharacters(value.trim());
      if (escapedValue === '') {
        return [];
      }
      const regex = new RegExp(`\\b${ escapedValue }`, 'i');
      const { addressesData } = this.props;
      return addressesData.filter((address) => regex.test(this.getSuggestionValue(address)));
    };

    renderSuggestion = (suggestion) => {
      if (!suggestion.building) {
        return (
          <Fragment key='error'>
            <div className='text-danger' data-cy='action-address-suggestion'>{suggestion}</div>
          </Fragment>
        );
      }

      const suggestionText = `${ suggestion.building }, ${ suggestion.line_1 }, ${ suggestion.line_2 ? `${ suggestion.line_2 }, ` : '' }`
      + `${ suggestion.post_town ? `${ suggestion.post_town }, ` : '' }${ suggestion.postcode.replace(/ /g, '') }`;
      return (
        <div className={ `suggestion-content w-100 justify-content-between ${ suggestion.line_1 }` }>
          <div className='mb-1' data-cy='action-address-suggestion'>{suggestionText}</div>
        </div>
      );
    };

    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue,
      });
    };

    onSuggestionsFetchRequested = ({ value }) => {
      const { searchAddress } = this.props;
      const { isLoading } = this.state;
      const validPostcode = /[A-Za-z]{1,2}[0-9]{1,2}[A-Za-z]? ?[0-9][A-Za-z]{2}/.test(value);

      if (validPostcode) {
        if (!isLoading) {
          this.setState(
            {
              validPostcode: true,
              isLoading: true,
            },
            () => {
              searchAddress(value);
            }
          );
        }
      } else {
        this.setState({
          validPostcode: false,
          suggestionSelected: false,
        });
      }
    };

    render() {
      const { value, suggestions, isLoading, validPostcode, suggestionSelected } = this.state;
      const { onSuggestionSelected } = this.props;

      const status = isLoading ? <span className='is-loading'>Loading...</span> : '';

      const inputProps = {
        placeholder: 'Postcode*',
        'data-cy': 'input-postcode',
        value,
        type: 'search',
        onChange: this.onChange,
      };

      return (
        <div className='address-picker-container'>
          <Autosuggest
            id='autosuggest-container-address'
            suggestions={ suggestions }
            onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
            onSuggestionSelected={ (event, { suggestion }) => {
              if (suggestion.postcode) {
                onSuggestionSelected(suggestion);
                this.setState({ value: suggestion.postcode, suggestionSelected: true });
              } else {
                this.setState({ value: '', suggestionSelected: false });
              }
            } }
            alwaysRenderSuggestions={ !suggestionSelected }
            getSuggestionValue={ this.getSuggestionValue }
            onSuggestionsClearRequested={ () => null }
            renderSuggestion={ this.renderSuggestion }
            inputProps={ inputProps }
            theme={ theme }
          />
          <div className='status'>
            {status}
            <span className='poscode-error' data-cy='info-postcode-error'>{!value.length || validPostcode || suggestions.length ? '' : 'Your postcode is not valid.'}</span>
          </div>
        </div>
      );
    }
}

export default AddressSearch;
