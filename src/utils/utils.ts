/* eslint-disable function-paren-newline */
/* eslint-disable space-before-function-paren */
export const debounce = function <T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timeoutID: undefined | number;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as T;
};

export const hetoFixedlpFunc = function (x: any): number {
  let result = x;
  if (Math.abs(result) < 1.0) {
    const e = parseInt(result.toString().split('e-')[1], 10);
    if (e) {
      result *= 10 ** (e - 1);
      result = `0.${new Array(e).join('0')}${result.toString().substring(2)}`;
    }
  } else {
    let e = parseInt(x.toString().split('+')[1], 10);
    if (e > 20) {
      e -= 20;
      result /= 10 ** e;
      result += new Array(e + 1).join('0');
    }
  }
  return result;
};
