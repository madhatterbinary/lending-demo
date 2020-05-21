import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { reduxForm } from 'redux-form';
import Opacity from 'js/Components/Animations/Opacity';
import PropTypes from 'prop-types';
import { apiUrlMapper, getUrlsForJourneyType } from '../../Utils/urlMapper';

export default function (ComposedComponent, Form, url, extraInitialValuesPath = '') {
  const FormWrapped = reduxForm({
    form: 'form-screen',
    enableReinitialize: true,
  })(Form);

  const FormContainer = (props) => {
    const { pageData, initialValues, options, validators, currentValues, formData } = useSelector(state => {
      return ({
        pageData: state.stepData.pageData,
        initialValues: state.stepData.initialData,
        options: state.stepData.options,
        validators: state.stepData.validators,
        currentValues: (state.form['form-screen'] || {}).values,
        formData: state.stepData.formData,
      });
    });
    const { loadStepDataPublic, submitStepDataCSRF } = useActions(actions);
    let urlToUse = url;
    if (url === null) {
      // TODO: this is ugly, would be better if we could retrieve the nextAction in a cleaner way.
      const urlMap = getUrlsForJourneyType('app');
      const nextAction = Object.keys(urlMap).find(k => urlMap[k]() === props.location.pathname);
      urlToUse = apiUrlMapper(nextAction);
    }
    const onSubmitForm = (values) => {
      submitStepDataCSRF(urlToUse, values);
    };

    useEffect(() => {
      loadStepDataPublic(urlToUse);
    }, [loadStepDataPublic, urlToUse]);
    const extraInitialValues = extraInitialValuesPath ? { ...pageData[extraInitialValuesPath] } : {};
    return (
      <ComposedComponent>
        <Opacity speed={ 300 }>
          <FormWrapped
            onSubmit={ (values) => onSubmitForm(values) }
            initialValues={{ ...initialValues, ...extraInitialValues }}
            options={ options }
            validators={ validators }
            pageData={ pageData }
            formData={ formData }
            currentValues={ currentValues }
            urlToUse={ urlToUse }
          />
        </Opacity>
      </ComposedComponent>
    );
  };
  FormContainer.propTypes = {
    location: PropTypes.object,
  };
  return FormContainer;
}
