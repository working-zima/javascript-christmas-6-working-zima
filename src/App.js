import { INFO_MESSAGE } from './constants/messages.js';
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
    if (!this.#calendar.isWeekend() && this.#counter.countDesserts()) {
      return true;
    }
    return false;
  }

  #hasWeekendDiscount() {
    if (!this.#calendar.isWeekend() && this.#counter.countMainDishes()) {
      return true;
    }
    return false;
  }

  #eventTracker() {
    if (
      this.#counter.isTotalAmountAboveThreshold() ||
      this.#counter.canReceiveChampagne() ||
      this.#calendar.isChristmasDiscountAvailable() ||
      this.#calendar.isSpecialDiscountDay() ||
      this.#hasWeekDayDiscount() ||
      this.#hasWeekendDiscount()
    ) {
      return true;
    }
    return false;
  }

  #infoAfterDiscount() {
    OutputView.printInfo(INFO_MESSAGE.BENEFITS_DETAILS);
    this.#counter.countDesserts();
  }

  #applyDiscounts() {
    this.#infoBeforeDiscount();
    this.#infoAfterDiscount();
  }

  async run() {
    await this.#getDate();
    await this.#getOrder();
    this.#applyDiscounts();
  }
}

export default App;
