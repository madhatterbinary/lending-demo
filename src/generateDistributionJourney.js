const request = require('request');
const opn = require('opn');

const BASE_URL = 'http://192.168.1.23:8000';
const FE_URL = 'http://localhost:3000';

request.get(
  {
    url: `${ BASE_URL }/dev/stubs/cs_referral`,
  },
  (error, response, body) => {
    opn(`${ FE_URL }/lending/continuejourney/?jwt=${ JSON.parse(body).cs_jwt }`);
  }
);
