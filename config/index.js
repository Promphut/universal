const config = {
	development : {
		PID:'11',
		DOMAIN: 		'localhost',
		FRONTURL: 		'http://localhost:3000',
		BACKURL: 		'http://localhost:4000'
	},
	production : {
		PID:'11',
		DOMAIN: 		'localhost',
		FRONTURL: 		'http://localhost:3000',
		BACKURL: 		'http://localhost:4000'
	}
}

module.exports = config[process.env.NODE_ENV || 'development'] 