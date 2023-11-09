import { multiply } from '../utils/calculator.js';

class Counter {
  #orders;

  constructor(orders) {
    this.orders = orders;
    this.totalPrice = 0;
  }

  getTotalAmountBeforeDiscount() {
    return this.orders.reduce((acc, order) => {
      const [, quantity, price] = order;
      const accAmount = acc + multiply(price, quantity);
      return accAmount;
    }, this.totalPrice);
  }
}

export default Counter;
