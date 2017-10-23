const { Pool } = require('pg');

// Make sure you have set these env vars to the correct values.
// Otherwise this won't work.
var cnx = {
	user: process.env.FUTR_DB_USER,
	host: process.env.FUTR_DB_HOST,
	database: process.env.FUTR_DB_NAME,
	password: process.env.FUTR_DB_PASS,
	port: process.env.FUTR_DB_PORT
};

var pool = new Pool(cnx);
var globalOut;

async function getRowsFromStmt(stmt) {
		const results = await pool.query(stmt)
    return results
}

async function demo() {
	const query = await getRowsFromStmt('SELECT * FROM ASSET;')
  globalOut = query
  console.log(query)
}

demo();

module.exports.cnx = cnx;
module.exports.getRowsFromStmt = getRowsFromStmt;
