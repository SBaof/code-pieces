const arr = {
	foo: 'foo',
	bar: 'bar',
	baz: 'baz'
};

function getIndex (index) {
	return index;
}

const res = _.times(3, getIndex);
console.log('res: ', res);
