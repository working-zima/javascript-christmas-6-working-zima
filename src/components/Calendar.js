import { DISCOUNT_DAY, DISCOUNT_AMOUNT } from '../constants/magicNumber.js';
import { multiply, subtract } from '../utils/calculator.js';

class Calendar {
  #date;

  constructor(date) {
    this.#date = date;
  }

  isWeekend() {
    if (
      new Date(
        DISCOUNT_DAY.YEAR,
        DISCOUNT_DAY.MONTH,
        `${this.#date}`,
      ).getDay() >= DISCOUNT_DAY.START_OF_WEEKEND
    ) {
      return true;
    }
    return false;
  }

  isSpecialDiscountDay() {
    return DISCOUNT_DAY.SPECIAL_DAYS.includes(this.#date);
  }

  isChristmasDiscountAvailable() {
    return this.#date <= DISCOUNT_DAY.CHRISTMAS;
  }

  getOrderDate() {
    return `${DISCOUNT_DAY.MONTH + 1}월 ${this.#date}일`;
  }

  calculateChristmasDiscount() {
    if (!this.isChristmasDiscountAvailable()) return 0;
    return (
      multiply(subtract(this.#date, 1), DISCOUNT_AMOUNT.CHRISTMAS_INCREASE) +
      DISCOUNT_AMOUNT.CHRISTMAS_BASIC
    );
  }
}

export default Calendar;
