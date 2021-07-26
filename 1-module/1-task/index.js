function factorial(n) {
  let result = n;
  if (n > 0) {
    while (n != 1) {
      result *= --n;
    }
    return result;
  } else if (n == 0) return 1;
  else if (n < 0 ) return;
}
