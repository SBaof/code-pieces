const wrapper = document.querySelector('.wrapper');
const item = wrapper.querySelector('.item');
const span = wrapper.querySelector('span');

const size = {
    offsetWidth: item.offsetWidth,
    offsetHeight: item.offsetHeight,
    offsetLeft: item.offsetLeft,
    offsetTop: item.offsetTop,
    offsetParent: item.offsetParent
}
console.log('size: ', size);

// 获取元素在页面中的偏移量
function getElementLeft(element) {
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
    }
    return actualLeft;
}

li = document.querySelector('li');
const liSize = {
    offsetWidth: li.offsetWidth,
    offsetHeight: li.offsetHeight,
    offsetLeft: li.offsetLeft,
    offsetTop: li.offsetTop,
    offsetParent: li.offsetParent
}
console.log('liSize: ', liSize);

function getViewport() {
    if (document.compatMode == 'BackCompat') {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    } else {
        return {
            height: document.documentElement.clientHeight,
            width: document.documentElement.clientWidth
        }
    }
}

const viewport = getViewport();
console.log(viewport);

function getScrolls(element) {
  const ret = {
    scrollHeight: element.scrollHeight,
    scrollWidth: element.scrollWidth,
    scrollTop: element.scrollTop,
    scrollLeft: element.scrollLeft
  }
  console.log(ret);
  return ret;
}

function getScroll() {
  const ret = {
    scrollHeight: this.scrollHeight,
    scrollWidth: this.scrollWidth,
    scrollTop: this.scrollTop,
    scrollLeft: this.scrollLeft
  }
  console.log(ret);
  return ret;
}

const scroll = document.querySelector('.scroll');
const scrolls = getScrolls(scroll);
scroll.onscroll = getScroll();
console.log(scrolls);



function getBoundingClientRect(element) {
    var scrollTop = document.documentElement.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft;
    if (element.getBoundingClientRect) {
        GetBoundingClientRectExample.htm
        if (typeof arguments.callee.offset != "number") {
            var temp = document.createElement("div");
            temp.style.cssText = "position:absolute;left:0;top:0;";
            document.body.appendChild(temp);
            arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
            document.body.removeChild(temp);
            temp = null;
        }
        var rect = element.getBoundingClientRect();
        var offset = arguments.callee.offset;
        return {
            left: rect.left + offset,
            right: rect.right + offset,
            top: rect.top + offset,
            bottom: rect.bottom + offset
        };
    } else {
        var actualLeft = getElementLeft(element);
        var actualTop = getElementTop(element);
        return {
            left: actualLeft - scrollLeft,
            right: actualLeft + element.offsetWidth - scrollLeft,
            top: actualTop - scrollTop,
            bottom: actualTop + element.offsetHeight - scrollTop
        }
    }
}