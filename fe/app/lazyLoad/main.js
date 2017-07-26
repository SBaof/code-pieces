document.querySelector('button').addEventListener('click', loadImage);

const wrapper = document.querySelector('.wrapper');
function generateImage () {
	const image = document.createElement('img');
	image.setAttribute('src', 'http://via.placeholder.com/350x150')
	image.dataset.src = 'http://lorempixel.com/400/200/';
	return image;
}

for (var i = 0; i < 100; i++) {
	var image = generateImage();
	wrapper.appendChild(image);
}

var winHeight = screen.availHeight;

const images = Array.from(document.querySelectorAll('img'));

function loadImage() {
	var nowHeight = document.body.scrollTop || document.documentElement.scrollTop;
	console.log('nowHeight: ', nowHeight, ' winHeight: ', winHeight);
	if (images.length > 0) {
		images.map((image, index) => {
			if (nowHeight + winHeight > image.offsetTop) {
				image.src = image.dataset.src;
				images.splice(index, 1);
			}
		})
	} else {
		window.removeEventListener('scroll', load);
	}
}

function _now() {
	return new Date();
}

//参考 `underscore` 的源码
var throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 上次执行时间点
    var previous = 0;
    if (!options) options = {};
    // 延迟执行函数
    var later = function() {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false ? 0 : _now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = _now();
        // var now = new Date();
        // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
        if (!previous && options.leading === false) previous = now;
        // 延迟执行时间间隔
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
            //如果延迟执行不存在，且没有设定结尾边界不执行选项
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

const load = throttle(loadImage, 1000);

window.addEventListener('scroll', load);

