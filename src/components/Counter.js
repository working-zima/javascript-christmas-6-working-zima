import { GIFT_MIN_AMOUNT } from '../constants/magicNumber.js';
import { INFO_MESSAGE } from '../constants/messages.js';
import { MENU_CATEGORIES } from '../constants/menu.js';
import { multiply } from '../utils/calculator.js';
import InputView from '../view/InputView.js';

class Counter {
  #orders;

  constructor() {
    this.totalPrice = 0;
  }

  async getOrder() {
    const orders = await InputView.readMenu(INFO_MESSAGE.ORDER_MENU_INFO);
    return this.verifyOrder(orders);
  }

  verifyOrder(orders) {
    const splitedOrders = orders.split(',').map(order => order.split('-'));
    return this.checkCategoriesAndPrice(splitedOrders);
  }

  checkCategoriesAndPrice(splitedOrders) {
    this.#orders = splitedOrders.map(([order, quantity]) => {
      return [order, quantity, ...MENU_CATEGORIES[order]];
    });
    return null;
  }

  getTotalAmountBeforeDiscount() {
    this.totalPrice = this.orders.reduce((acc, order) => {
      const [, quantity, , price] = order;
      const accAmount = acc + multiply(price, quantity);
      return accAmount;
    }, this.totalPrice);
    return this.totalPrice;
  }

  canReceiveChampagne() {
    if (this.totalPrice >= GIFT_MIN_AMOUNT.CHAMPAGNE) return true;
    return false;
  }
}

export default Counter;
