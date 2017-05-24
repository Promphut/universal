const merge = require('lodash/merge')

//const browser = typeof window !== 'undefined'
//const ip = process.env.IP || '0.0.0.0'
//const port = process.env.PORT || 3000

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV !== 'production',
    basename: process.env.PUBLIC_PATH,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,

    PID:'11',
    NAME: 'NextEmpire', // one word, no space
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
  },
  test: {},
  development: {
    DOMAIN:     'localhost',
    FRONTURL:     'http://localhost:3000',
    BACKURL:    'http://localhost:4000',
  },
  production: {
    DOMAIN:     'nextempire.co',
    FRONTURL:     'http://nextempire.co',
    BACKURL:    'http://api.nextempire.co',
  },
}

module.exports = merge(config.all, config[config.all.env])
