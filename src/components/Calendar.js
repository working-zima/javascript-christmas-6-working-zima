import { DISCOUNT_DAY } from '../constants/magicNumber.js';
import { INFO_MESSAGE } from '../constants/messages.js';
import { multiply, subtract } from '../utils/calculator.js';
import InputView from '../view/InputView.js';

class Calendar {
  #date;

  async getDate() {
    this.#date = Number(
      await InputView.readDate(INFO_MESSAGE.VISITING_DATE_INFO),
    );
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
    return this.date <= DISCOUNT_DAY.CHRISTMAS;
  }
}

export default Calendar;
