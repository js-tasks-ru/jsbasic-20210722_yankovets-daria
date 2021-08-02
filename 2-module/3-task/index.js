let calculator = {
  a: undefined,
  b: undefined,

  read(n, m) {
    this.a = n;
    this.b = m;
  },

  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
