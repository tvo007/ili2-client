export const objFromArray = (arr, key = "key") =>
  arr.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
