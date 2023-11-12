import { INFO_MESSAGE } from './constants/messages.js';
import { DISCOUNT_DAY } from './constants/magicNumber.js';
import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Calendar from './components/Calendar.js';
import Counter from './components/Counter.js';

class App {
  #calendar;

  #counter;

  #state;

  constructor() {
    this.#state = { date: 0, orders: '' };
  }

  async #getDate() {
    const date = Number(
      await InputView.readDate(INFO_MESSAGE.VISITING_DATE_ASK),
    );
    this.#calendar = new Calendar(date);
    this.#state.date = date;
  }

  async #getOrder() {
    const orders = await InputView.readMenu(INFO_MESSAGE.ORDER_MENU_ASK);
    this.#counter = new Counter(orders);
    this.#counter.verifyOrder();
    this.#state.orders = orders;
  }

  async #applyDiscounts() {
    OutputView.printInfo(
      `${DISCOUNT_DAY.MONTH + 1}월 ${this.#state.date}일에 ${
        INFO_MESSAGE.EVENT_PREVIEW
      }`,
    );
    OutputView.printOrderMenu(this.#counter.getMenuAndQuantity());
    OutputView.printInfo(INFO_MESSAGE.TOTAL_AMOUNT_BEFORE_DISCOUNT);
    OutputView.printWithMonetaryUnit(
      this.#counter.getTotalAmountBeforeDiscount(),
    );
    OutputView.printInfo(INFO_MESSAGE.GIFT_MENU);
    OutputView.printReceiveChampagne(this.#counter.canReceiveChampagne());
    OutputView.printInfo(INFO_MESSAGE.BENEFITS_DETAILS);
  }

  async run() {
    await this.#getDate();
    await this.#getOrder();
    this.#applyDiscounts();
  }
}

export default App;
