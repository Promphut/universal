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
api.columnNotFoundPromise = () => {
	return Promise.reject(new NotFoundError('Column is not found.'))
}
api.storyNotFoundPromise = () => {
	return Promise.reject(new NotFoundError('Story is not found.'))
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
		.get(config.BACKURL+'/users/'+uid)
		.query({token: token})
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

api.getUserFromUsername = (username) => {
	return Request
	.get(config.BACKURL+'/slugs/users/' + encodeURIComponent(username))
	.set('Accept','application/json')
	.then(res => {
		return res.body.user
	})
	.catch(err => {
		return api.userNotFoundPromise()
	})
}

api.getColumnFromSlug = (slug) => {
	return Request
	.get(config.BACKURL + '/slugs/publishers/' + config.PID + '/' + encodeURIComponent(slug))
	.set('Accept', 'application/json')
	.then(res => {
		return res.body.column
	})
	.catch(err => {
		return api.columnNotFoundPromise()
	})
}

// this will return = { story: Object, canEditStory: Boolean (optional) }
// token is optional, set if you want to get canEditStory flag
api.getStoryFromSid = (sid, token) => {
	if(sid==null) return api.storyNotFoundPromise()

	return Request
	.get(config.BACKURL + '/stories/' + sid)
	.query({token: token})
	.set('Accept', 'application/json')
	.then(res => {
		if(res.body.canEditStory==null) res.body.canEditStory = false
		//console.log('getStoryFromSid', res.body.story)
		return res.body
	})
	.catch(err => {
		return api.storyNotFoundPromise()
	})
}

api.getCookieAndToken = (token) => {
	return Request
    .get(config.BACKURL + '/publishers/'+config.PID+'/menu')
    .query({token: token})
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

/*
	type: 'story'/'video'/'qa' - (mandatory)
	filter: {...} - (optional)
	sort: 'latest'/'popular'/'trending' - (optional) Sort mode
	sortby: {...} - (optional) Sorted by which field
	page: 0 (default)
	limit: 15 (default)
	option: {
		allowUnlisted: false (default) - get unlisted (no belong to the column) feed
		onlyAuthorized: false (default) - get only authorized feed for this user roles e.g. editor gets only his column's feed, editor gets everything, writer gets nothing. If this flag is set to true, token will be specified automatically.
	} - (optional)

*/
api.getFeed = (type, filter, sort, sortby, page, limit, option) => {
	//console.log('filter', JSON.stringify(filter))
	let token
	if(option && option.onlyAuthorized) token = auth.getToken()

	return Request
	.get(config.BACKURL+'/publishers/'+config.PID+'/feed?type='+type)
	.set('x-access-token', token)
	.query({filter: filter && JSON.stringify(filter)})
	.query({option: option && JSON.stringify(option)})
	.query({sort: sort})
	.query({sortby: sortby})
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
	.delete(config.BACKURL+'/stories/'+aid)
	.set('x-access-token', token)
	.then(res => {
		return res.body
	}, api.err)
}

api.setStoryStatus = (aid, status) => {
	let token = auth.getToken()
	if(!token) return api.userNotFoundPromise()

	return Request
	.patch(config.BACKURL+'/stories/'+aid)
	.query({token: token})
	.send({
		story:{status: status}
	})
	.then(res => {
		return res.body
	}, api.err)
}

// token can be null in that case the public publisher object will be fetched.
api.getPublisher = (token) => {
	return Request
	.get(config.BACKURL+'/publishers/'+config.PID)
	.query({token: token})
	.set('Accept','application/json')
	.then(res => {
		return res.body.publisher
	}, api.err)
}

api.updatePublisher = (publisher) => {
	return Request
	.patch(config.BACKURL+'/publishers/'+config.PID)
	.set('x-access-token', auth.getToken())
	.set('Accept','application/json')
	.send({
		publisher: publisher
	})
	.then(res => {
		return res.body.publisher
	}, api.err)
}

// need only contactCat.catName, others are optional.
api.newContactCat = (contactCat) => {
	return Request
	.post(config.BACKURL+'/publishers/'+config.PID+'/contactcats')
	.set('x-access-token', auth.getToken())
	.set('Accept','application/json')
	.send({
		contactCat: contactCat
	})
	.then(res => {
		return res.body.contactCat
	}, api.err)
}

api.updateContactCat = (contactCat) => {
	if(!contactCat || !contactCat._id) throw new Error('contactCat is required.')

	return Request
	.patch(config.BACKURL+'/publishers/'+config.PID+'/contactcats/'+contactCat._id)
	.set('x-access-token', auth.getToken())
	.set('Accept','application/json')
	.send({
		contactCat: contactCat
	})
	.then(res => {
		return res.body.contactCat
	}, api.err)
}

api.deleteContactCat = (conid) => {
	if(!conid) throw new Error('conid is required.')

	return Request
	.delete(config.BACKURL+'/publishers/'+config.PID+'/contactcats/'+conid)
	.set('x-access-token', auth.getToken())
	.then(res => {
		return res.body
	}, api.err)
}

api.sendContactEmail = (contactCat, message) => {
	return Request
	.post(config.BACKURL+'/publishers/'+config.PID+'/contacts')
	.set('Accept','application/json')
	.send({
		contactCat,
		contact: message
	})
	.then(res => {
		return res.body.contact
	}, api.err)
}

module.exports = api
