import { GIFT_MIN_AMOUNT } from '../constants/magicNumber.js';
import { MENU_LISTS, DELIMITER, MENU_CATEGORIES } from '../constants/menu.js';
import { multiply } from '../utils/calculator.js';
import { INFO_MESSAGE } from '../constants/messages.js';

class Counter {
  constructor(orders) {
    this.orders = orders;
    this.orderInfo = [];
    this.totalPrice = 0;
  }

  verifyOrder() {
    const splitedOrders = this.orders.split(DELIMITER.MENU).map(order => {
      return order.split(DELIMITER.QUANTITY);
    });
    return this.checkCategoriesAndPrice(splitedOrders);
  }

  checkCategoriesAndPrice(splitedOrders) {
    this.orderInfo = splitedOrders.map(([order, quantity]) => {
      return [order, quantity, ...MENU_LISTS[order]];
    });
    return null;
  }

  getMenuAndQuantity() {
    const orderMenu = this.orderInfo.map(([order, quantity]) => {
      return `${order} ${quantity}개`;
    });
    return [INFO_MESSAGE.ORDER_MENU, ...orderMenu];
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

  countDesserts() {
    return this.orderInfo.filter(order => order[2] === MENU_CATEGORIES.DESSERTS)
      .length;
  }

  countMainDishes() {
    return this.orderInfo.filter(
      order => order[2] === MENU_CATEGORIES.MAIN_DISHES,
    ).length;
  }
}

export default Counter;
