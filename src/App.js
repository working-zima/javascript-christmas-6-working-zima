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

  async #applyDiscounts() {
    OutputView.printInfo(INFO_MESSAGE.EVENT_PREVIEW);
    OutputView.printOrderMenu(this.#counter.getMenuAndQuantity());
  }

  async run() {
    await this.#getDate();
    await this.#getOrder();
    this.#applyDiscounts();
  }
}

export default App;
