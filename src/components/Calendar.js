import { DISCOUNT_DAY } from '../constants/magicNumber.js';
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
    return DISCOUNT_DAY.includes(this.#date);
  }

  calculateChristmasDiscount() {
    if (!this.#isChristmasDiscountAvailable()) return 0;
    return multiply(subtract(this.#date, 1), 100) + 1000;
  }

  #isChristmasDiscountAvailable() {
    return this.#date <= DISCOUNT_DAY.CHRISTMAS;
  }

  getOrderDate() {
    return `${DISCOUNT_DAY.MONTH + 1}월 ${this.#date}일`;
  }
}

export default Calendar;
