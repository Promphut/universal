const config = {
	development : {
		PID:'11',
		MAINCOLOR:'#00B2B4',
		DOMAIN: 		'localhost',
		FRONTURL: 		'http://localhost:3000',
		BACKURL: 		'http://localhost:4000'
	},
	production : {
		PID:'11',
		MAINCOLOR:'#00B2B4',
		DOMAIN: 		'localhost',
		FRONTURL: 		'http://localhost:3000',
		BACKURL: 		'http://localhost:4000'
	}
}

module.exports = config[process.env.NODE_ENV || 'development'] 