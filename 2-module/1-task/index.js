function sumSalary(salaries) {
  let sum = 0;

  for(let key in salaries) {
    if (isFinite(salaries[key]) && salaries[key] !== NaN)  {
      sum += salaries[key];
    }
  }

  if (sum == 0) {
    return 0;
  }

  return sum;
}
