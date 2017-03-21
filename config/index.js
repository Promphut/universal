const config = {
	development : {
		PID:'11',
		MAINCOLOR:'#00B2B4',
		DOMAIN: 		'localhost',
		FRONTURL: 		'http://localhost:3000',
		BACKURL: 		'http://localhost:4000',
		FEED_LIMIT: 15
	},
	production : {
		PID:'11',
		MAINCOLOR:'#00B2B4',
		DOMAIN: 		'localhost',
		FRONTURL: 		'http://localhost:3000',
		BACKURL: 		'http://localhost:4000',
		FEED_LIMIT: 15
	}
}

module.exports = config[process.env.NODE_ENV || 'development'] 