import { Console } from '@woowacourse/mission-utils';
import { MONTARY_UNIT, BENEFIT } from '../constants/messages.js';

const OutputView = {
  printInfo(message) {
    Console.print(message);
  },

  printOrderMenu(orderMenus) {
    orderMenus.forEach(orderMenu => {
      Console.print(orderMenu);
    });
  },

  printWithMonetaryUnit(money) {
    Console.print(
      `${money.toLocaleString(MONTARY_UNIT.COUNTRY)}${MONTARY_UNIT.MONTARY}`,
    );
  },

  printReceiveChampagne(boolean) {
    if (boolean) {
      return Console.print(`${BENEFIT.CHAMPAGNE}`);
    }
    return Console.print(`${BENEFIT.NOTHING}`);
  },
};

export default OutputView;
