/* eslint-disable import/no-unused-modules */
// Removes sensitive data from sentry logs
const ALLOWED_DATA_OBJECTS = [
  'loadingStepData', 'validators', 'options', 'errors', 'router', 'application', 'beStubsOn', 'ticketChecker', 'confirm_account_holder',
];
export const removeDataValues = (object: any) => {
  let newObject = object;
  let keys = null;

  if (object !== null && typeof (object) === 'object' && !Array.isArray(object)) {
    newObject = { ...object };
    keys = Object.keys(newObject);
  } else if (object !== null && Array.isArray(object)) {
    newObject = [...object];
    keys = [...object];
  }

  (keys || []).filter((key: string) => !ALLOWED_DATA_OBJECTS.find((e: string) => e === key)).forEach((key: string) => {
    if (newObject[key] !== null && typeof (newObject[key]) === 'object' && !Array.isArray(newObject[key])) {
      newObject[key] = removeDataValues(newObject[key]);
    }

    if (newObject[key] !== null && Array.isArray(newObject[key])) {
      let newArray = [];
      newObject[key].forEach((arrayElem: any, index: number) => {
        newArray = [...newArray, removeDataValues(newObject[key][index])];
      });
      newObject[key] = [...newArray];
    }

    if (newObject[key] !== null && !Array.isArray(newObject[key]) && typeof (newObject[key]) !== 'object') {
      newObject[key] = typeof newObject[key];
    }
  });

  return newObject;
};
