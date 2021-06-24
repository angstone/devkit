/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isBoolean = (test: any): boolean => {
  return (
    test === true ||
    test === false ||
    test === 1 ||
    test === 0 ||
    test === 'true' ||
    test === 'false' ||
    test === '1' ||
    test === '0'
  );
};

export const isNumber = (test: any): boolean => {
  return !isNaN(+test);
};

export const isFunction = (test: any): boolean => {
  return test && {}.toString.call(test) === '[object Function]';
};

export const isTools = {
  isBoolean,
  isFunction,
  isNumber
};
