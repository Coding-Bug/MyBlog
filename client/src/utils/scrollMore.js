// 引入节流函数
import { debounce } from "./debounce";
// 为滚动到最低端添加事件
let scollMore = function (fun) {
  // 防止立即调用
  let scrollY = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条在Y轴滚动距离
  let vh =
    document.compatMode === "CSS1Compat"
      ? document.documentElement.clientHeight
      : document.body.clientHeight; // 页面的可视高度

  // 取最小值，不然有可能拉不出来
  let allHeight = Math.min(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  ); // 页面的总高度
  
  // 向上取整，不然有可能拉不出来
  if (Math.ceil(scrollY + vh) >= allHeight) {
    fun();
  }
};

let callback;
// 暴露添加事件
let addScollEvent = function (fn, delay = 200) {
  // 定义函数，可以传参并且能销毁回调
  callback = debounce(function () {
    scollMore(fn);
  }, delay);
  window.addEventListener("scroll", callback);
};

// 删除事件,在离开组件的时候及时删除
let deleteScollEvent = function () {
  window.removeEventListener("scroll", callback);
};
export { addScollEvent, deleteScollEvent };
