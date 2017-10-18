var arrayUtil = require('./../../FtrUtil/arrayUtil.js');
var matcher = require('./../../TxtProc/matcher.js');

function testNgramMatcher() {
	var valid = false;
	var m = new matcher.NgramMatcher(keepSubsumed=true);
	m.addNgram(['omg']);
	m.addNgram(['bull']);
	m.addNgram(['bull', 'trap']);

	matches = m.findMatches(['omg', 'is', 'worth', 'buying']);
	if (
		matches.length != 1 |
		arrayUtil.arraysEqual(matches[0], ['omg']) == false
	) {
		return false;
	}

	matches = m.findMatches(["it's", 'a', 'bull', 'trap', 'now']);
	if (matches.length != 2) {
		return false;
	}

	if (
		arrayUtil.arraysEqual(matches[0], ['bull']) &&
		arrayUtil.arraysEqual(matches[1], ['bull', 'trap'])
	) {
		valid = true;
	}
	else if (
		arrayUtil.arraysEqual(matches[0], ['bull', 'trap']) &&
		arrayUtil.arraysEqual(matches[1], ['bull'])
	) {
		valid = true;
	}

	if (valid == false) {
		return false;
	}

	m = new matcher.NgramMatcher(keepSubsumed=false);
	m.addNgram(['omg']);
	m.addNgram(['bull']);
	m.addNgram(['bull', 'trap']);

	matches = m.findMatches(['omg', 'is', 'worth', 'buying']);

	if (
		matches.length != 1 |
		arrayUtil.arraysEqual(matches[0], ['omg']) == false
	) {
		return false;
	}

	matches = m.findMatches(["it's", 'a', 'bull', 'trap', 'now']);

	if (
		matches.length != 1 |
		arrayUtil.arraysEqual(matches[0], ['bull', 'trap']) == false
	) {
		return false;
	}
	return true;
}

console.log(testNgramMatcher());
