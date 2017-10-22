var pg = require('pg');

function getCnxPool() {
	return new pg.Pool({
		user: process.env.FUTR_DB_USER,
		host: process.env.FUTR_DB_HOST,
		database: process.env.FUTR_DB_NAME,
		password: process.env.FUTR_DB_PASS,
		port: process.env.FUTR_DB_PORT
	});
}

module.exports.getCnxPool = getCnxPool;