const _ = require('lodash'),
	auth = require('./auth'),
	Request = require('superagent'),
	{NotFoundError} = require('./error')

let api =  {}

api.err = (err) => {
	if(err.response && err.response.body.error)
		throw err.response.body.error
	else 
		throw err
}

api.getUserFromCookie = () => {
	let u = auth.getUser()

	if(u){
		return Request
		.get(config.BACKURL+'/users/'+u._id)
		.set('Accept','application/json')
		.then(res => {
			return res.body.user
		}, api.err)
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
    }, api.err)
}

api.signin = (data) => {
	return Request
    .post(config.BACKURL + '/auth')
    .send(data)
    .set('Accept', 'application/json')
    .then(res => {
    	return res.body
    }, api.err)
}

api.signup = (data) => {
	return Request
    .post(config.BACKURL + '/users')
    .send(data)
    .set('Accept', 'application/json')
    .then(res => {
    	return res.body
    }, api.err)
}

module.exports = api