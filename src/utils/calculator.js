import { MONTARY_UNIT } from '../constants/messages.js';

export const multiply = (num1, num2) => num1 * num2;

export const subtract = (num1, num2) => num1 - num2;

export const addCommasToNumber = number => {
  return number.toLocaleString(MONTARY_UNIT.COUNTRY);
};
