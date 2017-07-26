const button = document.querySelector('button');
const bar = document.querySelector('.bar');
const li = bar.querySelectorAll('li');

button.addEventListener('click', showBar);
bar.classList.add('no-visible');
function showBar() {
  const height = bar.clientHeight;
  const classList = Array.from(bar.classList);
  if (classList.indexOf('no-visible') > 0) {
    bar.classList.remove('no-visible');
    bar.style.transform = `translateY(${-height}px)`;
    button.innerHTML = '🔽';
  } else {
    bar.classList.add('no-visible');
    bar.style.transform = `translateY(0)`;
    button.innerHTML = '🔼';
  }
}

console.log(li);

function show (e, index) {
//   console.log(e);
  console.log(this.dataset.index, this.innerHTML);
}
var i = 0;
li.forEach((item, index) => {
  item.setAttribute('data-index', index);
  item.addEventListener('click', show);
})
