function getMinMax(str) {

  let arrNumbers = str.split(' ').filter((element) => {
    return isFinite(element) ? true : false;
  });

  return {
    min: Math.min.apply(null, arrNumbers), 
    max: Math.max.apply(null, arrNumbers)};
}