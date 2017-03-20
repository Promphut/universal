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

api.userNotFoundPromise = () => {
	return Promise.reject(new NotFoundError('User is not found.'))
}

api.getUser = (uid) => {
	if(!uid) {
		let u = auth.getUser()
		uid = u ? u._id : null
	}

	if(uid!=null){
		return Request
		.get(config.BACKURL+'/users/'+uid)
		.set('Accept','application/json')
		.then(res => {
			return res.body.user
		}, api.err)
	} 
	else return api.userNotFoundPromise()
}

api.updateUser = (user) => {
	let token = auth.getToken()

	if(!token) return api.userNotFoundPromise()

	//console.log('update', user)

	return Request
	.patch(config.BACKURL+'/users/'+user._id)
	.set('x-access-token', token)
	.set('Accept','application/json')
	.send({user: user})
	.then(res => {
		return res.body.user
	}, api.err)
}

api.getUserFromUsername = (username, cb) => {
	return Request
	.get(config.BACKURL+'/slugs/users/'+username)
	.set('Accept','application/json')
	.then(res => {
		return res.body.user
	})
	.catch(err => {
		return api.userNotFoundPromise()
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