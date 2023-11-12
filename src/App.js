import Counter from './components/Counter.js';
import Calendar from './components/Calendar.js';
import { INFO_MESSAGE } from './constants/messages.js';
import InputView from './view/InputView.js';

class App {
  #calendar = new Calendar();

  #counter;

  async #getOrder() {
    const orders = await InputView.readMenu(INFO_MESSAGE.ORDER_MENU_INFO);
    this.#counter = new Counter(orders);
    return this.#counter.verifyOrder();
  }

  async run() {
    // await this.#getDate();
    await this.#getOrder();
    this.#counter.getTotalAmountBeforeDiscount();
  }
}

export default App;
