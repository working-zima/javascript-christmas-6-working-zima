import { Console } from '@woowacourse/mission-utils';
import { MONTARY_UNIT, BENEFIT } from '../constants/messages.js';
import { addCommasToNumber } from '../utils/calculator.js';

const OutputView = {
  printInfo(message) {
    return Console.print(message);
  },

  printOrderMenu(orderMenus) {
    return orderMenus.forEach(orderMenu => {
      Console.print(orderMenu);
    });
  },

  printWithMonetaryUnit(money) {
    return Console.print(`${addCommasToNumber(money)}${MONTARY_UNIT.MONTARY}`);
  },

  printReceiveChampagne(boolean) {
    if (boolean) {
      return Console.print(`${BENEFIT.CHAMPAGNE}`);
    }
    return Console.print(`${BENEFIT.NOTHING}`);
  },

  printBenefitsDetails(string, number) {
    return Console.print(
      `${string}${addCommasToNumber(number)}${MONTARY_UNIT.MONTARY}`,
    );
  },
};

export default OutputView;
