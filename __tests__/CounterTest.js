import Counter from '../src/components/Counter';

describe('Counter 기능 테스트', () => {
  const order1 = [
    ['티본스테이크', 1, 55000],
    ['바비큐립', 1, 54000],
    ['초코케이크', 2, 15000],
    ['제로콜라', 1, 3000],
  ];
  const order2 = [
    ['타파스', 1, 5500],
    ['제로콜라', 1, 3000],
  ];

  test('할인 전 총주문 금액', () => {
    const counter = new Counter(order1);

    expect(counter.getTotalAmountBeforeDiscount()).toBe(142000);
  });

  test.each([
    [true, [order1]],
    [false, [order2]],
  ])('샴페인 증정 이벤트', (expected, [order]) => {
    const counter = new Counter(order);
    counter.getTotalAmountBeforeDiscount();

    expect(counter.canReceiveChampagne()).toBe(expected);
  });
});
