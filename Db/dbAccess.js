// var pg = require('pg');
const { Pool } = require('pg');


// Make sure you have set these env vars to the correct values.
// Otherwise this won't work.
const cnx = {
	user: process.env.FUTR_DB_USER,
	host: process.env.FUTR_DB_HOST,
	database: process.env.FUTR_DB_NAME,
	password: process.env.FUTR_DB_PASS,
	port: process.env.FUTR_DB_PORT
};

let globalOut;

function getRowsFromStmt(stmt) {
	// var pool = pg.Pool(cnx);
	const pool = new Pool(cnx);
	
	// return pool.query(
	// 	stmt,
	// 	(err, res) => {
	// 	  console.log('res', res);
	// 		pool.end();
	// 		return res;
	//   });

	pool.query(stmt, (err, result) => {
	  if (err) {
	    return console.error('Error executing query', err.stack);
	  }
	  console.log('result', result);
	});
}

function demo() {
	getRowsFromStmt('SELECT * FROM ASSET;');
	console.log('globalOut =', globalOut);
}

demo();

module.exports.cnx = cnx;
module.exports.getRowsFromStmt = getRowsFromStmt;
