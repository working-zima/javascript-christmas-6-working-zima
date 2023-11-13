import { DISCOUNT_DAY } from '../constants/magicNumber.js';
import { REGEX } from '../constants/regex.js';
import { MENU_LISTS, DRINKS, MENU_QUANTITY_RANGE } from '../constants/menu.js';
import { ERROR_MESSAGE } from '../constants/messages.js';
import CustomError from '../error/CustomError.js';
import Counter from '../components/Counter.js';

export const validator = {
  /**
   * 해당 값이 공백인지 확인
   * @param {string} value
   * @returns boolean
   */
  isSpace(value) {
    return String(value).trim() === '';
  },

  /**
   * 해당 값이 특정 범위 숫자에 속하는지 확인
   * @param {*} value
   * @returns boolean
   */
  isDateInRange(value) {
    return (
      Number(value) >= DISCOUNT_DAY.START_OF_EVENT &&
      Number(value) <= DISCOUNT_DAY.END_OF_EVENT
    );
  },

  /**
   * 해당 값이 양의 정수인지 확인
   * @param {*} value
   * @returns boolean
   */
  isPositiveInteger(value) {
    return (
      !this.isSpace(value) &&
      Number.isInteger(Number(value)) &&
      Number(value) > 0
    );
  },

  /**
   * 해당 값이 메뉴판에 있는 메뉴인지 확인
   * @param {array} value
   * @returns booelan
   */
  isMenuOnMenuList(value) {
    return value.every(([menu]) => Object.keys(MENU_LISTS).includes(menu));
  },

  /**
   * 해당 값에 음료 외 음식이 있는지 확인
   * @param {array} value
   * @returns booelan
   */
  isFoodIncludedInOrder(value) {
    return value.filter(([menu]) => !Object.keys(DRINKS).includes(menu)).length;
  },

  /**
   * 해당 값에 총 개수가 20 이하인지 확인
   * @param {array} value
   * @returns boolean
   */
  isValidOrderQuantity(value) {
    const totalQuantity = value.reduce((acc, [, quantity]) => {
      return acc + Number(quantity);
    }, 0);
    return totalQuantity <= MENU_QUANTITY_RANGE.MAX;
  },

  /**
   * 해당 값에 중복된 음식이 있는지 확인
   * @param {array} value
   * @returns boolean
   */
  isDuplicateMenus(value) {
    const menuOnlyArray = value.map(([menu]) => menu);
    return menuOnlyArray.length === new Set(menuOnlyArray).size;
  },

  /**
   * 해당 메뉴 형식 값이 예시와 같은지 확인
   * @param {string} value
   * @returns boolean
   */
  isValidMenuFormat(value) {
    return REGEX.MENU_FORMAT.test(value);
  },

  /**
   * 해당 값의 length가 1 이상인지 확인
   * @param {array} value
   * @returns boolean
   */
  isMenuLengthGreaterThanZero(value) {
    return value.length >= MENU_QUANTITY_RANGE.MIN;
  },

  /* validation */
  validateOrderDate(value) {
    if (!this.isPositiveInteger(value) || !this.isDateInRange(value)) {
      throw CustomError.getDate(ERROR_MESSAGE.DATE);
    }
  },

  validateOrderMenu(value) {
    const splitedValue = Counter.splitMenu(value);
    if (
      !this.isValidMenuFormat(value) ||
      !this.isMenuLengthGreaterThanZero(splitedValue) ||
      !this.isMenuOnMenuList(splitedValue) ||
      !this.isFoodIncludedInOrder(splitedValue) ||
      !this.isValidOrderQuantity(splitedValue) ||
      !this.isDuplicateMenus(splitedValue)
    ) {
      throw CustomError.getOrder(ERROR_MESSAGE.ORDER);
    }
  },
};
