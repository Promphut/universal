const config = {
	development : {
		TWT:'https://twitter.com/intent/tweet',
		PID:'11',
		DOMAIN: 		'localhost',
		FRONTURL: 		'http://localhost:3000',
		BACKURL: 		'http://localhost:4000',
		FEED_LIMIT: 15,
		ROLES: {
			MEMBER: 0, 
			EDITOR: 1, 
			WRITER: 2, 
			ADMIN: 3
		}
	},

	production : {
		TWT:'https://twitter.com/intent/tweet',
		PID:'11',
		DOMAIN: 		'nextempire.co',
		FRONTURL: 		'http://nextempire.co',
		BACKURL: 		'http://api.nextempire.co',
		FEED_LIMIT: 15,
		ROLES: {
			MEMBER: 0, 
			EDITOR: 1, 
			WRITER: 2, 
			ADMIN: 3
		}
	}
}

module.exports = config[process.env.NODE_ENV || 'development'] 