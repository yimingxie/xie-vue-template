/**
 * 数字自增
 * @param targetEle
 * @param options
 */

const numAutoPlus = (targetEle, options) => {
  options = options || {};

  var $this = document.getElementById(targetEle),
    time = options.time || $this.data('time'), //总时间--毫秒为单位
    finalNum = options.num || $this.data('value'), //要显示的真实数值
    regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度

    step = finalNum / (time / regulator), //每30ms增加的数值
    count = 0, //计数器
    initial = 0;

  var timer = setInterval(function () {

    count = count + step;

    if (count >= finalNum) {
      clearInterval(timer);
      count = finalNum;
    }
    //t未发生改变的话就直接返回
    //避免调用text函数，提高DOM性能
    var t = Math.floor(count);
    if (t == initial) return;

    initial = t;

    $this.innerHTML = initial;
  }, 30);
}

export default numAutoPlus
