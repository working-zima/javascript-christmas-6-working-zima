import { GIFT_MIN_AMOUNT } from '../constants/magicNumber.js';
import { MENU_CATEGORIES, DELIMITER } from '../constants/menu.js';
import { multiply } from '../utils/calculator.js';

class Counter {
  #orders;

  constructor(orders) {
    this.#orders = orders;
    this.orderInfo = [];
    this.totalPrice = 0;
  }

  verifyOrder() {
    const splitedOrders = this.#orders
      .split(',')
      .map(order => order.split(DELIMITER.MENU));
    return this.checkCategoriesAndPrice(splitedOrders);
  }

  checkCategoriesAndPrice(splitedOrders) {
    this.orderInfo = splitedOrders.map(([order, quantity]) => {
      return [order, quantity, ...MENU_CATEGORIES[order]];
    });
    return null;
  }

  getTotalAmountBeforeDiscount() {
    this.totalPrice = this.orderInfo.reduce((acc, order) => {
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
