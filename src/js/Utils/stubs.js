/* eslint-disable import/no-unused-modules */
export const generateName = () => Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);

export const getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const generateDOB = () => `${ getRandomBetween(1960, 1990) }-0${ getRandomBetween(1, 9) }-${ getRandomBetween(10, 28) }`;

export const monthlyPaymentLoanCalculator = (rate, totalValue, period) => {
  const yearlyPeriod = 12;
  const derivedRate = ((1 + rate) ** (1 / yearlyPeriod)) - 1;
  return (derivedRate * totalValue) / (1 - ((1 + derivedRate) ** (-period)));
};
