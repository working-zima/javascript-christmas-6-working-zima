import Counter from '../src/components/Counter';

describe('Counter 테스트', () => {
  test('할인 전 총주문 금액', () => {
    const orders = [
      ['티본스테이크', 1, 55000],
      ['바비큐립', 1, 54000],
      ['초코케이크', 2, 15000],
      ['제로콜라', 1, 3000],
    ];

    const counter = new Counter(orders);

    expect(counter.getTotalAmountBeforeDiscount()).toBe(142000);
  });
});
