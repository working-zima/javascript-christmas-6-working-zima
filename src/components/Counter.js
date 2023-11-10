import { multiply } from '../utils/calculator.js';
import { GIFT_MIN_AMOUNT } from '../constants/magicNumber.js';

class Counter {
  #orders;

  constructor(orders) {
    this.orders = orders;
    this.totalPrice = 0;
  }

  getTotalAmountBeforeDiscount() {
    this.totalPrice = this.orders.reduce((acc, order) => {
      const [, quantity, price] = order;
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
