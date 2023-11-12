import Counter from '../src/components/Counter';

describe('Counter 기능 테스트', () => {
  const order1 = '타파스 - 1,제로콜라 - 1';
  const order2 = '티본스테이크 - 1,바비큐립 - 1,초코케이크 - 2,제로콜라 - 1';
  const cost1 = 8500;
  const cost2 = 142000;

  test.each([
    [order1, cost1],
    [order2, cost2],
  ])('할인 전 총주문 금액', (orders, expected) => {
    const counter = new Counter(orders);
    counter.verifyOrder();

    const totalAmount = counter.getTotalAmountBeforeDiscount();

    expect(totalAmount).toBe(expected);
  });

  test.each([
    [order1, false],
    [order2, true],
  ])('샴페인 증정 이벤트', (order, expected) => {
    const counter = new Counter(order);
    counter.verifyOrder();
    counter.getTotalAmountBeforeDiscount();

    const canReceiveChampagne = counter.canReceiveChampagne();

    expect(canReceiveChampagne).toBe(expected);
  });
});
