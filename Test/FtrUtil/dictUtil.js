var dictUtil = require('./../../FtrUtil/dictUtil.js');

function testUpdateListDict() {
	var d = {};
	dictUtil.updateListDict(d, 'x', 1);

	if ('x' in d == false || d['x'][0] != 1 || d['x'].length != 1) {
		return false;
	}

	dictUtil.updateListDict(d, 'x', 2);

	if (
		'x' in d == false ||
		d['x'][0] != 1 ||
		d['x'].length != 2 ||
		d['x'][1] != 2
	) {
		return false;
	}

	dictUtil.updateListDict(d, 'y', 3);

	if (
		'x' in d == false ||
		d['x'][0] != 1 ||
		d['x'].length != 2 ||
		d['x'][1] != 2 ||
		d['y'][0] != 3 ||
		d['y'].length != 1
	){
		return false;
	}
	return true;
}

// true if pass, false if fail
console.log(testUpdateListDict());
