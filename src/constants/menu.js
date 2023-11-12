export const APPETIZERS = Object.freeze({
  양송이수프: 6000,
  타파스: 5500,
  시저샐러드: 8000,
});

export const MAIN_DISHES = Object.freeze({
  티본스테이크: 55000,
  바비큐립: 54000,
  해산물파스타: 35000,
  크리스마스파스타: 25000,
});

export const DESSERTS = Object.freeze({
  초코케이크: 15000,
  아이스크림: 5000,
});

export const DRINKS = Object.freeze({
  제로콜라: 3000,
  레드와인: 60000,
  샴페인: 25000,
});

export const MENU_CATEGORIES = Object.freeze({
  양송이수프: ['APPETIZERS', APPETIZERS.양송이수프],
  타파스: ['APPETIZERS', APPETIZERS.타파스],
  시저샐러드: ['APPETIZERS', APPETIZERS.시저샐러드],
  티본스테이크: ['MAIN_DISHES', MAIN_DISHES.티본스테이크],
  바비큐립: ['MAIN_DISHES', MAIN_DISHES.바비큐립],
  해산물파스타: ['MAIN_DISHES', MAIN_DISHES.해산물파스타],
  크리스마스파스타: ['MAIN_DISHES', MAIN_DISHES.크리스마스파스타],
  초코케이크: ['DESSERTS', DESSERTS.초코케이크],
  아이스크림: ['DESSERTS', DESSERTS.아이스크림],
  제로콜라: ['DRINKS', DRINKS.제로콜라],
  레드와인: ['DRINKS', DRINKS.레드와인],
  샴페인: ['DRINKS', DRINKS.샴페인],
});

export const DELIMITER = Object.freeze({
  MENU: ' - ',
});
