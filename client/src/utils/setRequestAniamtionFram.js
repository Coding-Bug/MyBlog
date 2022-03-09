export default function(){
     // 创建兼容动画
     let requestAniamtionFram =
     window.requestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function (callback) {
       // 实在不兼容就用settimeout
       window.setTimeout(callback, 1000 / 60);
     };
 
     window.requestAnimationFrame = requestAniamtionFram;
}