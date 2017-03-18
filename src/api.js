const _ = require('lodash'),
	auth = require('./components/auth'),
	Request = require('superagent'),
	{NotFoundError} = require('./error')

let api =  {}

api.getUserFromCookie = () => {
	let u = auth.getUser()

	if(u){
		return Request
		.get(config.BACKURL+'/users/'+u._id)
		.set('Accept','application/json')
		.then(res => {
			return res.body.user
		})
	} 
	else return Promise.reject(new NotFoundError('User is not found.'))
}

api.getUserFromUsername = (username, cb) => {
	return Request
	.get(config.BACKURL+'/slugs/users/'+username)
	.set('Accept','application/json')
	.then(res => {
		return res.body.user
	})
	.catch(err => {
		return Promise.reject(new NotFoundError('User is not found.'))
	})
}

api.getCookieAndToken = (token) => {
	return Request
    .get(config.BACKURL + '/me/menu' + (token ? '?token='+token : ''))
    .set('Accept', 'application/json')
    .then(res => {
      return res.body
    })
}

api.signin = (data) => {
	return Request
    .post(config.BACKURL + '/auth')
    .send(data)
    .set('Accept', 'application/json')
    .then(res => {
    	return res.body
    })
    // .end((err, res) => {
    //   //console.log('err res', err, res)
    //   if(err || !res.ok){
    //     cb({ authenticated: false })
    //   } else {
    //     //console.log('_loginRequest', res.body)
    //     cb({
    //       authenticated: true,
    //       //token: res.body.token,
    //       //user: res.body.user
    //       //cookie: res.body.cookie
    //     })
    //   }
    // })
}

api.signup = (data) => {
	return Request
    .post(config.BACKURL + '/users')
    .send(data)
    .set('Accept', 'application/json')
    .then(res => {
    	return res.body
    })
    // .end((err, res) => {
    //   //console.log('err res', err, res)
    //   if(!err && res.ok && res.body.token) {
    //     //helpers.setCookieAndToken(res.body)
    //     // Only cookie.user, but no cookie.menu to set for a newly registered user
    //     if(cb) cb(true)
    //   }
    //   else if (cb) cb(false)
  
    // })
}

module.exports = api