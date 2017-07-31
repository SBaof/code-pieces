$("#JtoThree").on('click', function () {

	$("html, body")
		.animate({scrollTop: $("#item-three").offset().top}, 1000);
});


$("#btnToTop").click(function() {
	$("html, body").animate({scrollTop: 0}, 1000);
});

$("#toBottom").click(() => {
	var pos = $("#btnToTop").offset().top;
	$("html, body").animate({scrollTop: pos}, 1000);
})

const toBottom = document.querySelector('#toBtm');
const bottom = document.querySelector('#btnToTop');
const body = document.querySelector('body');
const toTopByJs = document.querySelector('#toTopByJs');

function toBottomByJs () {
	var pos = bottom.offsetTop;
	var innerHeight = window.innerHeight;
	var length = pos - innerHeight;
	var step = 0;
	var scrolled = body.scrollTop;
	var timer = setInterval(function() {
		scrolled = body.scrollTop;
		if (scrolled < length) {
			window.scroll(0, step += 100);
		} else {
			clearInterval(timer);
		}
	}, 20);
}

toBottom.addEventListener('click', toBottomByJs);

function goToTopByJs() {
	var left = body.scrollTop;
	var step = left;
	var timer = setInterval(() => {
		left = body.scrollTop;
		if (left > 0) {
			window.scroll(0, step -= 100);
		} else {
			clearInterval(timer);
		}
	}, 20);
}

toTopByJs.addEventListener('click', goToTopByJs);



