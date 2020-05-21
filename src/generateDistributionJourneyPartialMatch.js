import runtimeEnv from '@mars/heroku-js-runtime-env';

const request = require('request');
const opn = require('opn');

const BASE_URL = 'http://192.168.1.23:8000';
const FE_URL = 'http://localhost:3000';

const env = runtimeEnv();
const BRAND_NAME = env.REACT_APP_BRAND_NAME;

request.get(
  {
    headers: {
      'host-organisation-name': BRAND_NAME,
    },
    url: `${ BASE_URL }/dev/stubs/cs_referral_partial_match`,
  },
  (error, response, body) => {
    opn(`${ FE_URL }/lending/continuejourney/?jwt=${ JSON.parse(body).cs_jwt }`);
  }
);
