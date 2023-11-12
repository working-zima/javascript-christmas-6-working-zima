import Calendar from '../src/components/Calendar.js';

describe('Calendar 기능 테스트', () => {
  test.each([
    [1, true],
    [2, true],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
  ])('주말 확인', (date, expected) => {
    const calendar = new Calendar(date);

    expect(calendar.isWeekend()).toBe(expected);
  });

  test.each([
    [1, 1000],
    [25, 3400],
    [31, 0],
  ])('크리스마스 디데이 할인율', (date, expected) => {
    const calendar = new Calendar(date);

    const discountedAmount = calendar.calculateChristmasDiscount();

    expect(discountedAmount).toBe(expected);
  });
});
