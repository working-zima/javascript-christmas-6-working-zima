import Calendar from '../src/components/Calendar.js';
import { DISCOUNT_DAY } from '../src/constants/magicNumber.js';

describe('Calendar 클래스', () => {
  describe('isWeekend 메서드', () => {
    // given
    const week = [
      { date: 1, expected: true },
      { date: 2, expected: true },
      { date: 3, expected: false },
      { date: 4, expected: false },
      { date: 5, expected: false },
      { date: 6, expected: false },
      { date: 7, expected: false },
    ];
    test.each(week)(
      '인자로 금요일, 토요일에 해당하는 날짜가 주어진 경우, true를 반환한다.',
      ({ date, expected }) => {
        // when
        const calendar = new Calendar(date);

        // then
        expect(calendar.isWeekend()).toBe(expected);
      },
    );
  });

  describe('isSpecialDiscountDay 메서드', () => {
    // given
    const specialDays = [
      { date: 1, expected: false },
      { date: 3, expected: true },
      { date: 10, expected: true },
      { date: 17, expected: true },
      { date: 24, expected: true },
      { date: 25, expected: true },
      { date: 31, expected: true },
    ];

    test.each(specialDays)(
      '인자로 3, 10, 17, 24, 25, 31이 주어진 경우, true를 반환한다.',
      ({ date, expected }) => {
        // when
        const calendar = new Calendar(date);
        const isSpecialDay = calendar.isSpecialDiscountDay();

        // then
        expect(isSpecialDay).toBe(expected);
      },
    );
  });

  describe('isChristmasDiscountAvailable 메서드', () => {
    // given
    const dates = [
      { date: 1, expected: true },
      { date: 25, expected: true },
      { date: 26, expected: false },
      { date: 31, expected: false },
    ];

    // when
    test.each(dates)(
      '인자로 25이하의 숫자가 주어진 경우, true를 반환한다.',
      ({ date, expected }) => {
        // when
        const calendar = new Calendar(date);
        const christmasDiscountAvailable =
          calendar.isChristmasDiscountAvailable();

        // then
        expect(christmasDiscountAvailable).toBe(expected);
      },
    );
  });

  describe('getOrderDate 메서드', () => {
    // given
    const dates = [1, 2, 3, 4, 5, 6, 31];

    test.each(dates)(
      '인자로 특정 날짜가 주어진 경우, "12월 특정 날짜일"을 반환한다.',
      date => {
        // when
        const calendar = new Calendar(date);
        const orderDate = calendar.getOrderDate();

        // then
        expect(orderDate).toBe(`${DISCOUNT_DAY.MONTH + 1}월 ${date}일`);
      },
    );
  });

  describe('calculateChristmasDiscount 메서드', () => {
    // given
    const christmasDiscountAmount = [
      { date: 1, expected: 1000 },
      { date: 2, expected: 1100 },
      { date: 25, expected: 3400 },
      { date: 31, expected: 0 },
    ];

    test.each(christmasDiscountAmount)(
      '인자로 1부터 25까지 가까워지는 숫자가 주어진 경우, 1,000원으로 시작하여 100원씩 증가된 숫자를 반환한다.',
      ({ date, expected }) => {
        // when
        const calendar = new Calendar(date);
        const discountedAmount = calendar.calculateChristmasDiscount();

        // then
        expect(discountedAmount).toBe(expected);
      },
    );
  });
});
