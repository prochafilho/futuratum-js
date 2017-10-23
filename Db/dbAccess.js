var syncSql = require('sync-sql');
var pgFmt = require('pg-format');

// Make sure you have set these env vars to the correct values.
// Otherwise this won't work.
var cnx = {
	user: process.env.FUTR_DB_USER,
	host: process.env.FUTR_DB_HOST,
	database: process.env.FUTR_DB_NAME,
	password: process.env.FUTR_DB_PASS,
	port: process.env.FUTR_DB_PORT
};


function getRowsFromStmt(stmt) {
	var output = syncSql.pg(cnx, stmt);
	if (output.success == false) {
		throw Error(JSON.stringify(output));
	}
	return output.data.rows;
}


function mkInsertManyStmt(stmt, rows) {
	/*
	:param stmt: SQL statement in the following format
		1.) INSERT INTO X (c0, c1) VALUES %L;
		2.) INSERT INTO myTable (col1, col2, col3) VALUES %L
	:type rows: array<array>
	:param rows: 2d array. The number of columns must be equal
		to the number of column values inserted per row by the 
		SQL statment.
	*/
	if (
		stmt.startsWith('INSERT') == false ||
		stmt.indexOf('VALUES') == -1
	) {
		throw Error('\
			stmt: ' + stmt + ' does not appear to be a valid INSERT statment.\
		');
	}
	return pgFmt(stmt, rows);
}


function insertMany(stmt, rows) {
	/*
	See parameter descriptions for mkInsertManyStmt
	*/
	var output = syncSql.pg(cnx, mkInsertManyStmt(stmt, rows));
	if (output.success == false) {
		throw Error(JSON.stringify(output));
	}
}


module.exports.cnx = cnx;
module.exports.getRowsFromStmt = getRowsFromStmt;
module.exports.mkInsertManyStmt = mkInsertManyStmt;
module.exports.insertMany = insertMany;