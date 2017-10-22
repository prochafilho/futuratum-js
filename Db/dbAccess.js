// npm install pg
var pg = require('pg');

// Make sure you have set these env vars to the correct values.
// Otherwise this won't work.
const cnx = {
	user: process.env.FUTR_DB_USER,
	host: process.env.FUTR_DB_HOST,
	database: process.env.FUTR_DB_NAME,
	password: process.env.FUTR_DB_PASS,
	port: process.env.FUTR_DB_PORT
};

module.exports.cnx = cnx


var globalOut = null;
function getRowsFromStmt(stmt) {
	var pool = pg.Pool(cnx)
	pool.query(
		stmt,
		function(error, result) {
			// I was trying to set the global variable globalOut
			// to equal result.rows. However, I think that the
			// async code is out of scope here.
			globalOut = result.rows;
			// Uncomment this to see the output of the query.
			// This is apparantly not the same as variable as
			// globalOut declared above.
			// console.log(globalOut);
		}
	)
}

module.exports.getRowsFromStmt = getRowsFromStmt;


function demo() {
	getRowsFromStmt('SELECT * FROM ASSET;');
	console.log(globalOut);
}

demo();