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

  // 티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1

  async getOrder() {
    const orders = await InputView.readMenu(INFO_MESSAGE.ORDER_MENU_INFO);
    this.verifyOrder(orders);
  }

  verifyOrder(orders) {
    const splitedOrders = orders.split(',').map(order => order.split('-'));
    this.checkCategoriesAndPrice(splitedOrders);
  }

  checkCategoriesAndPrice(splitedOrders) {
    this.#orders = splitedOrders.map(([order, quantity]) => {
      return [order, quantity, ...MENU_CATEGORIES[order]];
    });
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
