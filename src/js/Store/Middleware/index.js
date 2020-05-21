/* eslint-disable import/no-unused-modules */
// Import middlewares here
import genericApplicationMiddleware from './genericApplicationMiddleware';
import redirectMiddleware from './redirectMiddleware';
import formValidationMiddleware from './formValidationMiddleware';
import tokenMiddleware from './tokenMiddleware';
import iovationMiddleware from './iovationMiddleware';

export default {
  tokenMiddleware,
  genericApplicationMiddleware,
  redirectMiddleware,
  formValidationMiddleware,
  iovationMiddleware,
};
