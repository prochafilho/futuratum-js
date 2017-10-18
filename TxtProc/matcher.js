// imports
var dictUtil = require('./../FtrUtil/dictUtil.js');


function doRangesOverlap(b0, e0, b1, e1) {
	/*
    b0 and e0 are one pair of start and end boundaries
    b1 and e1 are another pair of start and end boundaries.
    all four parameters are integers

    If the range from b0 to e0 overlaps with the range from b1 to e1
    this method returns True. Otherwise it returns False.

    The following statements are True
    - doRangesOverlap(1, 5, 2, 4)
    - doRangesOverlap(1, 3, 2, 3)

    The following statements are False
    - doRangesOverlap(1, 2, 3, 4)
    - doRangesOverlap(0, 4, 6, 9)
	*/
	if ((b0 <= b1 && b1 <= e0) || (b0 <= e1) && (e1 <= e0)) {
		return true;
	}
	return false;
}


function isSubsumed(b0, e0, b1, e1) {
	if (doRangesOverlap(b0, e0, b1, e1) == false) {
		return false;
	}
	size0 = e0 - b0;
	size1 = e1 - b1;
	if (size0 < size1) {
		return true;
	}
	return false;
}


function subsumedBoundIndices(bnds) {
	/*
    Given a list of integer pairs representing boundaries, find all pair
    indices where the numeric range is completely subsumed by the numeric
    range of another pair in the list.

    :type bnds: array<[int, int,]>
    :rtype: set<int>
	*/
	var indices = new Set();
	for (i = 0; i < bnds.length; i += 1) {
		for (j = 0; j < bnds.length; j += 1) {
			if (i == j) {
				continue;
			}
			if (isSubsumed(bnds[i][0], bnds[i][1], bnds[j][0], bnds[j][1])) {
				indices.add(i);
			}
			else if (
				isSubsumed(bnds[j][0], bnds[j][1], bnds[i][0], bnds[i][1])
			) {
				indices.add(j);
			}
		}
	}
	return indices;
}


function arraysEqual(a, b) {
	if (a === b) {
		return true;
	}
	if (a == null || b == null) {
		return false;
	}
	if (a.length != b.length) {
		return false;
	}
	for (var i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}


function matchBounds(tkns, ngramCandidatesOnStart, keepSubsumed=true) {
	var bnds = [];
	for (i = 0; i < tkns.length; i += 1) {
		if (tkns[i] in ngramCandidatesOnStart == false) {
			continue;
		}
		var candidateNgrams = ngramCandidatesOnStart[tkns[i]];
		var matchNgrams = [];
		for (j = 0; j < candidateNgrams.length; j += 1) {
			if (i + candidateNgrams[j].length - 1 > tkns.length) {
				// ngram length exceeds the remaining length of the
				// token sequence.
				continue;
			}
			var endPt = i + candidateNgrams[j].length;
			var slice = tkns.slice(i, endPt);
			if (arraysEqual(slice, candidateNgrams[j])) {
				matchNgrams.push(candidateNgrams[j])
			}
		}
		
		for (j = 0; j < matchNgrams.length; j += 1) {
			var slice = tkns.slice(i, i + matchNgrams[j].length)
			for (k = 0; k < candidateNgrams.length; k += 1) {
				if (arraysEqual(slice, candidateNgrams[k])) {
					bnds.push( [i, i + candidateNgrams[k].length] )
				}
			}
		}
	}

	if (keepSubsumed == true) {
		return bnds;
	}

	subsumed = subsumedBoundIndices(bnds);
	keeps = [];
	for (i = 0; i < bnds.length; i += 1) {
		if (subsumed.has(i) == false) {
			keeps.push(bnds[i]);
		}
	}
	return keeps;
}


class NgramMatcher {
	constructor(keepSubsumed=true, ngramCandidatesOnStart={}) {
		this.ngramCandidatesOnStart = ngramCandidatesOnStart;
		this.keepSubsumed = keepSubsumed;
	}

	addNgram(ngram) {
		dictUtil.updateListDict(this.ngramCandidatesOnStart, ngram[0], ngram);
	}

	findMatchBnds(tkns) {
		return matchBounds(tkns, this.ngramCandidatesOnStart, this.keepSubsumed);
	}

	findMatches(tkns) {
		var bnds = this.findMatchBnds(tkns);
		//console.log(bnds)
		var matches = [];
		for (i = 0; i < bnds.length; i += 1) {
			matches.push(tkns.slice(bnds[i][0], bnds[i][1]));
		}
		return matches;
	}

}


//Testing code
//	TODO: assertion statements

var d = {
	'omg':[['omg']],
	'bull':[['bull'], ['bull', 'trap']],
};

//console.log(matchBounds(['omg', 'is', 'worth', 'buying'], d));
//console.log(matchBounds(["it's", 'a', 'bull', 'trap', 'now', 'omg'], d));
m = new NgramMatcher(keepSubsumed=true);
m.addNgram(['omg']);
m.addNgram(['bull']);
m.addNgram( ['bull', 'trap'] );

console.log(m.ngramCandidatesOnStart)
//m = new NgramMatcher(keepSubsumed=true, d);
console.log(m.findMatches(['omg', 'is', 'worth', 'buying']));
console.log(m.findMatches(["it's", 'a', 'bull', 'trap', 'now']));

console.log('\n');

m = new NgramMatcher(keepSubsumed=false);
m.addNgram(['omg']);
m.addNgram(['bull']);
m.addNgram( ['bull', 'trap'] );
console.log(m.findMatches(['omg', 'is', 'worth', 'buying']));
console.log(m.findMatches(["it's", 'a', 'bull', 'trap', 'now', 'omg']));
