// 引入节流函数
import {throttle} from "./throttle";
// 为滚动到最低端添加事件
let scollMore = function (fun) {
  // 防止立即调用
  let scrollY = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条在Y轴滚动距离
  let vh =
    document.compatMode === "CSS1Compat"
      ? document.documentElement.clientHeight
      : document.body.clientHeight; // 页面的可视高度
  let allHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  ); // 页面的总高度
  if (scrollY + vh >= allHeight) {
    fun();
  }
};


let callback
// 暴露添加事件
let addScollEvent = function (fn) {
  // 要执行的函数添加
  let throttleFn = throttle(fn,2000)

  // 定义函数，可以传参并且能销毁回调
  callback = function(){
    scollMore(throttleFn)
  }
  window.addEventListener("scroll", callback); 
};

// 删除事件,在离开组件的时候及时删除
let deleteScollEvent = function(){
  window.removeEventListener('scroll',callback)
}
export { addScollEvent,deleteScollEvent };
