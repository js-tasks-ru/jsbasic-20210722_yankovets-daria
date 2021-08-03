function camelize(str) {
  
  let newArr = str.split('-').map((element, index) => {
    return (index == 0) ? element : (element[0].toUpperCase() + element.slice(1));
  });

  return newArr.join('');
}
