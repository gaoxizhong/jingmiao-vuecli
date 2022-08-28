(function (doc, win) {
  var wW = window.innerWidth; // 当前窗口的宽度

  var whdef = 20 / 1920; // 表示1920的设计图,1rem == 20px 其他值都可以
  // var wH = window.innerHeight;// 当前窗口的高度
  var rem = wW * whdef; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
  document.getElementsByTagName("html")[0].style.fontSize = rem + 'px';
  console.log(wW)
})(document, window);
