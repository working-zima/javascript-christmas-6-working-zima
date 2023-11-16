import Counter from '../src/components/Counter';
import { MENU_CATEGORIES } from '../src/constants/menu';

describe('Counter 클래스', () => {
  const order1 = '타파스-1,제로콜라-1';
  const order2 = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';

  describe('splitMenu 메서드', () => {
    // given
    const expectedArr1 = [
      ['타파스', '1'],
      ['제로콜라', '1'],
    ];
    const expectedArr2 = [
      ['티본스테이크', '1'],
      ['바비큐립', '1'],
      ['초코케이크', '2'],
      ['제로콜라', '1'],
    ];
    test.each([
      [order1, expectedArr1],
      [order2, expectedArr2],
    ])(
      'Counter 클래스의 인자로 주문 메뉴가 주어진 경우, 쉼표를 기준으로 split된 배열을 반환한다.',
      (orders, expected) => {
        // when
        const arrayedMenu = Counter.splitMenu(orders);

        // then
        expect(arrayedMenu).toEqual(expected);
      },
    );
  });

  describe('getMenuAndQuantity 메서드', () => {
    // given
    const expected1 = ['<주문 메뉴>', '타파스 1개', '제로콜라 1개'];
    const expected2 = [
      '<주문 메뉴>',
      '티본스테이크 1개',
      '바비큐립 1개',
      '초코케이크 2개',
      '제로콜라 1개',
    ];

    test.each([
      [order1, expected1],
      [order2, expected2],
    ])(
      'Counter 클래스의 인자로 주문 메뉴가 주어진 경우, "<주문 메뉴>"와 각각의 메뉴를 "메뉴 개수"의 형식으로 반환한다.',
      (order, expected) => {
        // when
        const counter = new Counter(order);
        counter.verifyOrder();
        const orderMenu = counter.getMenuAndQuantity();

        // then
        expect(orderMenu).toEqual(expected);
      },
    );
  });

  describe('getTotalAmountBeforeDiscount 메서드', () => {
    // given
    const cost1 = 8500;
    const cost2 = 142000;
    test.each([
      [order1, cost1],
      [order2, cost2],
    ])(
      'Counter 클래스의 인자로 주문 메뉴가 주어진 경우, 할인 전 총주문 금액을 반환한다.',
      (orders, expected) => {
        // when
        const counter = new Counter(orders);
        counter.verifyOrder();
        const totalAmount = counter.getTotalAmountBeforeDiscount();

        // then
        expect(totalAmount).toBe(expected);
      },
    );
  });

  describe('canReceiveChampagne 메서드', () => {
    // given
    test.each([
      [order1, false],
      [order2, true],
    ])(
      'Counter 클래스의 인자로 샴페인을 증정 받을 수 있는 주문 메뉴가 주어진 경우, true를 반환한다.',
      (order, expected) => {
        // when
        const counter = new Counter(order);
        counter.verifyOrder();
        counter.getTotalAmountBeforeDiscount();
        const canReceiveChampagne = counter.canReceiveChampagne();

        // then
        expect(canReceiveChampagne).toBe(expected);
      },
    );
  });

  describe('countDessertsOrMainDishes 메서드', () => {
    // given
    test.each([
      [order1, 0],
      [order2, 2],
    ])(
      'Counter 클래스의 인자로 주문 메뉴가 주어진 경우, 디저트 개수를 반환한다.',
      (order, expected) => {
        // when
        const counter = new Counter(order);
        counter.verifyOrder();
        const dessertsNum = counter.countDessertsOrMainDishes(
          MENU_CATEGORIES.DESSERTS,
        );

        // then
        expect(dessertsNum).toEqual(expected);
      },
    );

    // given
    test.each([
      [order1, 0],
      [order2, 2],
    ])(
      'Counter 클래스의 인자로 주문 메뉴가 주어진 경우, 메인 개수를 반환한다.',
      (order, expected) => {
        // when
        const counter = new Counter(order);
        counter.verifyOrder();
        const MainDishesNum = counter.countDessertsOrMainDishes(
          MENU_CATEGORIES.MAIN_DISHES,
        );

        // then
        expect(MainDishesNum).toEqual(expected);
      },
    );
  });

  describe('isTotalAmountAboveThreshold 메서드', () => {
    // given
    test.each([
      [order1, false],
      [order2, true],
    ])(
      'Counter 클래스의 인자로 총주문 금액이 10,000원 이상인 주문 메뉴가 주어진 경우, true를 반환한다.',
      (order, expected) => {
        // when
        const counter = new Counter(order);
        counter.verifyOrder();
        counter.getTotalAmountBeforeDiscount();
        const totalAmountAboveThreshold = counter.isTotalAmountAboveThreshold();

        // then
        expect(totalAmountAboveThreshold).toEqual(expected);
      },
    );
  });

  describe('caculateEventBadge 메서드', () => {
    // given
    test.each([
      [1000, '없음'],
      [5000, '별'],
      [10000, '트리'],
      [20000, '산타'],
    ])(
      '인자로 총혜택 금액이 주어진 경우, 총혜택 금액에 따라 다른 이벤트 배지를 반환한다.',
      (totalBenefits, expected) => {
        // when
        const eventBadge = Counter.caculateEventBadge(totalBenefits);

        // then
        expect(eventBadge).toBe(expected);
      },
    );
  });
});
