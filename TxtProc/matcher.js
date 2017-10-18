// imports
var dictUtil = require('./../FtrUtil/dictUtil.js');
var rangeUtil = require('./../FtrUtil/rangeUtil.js');
var arrayUtil = require('./../FtrUtil/arrayUtil.js');


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
			if (arrayUtil.arraysEqual(slice, candidateNgrams[j])) {
				matchNgrams.push(candidateNgrams[j])
			}
		}
		
		for (j = 0; j < matchNgrams.length; j += 1) {
			var slice = tkns.slice(i, i + matchNgrams[j].length)
			for (k = 0; k < candidateNgrams.length; k += 1) {
				if (arrayUtil.arraysEqual(slice, candidateNgrams[k])) {
					bnds.push( [i, i + candidateNgrams[k].length] )
				}
			}
		}
	}

	if (keepSubsumed == true) {
		return bnds;
	}

	subsumed = rangeUtil.subsumedBoundIndices(bnds);
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
		/*
		:type ngram: array<str>
		*/
		dictUtil.updateListDict(this.ngramCandidatesOnStart, ngram[0], ngram);
	}

	findMatchBnds(tkns) {
		/*
		:type tkns: list<str>
		:rtype: list<[int, int]>
		*/
		return matchBounds(tkns, this.ngramCandidatesOnStart, this.keepSubsumed);
	}

	findMatches(tkns) {
		/*
		:type tkns: list<str>
		:rtype: list<str>
		*/
		var bnds = this.findMatchBnds(tkns);
		var matches = [];
		for (i = 0; i < bnds.length; i += 1) {
			matches.push(tkns.slice(bnds[i][0], bnds[i][1]));
		}
		return matches;
	}

}
module.exports.NgramMatcher = NgramMatcher;
