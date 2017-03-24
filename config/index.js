const config = {
	development : {
		PROFILE:'/tmp/avatar.png',
		TWT:'https://twitter.com/intent/tweet',
		PID:'11',
		MAINCOLOR:'#00B2B4',
		DOMAIN: 		'localhost',
		FRONTURL: 		'http://localhost:3000',
		BACKURL: 		'http://localhost:4000',
		FEED_LIMIT: 15,
		ROLES: {
			MEMBER: 0, 
			EDITOR: 1, 
			WRITER: 2, 
			ADMIN: 3
		},
		THEME:{ 

		}
	},
	production : {
		PROFILE:'/tmp/avatar.png',
		TWT:'https://twitter.com/intent/tweet',
		PID:'11',
		MAINCOLOR:'#00B2B4',
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
	}
}

module.exports = config[process.env.NODE_ENV || 'development'] 