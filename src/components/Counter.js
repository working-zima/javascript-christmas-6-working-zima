import { BENEFIT_MIN_AMOUNT } from '../constants/magicNumber.js';
import { MENU_LISTS, DELIMITER, DRINKS } from '../constants/menu.js';
import { multiply, subtract } from '../utils/calculator.js';
import { INFO_MESSAGE, BENEFIT } from '../constants/messages.js';

class Counter {
  constructor(orders) {
    this.orders = orders;
    this.orderInfo = [];
    this.totalPrice = 0;
  }

  static splitMenu(orders) {
    return orders.split(DELIMITER.MENU).map(order => {
      return order.split(DELIMITER.QUANTITY);
    });
  }

  verifyOrder() {
    const splitedOrders = Counter.splitMenu(this.orders);
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
    if (this.totalPrice >= BENEFIT_MIN_AMOUNT.CHAMPAGNE) return true;
    return false;
  }

  countDessertsOrMainDishes(categories) {
    return this.orderInfo.reduce((total, [, quantity, menuCategories]) => {
      return total + (menuCategories === categories ? Number(quantity) : 0);
    }, 0);
  }

  isTotalAmountAboveThreshold() {
    return this.totalPrice >= BENEFIT_MIN_AMOUNT.TOTAL;
  }

  calculateTotalAmountAfterBenefits(totalBenefits) {
    if (this.canReceiveChampagne) {
      return subtract(this.totalPrice, subtract(totalBenefits, DRINKS.샴페인));
    }
    return subtract(this.totalPrice, totalBenefits);
  }

  static caculateEventBadge(totalBenefits) {
    if (totalBenefits >= 20000) return BENEFIT.SANTA;
    if (totalBenefits >= 10000) return BENEFIT.TREE;
    if (totalBenefits >= 5000) return BENEFIT.STAR;
    return BENEFIT.NOTHING;
  }
}

export default Counter;
