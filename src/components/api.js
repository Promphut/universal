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

// uid and token are optional
// if token is specified, it'll be used to make request as well.
// uid will be auto-get if not supplied.
api.getUser = (uid, token) => {
	if(!uid) {
		let u = auth.getUser()
		uid = u ? u._id : null
	}

	if(uid!=null){
		return Request
		.get(config.BACKURL+'/users/'+uid+'?'+(token?'token='+token+'&':''))
		.set('Accept','application/json')
		.then(res => {
			return res.body.user
		}, api.err)
	} 
	else return api.userNotFoundPromise()
}

api.changePassword = (data) => {
	let token = auth.getToken(),
		uid = auth.getUser()._id

	return Request
    .post(config.BACKURL+'/users/'+uid+'/password')
    .set('x-access-token', token)
    .set('Accept','application/json')
    .send(data)
    .then(res => {
    	return res.body
    }, api.err)
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

api.getFeed = (type, filter, sort, page, limit) => {
	//console.log('filter', JSON.stringify(filter))
	return Request
	.get(config.BACKURL+'/publishers/'+config.PID+'/feed?type='+type)
	.query({filter: filter && JSON.stringify(filter)})
	.query({sort: sort})
	.query({page: page})
	.query({limit: limit})
	.set('Accept','application/json')
	.then(res => {
		return res.body
	}, api.err)
}

api.getColumns = () => {
	return Request
	.get(config.BACKURL+'/publishers/'+config.PID+'/columns')
	.set('Accept','application/json')
	.then(res => {
		return res.body.columns
	}, api.err)
}

api.removeColumn = (cid) => {
    return Request
	.delete(config.BACKURL+'/publishers/'+config.PID+'/columns/'+cid)
	.set('x-access-token', auth.getToken())
	.set('Accept','application/json')
	.then(res => {
		return res.body
	})
}

api.newColumn = (col) => {
	return Request
	.post(config.BACKURL+'/publishers/'+config.PID+'/columns')
	.set('x-access-token', auth.getToken())
	.set('Accept','application/json')
	.send({column: col})
	.then(res => {
		return res.body.column
	})
}

api.getWriters = () => {
	return Request
	.get(config.BACKURL+'/publishers/'+config.PID+'/writers')
	.set('Accept','application/json')
	.then(res => {
		return res.body.writers
	}, api.err)
}

api.deleteStory = (aid) => {
	let token = auth.getToken()
	if(!token) return api.userNotFoundPromise()

	return Request
	.delete(config.BACKURL+'/stories/'+aid+'?token='+token)
	.then(res => {
		return res.body
	}, api.err)
}

api.setStoryStatus = (aid, status) => {
	let token = auth.getToken()
	if(!token) return api.userNotFoundPromise()

	return Request
	.patch(config.BACKURL+'/stories/'+aid+'?token='+token)
	.send({
		story:{status: status}
	})
	.then(res => {
		return res.body
	}, api.err)
}

module.exports = api