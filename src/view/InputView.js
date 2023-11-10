import { Console } from '@woowacourse/mission-utils';

const InputView = {
  async readDate(message) {
    const date = await Console.readLineAsync(message);
    return date;
  },

  async readMenu(message) {
    const menu = await Console.readLineAsync(message);
    return menu;
  },
};
export default InputView;
