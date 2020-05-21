/* eslint-disable no-irregular-whitespace */
export const formValidatorFormatter = (errors) => {
  let fieldErrors = {};
  if ((errors || {}).form_validation && (errors || {}).form_validation.form_fields) {
    Object.keys((errors || {}).form_validation.form_fields).forEach(formName => {
      Object.keys((errors || {}).form_validation.form_fields[formName]).forEach(fieldName => {
        if ((errors || {}).form_validation.form_fields[formName][fieldName].length) {
          fieldErrors = {
            ...fieldErrors,
            [fieldName]: (errors || {}).form_validation.form_fields[formName][fieldName][0],
          };
        }
      });
    });
  }

  if ((errors || {}).form_validation && (errors || {}).form_validation.form_error) {
    Object.keys((errors || {}).form_validation.form_error).forEach(fieldName => {
      if ((errors || {}).form_validation.form_error[fieldName][0].length) {
        fieldErrors = {
          ...fieldErrors,
          [fieldName]: (errors || {}).form_validation.form_error[fieldName][0],
        };
      }
    });
  }
  if ((errors || {}).system_errors && (errors || {}).system_errors.message) {
    fieldErrors = {
      ...fieldErrors,
      'security_questions': [
        {
          'security_topic_answer': 'required*',
        },
      ],
    };
  }

  return fieldErrors;
};
