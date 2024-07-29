const mysql = require('mysql2')

const pool = mysql.createPool({
	host: 'mysql-darioakd.alwaysdata.net',
	user: 'darioakd',
	password: 'vetbiDl8]HcY4Sbh',
	database: 'darioakd_matelectricos',
	port: 3306,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

module.exports = {
	conn: pool.promise()
}