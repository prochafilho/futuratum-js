
var matcher = require('./../TxtProc/matcher.js');
var m = new matcher.NgramMatcher();
console.log('\
Example:\n\tJanet yellen lives in new york\
\n\tInput ngrams: "janet", "janet yellen", and "new york"'
);
m.addNgram(['janet']);
m.addNgram(['janet', 'yellen']);
m.addNgram(['new', 'york']);
console.log(
	'\tResult: ' +
	m.findMatches(['janet', 'yellen', 'lives', 'in', 'new', 'york'])
);