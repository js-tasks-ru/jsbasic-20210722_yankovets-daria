function showSalary(users, age) {
  let usersArr = users.filter((user) => {
      return user.age <= age ? true: false;
  });

  let usersSalary = usersArr.map((user) => {
    return user.name + ', ' + user.balance;
  });

  return usersSalary.join('\n');
}
