import { INFO_MESSAGE, MONTARY_UNIT, BENEFIT } from './constants/messages.js';
import { multiply } from './utils/calculator.js';
import { DISCOUNT_AMOUNT } from './constants/magicNumber.js';
import { DRINKS, MENU_CATEGORIES } from './constants/menu.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Calendar from './components/Calendar.js';
import Counter from './components/Counter.js';

class App {
  #calendar;

  #counter;

  async #getDate() {
    const date = Number(
      await InputView.readDate(INFO_MESSAGE.VISITING_DATE_ASK),
    );
    this.#calendar = new Calendar(date);
    return null;
  }

  async #getOrder() {
    const orders = await InputView.readMenu(INFO_MESSAGE.ORDER_MENU_ASK);
    this.#counter = new Counter(orders);
    this.#counter.verifyOrder();
    return null;
  }

  #infoBeforeDiscount() {
    OutputView.printInfo(
      `${this.#calendar.getOrderDate()}에 ${INFO_MESSAGE.EVENT_PREVIEW}`,
    );
    OutputView.printOrderMenu(this.#counter.getMenuAndQuantity());
    OutputView.printInfo(INFO_MESSAGE.TOTAL_AMOUNT_BEFORE_DISCOUNT);
    OutputView.printWithMonetaryUnit(
      this.#counter.getTotalAmountBeforeDiscount(),
    );
    OutputView.printInfo(INFO_MESSAGE.GIFT_MENU);
    OutputView.printReceiveChampagne(this.#counter.canReceiveChampagne());
  }

  #hasWeekDayDiscount() {
    if (
      !this.#calendar.isWeekend() &&
      this.#counter.countDessertsOrMainDishes(MENU_CATEGORIES.DESSERTS)
    ) {
      return true;
    }
    return false;
  }

  #hasWeekendDiscount() {
    if (
      this.#calendar.isWeekend() &&
      this.#counter.countDessertsOrMainDishes(MENU_CATEGORIES.MAIN_DISHES)
    ) {
      return true;
    }
    return false;
  }

  static #calculateWeekDayOrWeekendDiscount(count, amount) {
    return multiply(count, amount);
  }

  #checkChristmasDiscount(totalDiscountAmount) {
    const christmasDiscount = this.#calendar.calculateChristmasDiscount();
    OutputView.printBenefitsDetails(BENEFIT.CHRISTMAS_D_DAY, christmasDiscount);
    return totalDiscountAmount + christmasDiscount;
  }

  #checkWeekDayDiscount(totalDiscountAmount) {
    const weekDayDiscount = App.#calculateWeekDayOrWeekendDiscount(
      this.#counter.countDessertsOrMainDishes(MENU_CATEGORIES.DESSERTS),
      DISCOUNT_AMOUNT.WEEK_DAY_DESSERTS,
    );
    OutputView.printBenefitsDetails(BENEFIT.WEEKDAY, weekDayDiscount);
    return totalDiscountAmount + weekDayDiscount;
  }

  #checkWeekendDiscount(totalDiscountAmount) {
    const weekendDiscont = App.#calculateWeekDayOrWeekendDiscount(
      this.#counter.countDessertsOrMainDishes(MENU_CATEGORIES.MAIN_DISHES),
      DISCOUNT_AMOUNT.WEEKEND_MAIN,
    );
    OutputView.printBenefitsDetails(BENEFIT.WEEKEND, weekendDiscont);
    return totalDiscountAmount + weekendDiscont;
  }

  static #checkSpecialDiscountDay(totalDiscountAmount) {
    const specialDiscount = DISCOUNT_AMOUNT.SPECIAL;
    OutputView.printBenefitsDetails(BENEFIT.SPECIAL, specialDiscount);
    return totalDiscountAmount + specialDiscount;
  }

  static #checkChampagneDiscountDay(totalDiscountAmount) {
    const champagneDiscount = DRINKS.샴페인;
    OutputView.printBenefitsDetails(BENEFIT.GIFT, champagneDiscount);
    return totalDiscountAmount + champagneDiscount;
  }

  #hasAnyEvent() {
    let totalDiscountAmount = 0;
    if (this.#calendar.isChristmasDiscountAvailable()) {
      totalDiscountAmount = this.#checkChristmasDiscount(totalDiscountAmount);
    }
    if (this.#hasWeekDayDiscount()) {
      totalDiscountAmount = this.#checkWeekDayDiscount(totalDiscountAmount);
    }
    if (this.#hasWeekendDiscount()) {
      totalDiscountAmount = this.#checkWeekendDiscount(totalDiscountAmount);
    }
    if (this.#calendar.isSpecialDiscountDay()) {
      totalDiscountAmount = App.#checkSpecialDiscountDay(totalDiscountAmount);
    }
    if (this.#counter.canReceiveChampagne()) {
      totalDiscountAmount = App.#checkChampagneDiscountDay(totalDiscountAmount);
    }
    return totalDiscountAmount;
  }

  #trackEvent() {
    if (this.#counter.isTotalAmountAboveThreshold()) {
      return this.#hasAnyEvent();
    }
    OutputView.printInfo(BENEFIT.NOTHING);
    return BENEFIT.NOTHING;
  }

  #infoAfterDiscount() {
    OutputView.printInfo(INFO_MESSAGE.BENEFITS_DETAILS);
    return this.#trackEvent();
  }

  #printTotalBenefits(totalBenefits) {
    if (typeof totalBenefits === 'number') {
      OutputView.printBenefitsDetails('-', totalBenefits);
      return this.#counter.calculateTotalAmountAfterBenefits(totalBenefits);
    }
    OutputView.printInfo(totalBenefits);
    return this.#counter.calculateTotalAmountAfterBenefits(0);
  }

  #applyDiscounts() {
    this.#infoBeforeDiscount();
    const totalBenefits = this.#infoAfterDiscount();
    OutputView.printInfo(INFO_MESSAGE.TOTAL_BENEFITS);
    const totalAmountAfterBenefits = this.#printTotalBenefits(totalBenefits);
    OutputView.printInfo(INFO_MESSAGE.TOTAL_AMOUNT_AFTER_BENEFITS);
    OutputView.printWithMonetaryUnit(totalAmountAfterBenefits);
    OutputView.printInfo(INFO_MESSAGE.EVENT_BADGE);
    OutputView.printInfo(Counter.caculateEventBadge(totalBenefits));
  }

  async run() {
    await this.#getDate();
    await this.#getOrder();
    this.#applyDiscounts();
  }
}

export default App;
