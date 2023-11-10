import Calender from '../src/components/Calendar.js';

describe('Calender 기능 테스트', () => {
  test.each([
    [1, true],
    [2, true],
    [3, false],
    [4, false],
    [5, false],
    [6, false],
    [7, false],
  ])('주말 확인 테스트', (date, expected) => {
    const calender = new Calender(date);

    expect(calender.isWeekend()).toBe(expected);
  });
});
