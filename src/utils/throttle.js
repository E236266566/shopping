export const throttle = function throttle(fn, wait) {
  let timer = undefined;
  let lastCallTime = Date.now();
  return function() {
    const timeSinceLastCall = Date.now() - lastCallTime;
    const shouldCall = timeSinceLastCall >= wait;
    if (shouldCall) {
      const args = arguments;
      timer = setTimeout((fn.apply(this, args), (timer = undefined)), wait);
      lastCallTime = Date.now();
    }
  };
}
