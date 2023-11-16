import { messageFormat } from '../utils/messageFormat.js';

class CustomError extends Error {
  constructor(message, name) {
    super(messageFormat.error(message));
    this.name = name || this.constructor.name;
  }

  static getDate(message) {
    return new CustomError(message, 'getDateError');
  }

  static getOrder(message) {
    return new CustomError(message, 'getOrderError');
  }
}

export default CustomError;
