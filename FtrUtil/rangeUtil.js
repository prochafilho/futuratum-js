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
module.exports.doRangesOverlap = doRangesOverlap;


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
module.exports.isSubsumed = isSubsumed;


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
module.exports.subsumedBoundIndices = subsumedBoundIndices;