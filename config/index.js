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
			QUANTCASTACC: 'p-uSc6wXBs-FJmv',
			BITLY: '45602029bdf37773b3c3887a281ed9b7e13c5622' // infographicthailand
		}
	},

	production : {
		PID:'11',
		NAME: 'NextEmpire', // one word, no space
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
			QUANTCASTACC: 'p-uSc6wXBs-FJmv',
			BITLY: '45602029bdf37773b3c3887a281ed9b7e13c5622' // infographicthailand
		}
	}
}

module.exports = config[process.env.NODE_ENV || 'development'] 