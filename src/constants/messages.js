import { DISCOUNT_DAY } from './magicNumber.js';

export const INFO_MESSAGE = Object.freeze({
  VISITING_DATE_ASK:
    '안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  ORDER_MENU_ASK:
    '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
  EVENT_PREVIEW: '우테코 식당에서 받을 이벤트 혜택 미리 보기!\n',
  ORDER_MENU: '<주문 메뉴>',
  TOTAL_AMOUNT_BEFORE_DISCOUNT: '\n<할인 전 총주문 금액>',
  GIFT_MENU: '\n<증정 메뉴>',
  BENEFITS_DETAILS: '\n<혜택 내역>',
  TOTAL_BENEFITS: '\n<총혜택 금액>',
  TOTAL_AMOUNT_AFTER_BENEFITS: '\n<할인 후 예상 결제 금액>',
  EVENT_BADGE: `\n<${DISCOUNT_DAY.MONTH + 1}월 이벤트 배지>`,
});

export const MONTARY_UNIT = Object.freeze({
  COUNTRY: 'ko-KR',
  MONTARY: '원',
});

export const BENEFIT = Object.freeze({
  NOTHING: '없음',
  CHAMPAGNE: '샴페인 1개',
  CHRISTMAS_D_DAY: '크리스마스 디데이 할인: -',
  WEEKDAY: '평일 할인: -',
  WEEKEND: '주말 할인: -',
  SPECIAL: '특별 할인: -',
  GIFT: '증정 이벤트: -',
  SANTA: '산타',
  TREE: '트리',
  STAR: '별',
});

export const ERROR_MESSAGE = Object.freeze({
  DATE: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  ORDER: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});
