import { Console } from '@woowacourse/mission-utils';
import { MONTARY_UNIT } from '../constants/messages.js';

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
};

export default OutputView;
