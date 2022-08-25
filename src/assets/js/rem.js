// 设置基准
const BASE = 20;

(function (doc, win) {
  let docEl = doc.documentElement,
 // orientationchange->手机屏幕转屏事件
     // resize->页面大小改变事件
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',//去windows遍历属性，如果有orientationchange这个属性就用他，没有就用resize
      recall = function () {
          let clientWidth = docEl.clientWidth;//获取到屏幕的宽度
          console.log(clientWidth)
          if (!clientWidth) return;
          docEl.style.fontSize = BASE * (clientWidth / 1920) + 'px';
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recall, false);
// DOMContentLoaded->dom加载完就执行,onload要dom/css/js都加载完才执行
  doc.addEventListener('DOMContentLoaded', recall, false);
})(document, window);
