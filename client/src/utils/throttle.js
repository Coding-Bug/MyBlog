/**
 * @method 节流函数
 * @param {Function} fun [函数]
 * @param {number} delay [延迟的毫秒数]
 */
const throttle = function(fun, delay) {
  let last = 0;
  return function(...args) {
    let now = +new Date();
    if (now - last > delay) {
        last = now;
        fun.apply(this,args);
    }
  };
}
export {throttle}
