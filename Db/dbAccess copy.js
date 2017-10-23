// var pg = require('pg');
const { Pool } = require('pg');
const Promise = require('bluebird')
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

function updateGlobal(result) {
	globalOut = result;
}

function handleResult(resolve) {
	pool.query(
		stmt,
		(err, res) => {
			return resolve(res);
		}
	)
}

/*
function (resolve, reject) {
	pool.query(stmt, (err, result) {
		if (err) return reject(err) return resolve(result)
	})
}
*/

function getRowsFromStmt(stmt) {
	// var pool = pg.Pool(cnx);
	//
	// return pool.query(
	// 	stmt,
	// 	(err, res) => {
	// 	  console.log('res', res);
	// 		pool.end();
	// 		return res;
	//   });
	return new Promise(function (resolve, reject) {
		pool.query(stmt, (err, result) => {
			if (err) {
				return reject(err);
			}
			else {
				return resolve(result);
			}
		})
	});
	/*
	pool.query(stmt, (err, result) => {
	  if (err) {
	    return console.error('Error executing query', err.stack)
	  }
	  console.log('INTERNAL');
	  //console.log('result', result);
	  updateGlobal(globalOut);
	  console.log('EXITINTERNAL');
	});
	*/
}

function demo() {
	getRowsFromStmt('SELECT * FROM ASSET;').then(
		function(result) {
			globalOut=result;
			return result;
		}
	).then(console.log(globalOut))
	console.log(globalOut);
}

demo();

module.exports.cnx = cnx;
module.exports.getRowsFromStmt = getRowsFromStmt;