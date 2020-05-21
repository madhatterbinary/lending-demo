import { jwt, csrf } from 'js/Store/Constants/auth';

export const checkIfTokensExist = () => {
  if (sessionStorage.getItem(jwt) && sessionStorage.getItem(csrf)) return true;
  return false;
};

export const retreiveTokensFromStorage = () => {
  if (sessionStorage.getItem(jwt) && sessionStorage.getItem(csrf)) {
    return {
      jwt: sessionStorage.getItem(jwt),
      csrf: sessionStorage.getItem(csrf),
    };
  }
  return { jwt: '', csrf: '' };
};
