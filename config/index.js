const config = {
	development : {
		PID:'11',
		NAME: 'NextEmpire',
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
		ANALYTIC: {
			FBAPPID: '407326816302135',
			TAGMGRID: 'GTM-MCM6KWJ',
			CHARTBEATUID: 65098,
			QUANTCASTACC: 'p-uSc6wXBs-FJmv'
		}
	},

	production : {
		PID:'11',
		NAME: 'NextEmpire',
		DOMAIN: 		'nextempire.co',
		FRONTURL: 		'http://nextempire.co',
		BACKURL: 		'http://api.nextempire.co',
		FEED_LIMIT: 15,
		ROLES: {
			MEMBER: 0, 
			EDITOR: 1, 
			WRITER: 2, 
			ADMIN: 3
		},
		ANALYTIC: {
			FBAPPID: '406151426419674',
			TAGMGRID: 'GTM-MCM6KWJ',
			CHARTBEATUID: 65098,
			QUANTCASTACC: 'p-uSc6wXBs-FJmv'
		}
	}
}

module.exports = config[process.env.NODE_ENV || 'development'] 