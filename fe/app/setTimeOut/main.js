const div = document.getElementById("myDiv");

if (!div.style.left) {
  div.style.left = '0px';
}

if (!div.style.top) {
  div.style.top = '0px';
}

function towards(direction, speed) {
  setTimeout(function() {
    let length = parseInt(div.style[direction]) + 1;
    // console.log('dir: ', div.style[direction], length);
    div.style[direction]= length + 'px';
    if (length < 200) {
      setTimeout(arguments.callee, 10);
    }
  }, 10);
}

setTimeout(function() {

  if (parseInt(div.style.left) < 200) {
    console.log('1');
    towards('left');
  } else {
    console.log('2');
    towards('top');
  }

  if (parseInt(div.style.left) < 200 && parseInt(div.style.top) == 0) {
    setTimeout(arguments.callee, 10);
  }

}, 10);



