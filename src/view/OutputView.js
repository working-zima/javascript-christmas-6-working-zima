import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printOrderMenu(orderMenus) {
    orderMenus.forEach(orderMenu => {
      Console.print(orderMenu);
    });
  },

  printInfo(message) {
    Console.print(message);
  },
};

export default OutputView;
