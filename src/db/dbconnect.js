const mysql = require('mysql2')

const pool = mysql.createPool({
	host: 'monorail.proxy.rlwy.net',
	user: 'root',
	password: 'BTzVPQwwjWiRIFqbWXvCQmrpuCygecTd',
	database: 'railway',
	port: 47643,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

module.exports = {
	conn: pool.promise()
}