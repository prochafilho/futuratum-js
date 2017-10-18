function updateListDict(d, k, v) {
	if (k in d == false) {
		d[k] = [];
	}
	d[k].push(v);
}
module.exports.updateListDict = updateListDict;