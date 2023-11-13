import { Console } from '@woowacourse/mission-utils';
import { validator } from '../utils/validator.js';

const InputView = {
  async readDate(message) {
    const date = await Console.readLineAsync(message);
    validator.validateOrderDate(date);
    return date;
  },

  async readMenu(message) {
    const menu = await Console.readLineAsync(message);
    validator.validateOrderMenu(menu);
    return menu;
  },
};
export default InputView;
