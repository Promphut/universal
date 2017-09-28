const auth = require('./auth'),
	Request = require('superagent'),
	{ NotFoundError } = require('./errors'),
	config = require('../config.js'),
	utils = require('./utils')

let api = {}

api.err = err => {
	if (err.response && err.response.body.error) throw err.response.body.error
	else throw err
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
api.tagNotFoundPromise = () => {
	return Promise.reject(new NotFoundError('Tag is not found.'))
}
// uid and token are optional
// if token is specified, it'll be used to make request as well.
// uid will be auto-get if not supplied.
api.getUser = (uid, token) => {
	if (!uid) {
		let u = auth.getUser()
		uid = u ? u._id : null
	}

	if (uid != null) {
		return Request.get(config.BACKURL + '/users/' + uid)
			.query({
				token: token
			})
			.set('Accept', 'application/json')
			.then(res => {
				return res.body.user
			}, api.err)
	} else return api.userNotFoundPromise()
}

// keyword is optional
api.getUsers = keyword => {
	return Request.get(config.BACKURL + '/users')
		.query({
			keyword: keyword
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.users
		}, api.err)
}

api.getPublisherColumns = () => {
	return Request.get(config.BACKURL + '/publishers/' + config.PID + '/columns')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.columns
		}, api.err)
}

api.changePassword = data => {
	let token = auth.getToken(), uid = auth.getUser()._id

	return Request.post(config.BACKURL + '/users/' + uid + '/password')
		.set('x-access-token', token || '')
		.set('Accept', 'application/json')
		.send(data)
		.then(res => {
			return res.body
		}, api.err)
}

api.updateUser = user => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()

	//console.log('update', user)

	return Request.patch(config.BACKURL + '/users/' + user._id)
		.set('x-access-token', token || '')
		.set('Accept', 'application/json')
		.send({
			user: user
		})
		.then(res => {
			return res.body.user
		}, api.err)
}

api.getUserFromUsername = username => {
	return Request.get(
		config.BACKURL + '/slugs/users/' + encodeURIComponent(username)
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.user
		})
		.catch(err => {
			return api.userNotFoundPromise()
		})
}

api.getUserFromUserId = uid => {
	return Request.get(config.BACKURL + '/users/' + uid)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.user
		})
		.catch(err => {
			return api.userNotFoundPromise()
		})
}

api.getColumnFromSlug = slug => {
	slug = slug.split('?')[0]
	return Request.get(
		config.BACKURL +
			'/slugs/publishers/' +
			config.PID +
			'/columns/' +
			encodeURIComponent(slug)
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.column
		})
		.catch(err => {
			return api.columnNotFoundPromise()
		})
}

// token is optional
api.getColumn = (cid, token) => {
	return Request.get(
		config.BACKURL + '/publishers/' + config.PID + '/columns/' + cid
	)
		.set('Accept', 'application/json')
		.set('x-access-token', token || '')
		.then(res => {
			return res.body.column
		})
}

api.updateColumn = (cid, column) => {
	return Request.patch(
		config.BACKURL + '/publishers/' + config.PID + '/columns/' + cid
	)
		.set('x-access-token', auth.getToken() || '')
		.set('Accept', 'application/json')
		.send({
			column: column
		})
		.then(res => {
			return res.body.column
		})
}

// this will return = { story: Object, canEditStory: Boolean (optional) }
// token is optional, set if you want to get canEditStory flag
api.getStoryFromSid = (sid, token, countView) => {
	if (sid == null) return api.storyNotFoundPromise()

	return Request.get(config.BACKURL + '/stories/' + sid)
		.query({
			token: token
		})
		.query({
			countView: countView
		})
		.set('Accept', 'application/json')
		.then(res => {
			if (res.body.canEditStory == null) res.body.canEditStory = false
			//console.log('getStoryFromSid', res.body.story)
			return res.body
		})
		.catch(err => {
			return api.storyNotFoundPromise()
		})
}

api.getStoryFromKeyword = (keyword, type, page, limit) => {
	return Request.post(config.BACKURL + '/stories/' + config.PID + '/find')
		.query({
			page: page,
			limit: limit
		})
		.send({
			title: keyword,
			status: 1,
			type: type
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.getFocusWordDetail = focusWord => {
	return Request.get(config.BACKURL + '/stories/getfocusword/' + focusWord)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, new Error('Get Focus Word Detail Error'))
}

api.getCookieAndToken = token => {
	return Request.get(config.BACKURL + '/publishers/' + config.PID + '/menu')
		.query({
			token: token
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.signin = data => {
	return Request.post(config.BACKURL + '/auth')
		.send(data)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.signup = data => {
	return Request.post(config.BACKURL + '/users')
		.send(data)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

/*
	type: 'story'/'news'/'article'/'video'/'qa' - (mandatory)
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
	// console.log('filter', filter)
	// console.log('filter', JSON.stringify(filter))
	let token
	if (option && option.onlyAuthorized) token = auth.getToken()
	//console.log(token)
	return Request.get(
		config.BACKURL + '/publishers/' + config.PID + '/feed?type=' + type
	)
		.set('x-access-token', token || '')
		.query({
			filter: filter ? JSON.stringify(filter) : null
		})
		.query({
			option: option ? JSON.stringify(option) : null
		})
		.query({
			sort: sort
		})
		.query({
			sortby: sortby
		})
		.query({
			page: page
		})
		.query({
			limit: limit
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.getColumns = (status = 1) => {
	return Request.get(config.BACKURL + '/publishers/' + config.PID + '/columns')
		.query({
			status
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.columns
		}, api.err)
}

api.removeColumn = cid => {
	return Request.delete(
		config.BACKURL + '/publishers/' + config.PID + '/columns/' + cid
	)
		.set('x-access-token', auth.getToken() || '')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		})
}

api.newColumn = col => {
	return Request.post(config.BACKURL + '/publishers/' + config.PID + '/columns')
		.set('x-access-token', auth.getToken() || '')
		.set('Accept', 'application/json')
		.send({
			column: col
		})
		.then(res => {
			return res.body.column
		})
}

api.getTagFromTagId = tid => {
	return Request.get(
		config.BACKURL + '/publishers/' + config.PID + '/tags/' + tid
	).then(res => {
		return res.body.tag
	}, api.err)
}

api.getTagFromTagSlug = slug => {
	return Request.get(
		config.BACKURL +
			'/slugs/publishers/' +
			config.PID +
			'/tags/' +
			encodeURIComponent(slug)
	).then(res => {
		return res.body.tag
	}, api.err)
}

api.getStoryTags = sid => {
	return Request.get(config.BACKURL + '/stories/' + sid + '/tags').then(res => {
		return res.body.tags
	}, api.err)
}

api.getTags = () => {
	return Request.get(
		config.BACKURL + '/publishers/' + config.PID + '/tags'
	).then(res => {
		return res.body.tags
	}, api.err)
}

api.getTagFromSlug = slug => {
	return Request.get(
		config.BACKURL +
			'/slugs/publishers/' +
			config.PID +
			'/tags/' +
			encodeURIComponent(slug)
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.tag
		})
		.catch(err => {
			return api.tagNotFoundPromise()
		})
}

api.addTag = name => {
	return Request.post(config.BACKURL + '/publishers/' + config.PID + '/tags')
		.set('x-access-token', auth.getToken() || '')
		.send({
			tag: {
				name: name
			}
		})
		.then(res => {
			return res.body.tag
		}, api.err)
}

api.removeTag = tid => {
	return Request.delete(
		config.BACKURL + '/publishers/' + config.PID + '/tags/' + tid
	)
		.set('x-access-token', auth.getToken() || '')
		.then(res => {
			return res.body.tag
		}, api.err)
}

api.getPublisherWriters = () => {
	return Request.get(config.BACKURL + '/publishers/' + config.PID + '/writers')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.writers
		}, api.err)
}

api.getPublisherNormalUsers = uid => {
	return Request.get(
		config.BACKURL + '/publishers/' + config.PID + '/isNormalUser/' + uid
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.deleteStory = sid => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()

	return Request.delete(config.BACKURL + '/stories/' + sid)
		.set('x-access-token', token || '')
		.then(res => {
			return res.body
		}, api.err)
}

api.updateStory = (sid, story) => {
	return Request.patch(config.BACKURL + '/stories/' + sid)
		.set('x-access-token', auth.getToken() || '')
		.send({
			story: story
		})
		.then(res => {
			return res.body.story
		}, api.err)
}
api.createStory = story => {
	return Request.post(config.BACKURL + '/stories')
		.set('x-access-token', auth.getToken() || '')
		.send({
			story: story
		})
		.then(res => {
			return res.body.story
		}, api.err)
}
// api.unpublishStory = (sid) => {
// 	return Request
// 	.patch(config.BACKURL+'/stories/'+this.state.sid)
// 	.set('x-access-token', auth.getToken())
// 	.send({story: {status: 0}})
// 	.then({
// 		return res.body.story
// 	}, api.err)
// }
// api.publishStory = (sid, story) => {
// 	return Request
// 	.patch(config.BACKURL+'/stories/'+sid+'?token='+auth.getToken())
// 	.send({story: story})
// 	.then(res => {
// 		return res.body.story
// 	}, api.err)
// }

api.setStoryStatus = (sid, status) => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()

	return Request.patch(config.BACKURL + '/stories/' + sid)
		.query({
			token: token
		})
		.send({
			story: {
				status: status
			}
		})
		.then(res => {
			return res.body
		}, api.err)
}

api.getOtherPublisher = id => {
	return Request.get(config.BACKURL + '/publishers/' + id)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.publisher
		}, api.err)
}
// token can be null in that case the public publisher object will be fetched.
api.getPublisher = token => {
	return Request.get(config.BACKURL + '/publishers/' + config.PID)
		.query({
			token: token
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.publisher
		}, api.err)
}
api.getPublisherContactCats = () => {
	return Request.get(
		config.BACKURL + '/publishers/' + config.PID + '/contactcats'
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.publisher.contactCats || []
		}, api.err)
}
api.getPublisherAboutUs = () => {
	return Request.get(config.BACKURL + '/publishers/' + config.PID + '/aboutus')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.publisher.aboutUs || ''
		}, api.err)
}
api.getPublisherSetting = () => {
	return Request.get(config.BACKURL + '/publishers/' + config.PID + '/setting')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.updatePublisher = publisher => {
	return Request.patch(config.BACKURL + '/publishers/' + config.PID)
		.set('x-access-token', auth.getToken() || '')
		.set('Accept', 'application/json')
		.send({
			publisher: publisher
		})
		.then(res => {
			return res.body.publisher
		}, api.err)
}

// need only contactCat.catName, others are optional.
api.newContactCat = contactCat => {
	return Request.post(
		config.BACKURL + '/publishers/' + config.PID + '/contactcats'
	)
		.set('x-access-token', auth.getToken() || '')
		.set('Accept', 'application/json')
		.send({
			contactCat: contactCat
		})
		.then(res => {
			return res.body.contactCat
		}, api.err)
}

api.updateContactCat = contactCat => {
	if (!contactCat || !contactCat._id) throw new Error('contactCat is required.')

	return Request.patch(
		config.BACKURL +
			'/publishers/' +
			config.PID +
			'/contactcats/' +
			contactCat._id
	)
		.set('x-access-token', auth.getToken() || '')
		.set('Accept', 'application/json')
		.send({
			contactCat: contactCat
		})
		.then(res => {
			return res.body.contactCat
		}, api.err)
}

api.deleteContactCat = conid => {
	if (!conid) throw new Error('conid is required.')

	return Request.delete(
		config.BACKURL + '/publishers/' + config.PID + '/contactcats/' + conid
	)
		.set('x-access-token', auth.getToken() || '')
		.then(res => {
			return res.body
		}, api.err)
}

api.getAdmins = () => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()

	return Request.get(config.BACKURL + '/publishers/' + config.PID + '/admins')
		.set('x-access-token', token || '')
		.then(res => {
			return res.body.admins
		})
}

api.removeAdmin = adminId => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()

	if (adminId == null) return Promise.reject(new Error('adminId is required.'))

	return Request.delete(
		config.BACKURL + '/publishers/' + config.PID + '/admins/' + adminId
	)
		.set('x-access-token', token || '')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		})
}

api.addAdmin = uid => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()

	if (uid == null) return Promise.reject(new Error('uid is required.'))

	return Request.post(
		config.BACKURL + '/publishers/' + config.PID + '/admins/' + uid
	)
		.set('x-access-token', token || '')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		})
}

api.addEditorToColumn = (uid, cid) => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()

	if (uid == null) return Promise.reject(new Error('uid is required.'))

	return Request.post(
		config.BACKURL +
			'/publishers/' +
			config.PID +
			'/columns/' +
			cid +
			'/editors/' +
			uid
	)
		.set('x-access-token', token || '')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		})
}

api.removeEditor = (editorId, cid) => {
	return Request.delete(
		config.BACKURL +
			'/publishers/' +
			config.PID +
			'/columns/' +
			cid +
			'/editors/' +
			editorId
	)
		.set('x-access-token', auth.getToken() || '')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		})
}

api.getEditors = cid => {
	return Request.get(
		config.BACKURL +
			'/publishers/' +
			config.PID +
			'/columns/' +
			cid +
			'/editors'
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.editors
		})
}

api.addWriterToColumn = (uid, cid) => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()

	if (uid == null) return Promise.reject(new Error('uid is required.'))

	return Request.post(
		config.BACKURL +
			'/publishers/' +
			config.PID +
			'/columns/' +
			cid +
			'/writers/' +
			uid
	)
		.set('x-access-token', token || '')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		})
}

api.removeWriter = (writerId, cid) => {
	return Request.delete(
		config.BACKURL +
			'/publishers/' +
			config.PID +
			'/columns/' +
			cid +
			'/writers/' +
			writerId
	)
		.set('x-access-token', auth.getToken() || '')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		})
}

api.getColumnWriters = cid => {
	return Request.get(
		config.BACKURL +
			'/publishers/' +
			config.PID +
			'/columns/' +
			cid +
			'/writers'
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.writers
		})
}

api.sendContactEmail = (contactCat, message) => {
	return Request.post(
		config.BACKURL + '/publishers/' + config.PID + '/contacts'
	)
		.set('Accept', 'application/json')
		.send({
			contactCat,
			contact: message
		})
		.then(res => {
			return res.body.contact
		}, api.err)
}

// sid and action is mandatory
// subaction is optional
api.incStoryInsight = (sid, action, subaction, inc = 0) => {
	if (sid == null) return Promise.reject(new Error('sid is required.'))
	if (action == null) return Promise.reject(new Error('action is required.'))

	let url =
		config.BACKURL +
		'/insights/stories/' +
		config.PID +
		'/' +
		sid +
		'/' +
		action
	if (subaction != null) url += '/' + subaction

	return Request.post(url)
		.set('Accept', 'application/json')
		.send({
			inc
		})
		.then(res => {
			return res.body
		}, api.err)
}

api.updateFBshare = (sid, share_fb) => {
	return Request.post(config.BACKURL + '/stories/' + sid + '/shares')
		.set('Accept', 'application/json')
		.send({
			fb: share_fb
		})
		.then(res => {
			// console.log('res api', res)
			return res.body
		}, api.err)
}

api.getPublisherInsight = (pid, action, subaction, period, from, to) => {
	if (pid == null) return Promise.reject(new Error('pid is required.'))
	if (action == null) return Promise.reject(new Error('action is required.'))

	let url = config.BACKURL + '/insights/publishers/' + pid + '/' + action
	if (subaction != null) url += '/' + subaction
	if (period) url += '?period=' + period
	else if (from && to) url += '?from=' + from + '&to=' + to
	return Request.get(url)
		.set('Accept', 'application/json')
		.set('x-access-token', auth.getToken() || '')
		.then(res => {
			//console.log('api.incStoryInsight', res.body)
			return res.body
		}, api.err)
}

api.uploadFile = (file, type, toUrl, query) => {
	let token = auth.getToken()
	if (!token) return api.userNotFoundPromise()
	if (query) {
		return Request.post(toUrl)
			.set('x-access-token', token || '')
			.query({
				x: parseInt(query.x)
			})
			.query({
				y: parseInt(query.y)
			})
			.query({
				w: parseInt(query.width)
			})
			.query({
				h: parseInt(query.height)
			})
			.attach(type, file, file.name)
			.then(res => {
				return res.body
			}, api.err)
	} else {
		return Request.post(toUrl)
			.set('x-access-token', token || '')
			.attach(type, file, file.name)
			.then(res => {
				return res.body
			}, api.err)
	}
}

api.getContentTypes = () => {
	return Request.get(config.BACKURL + '/publishers/' + config.PID + '/columns')
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.contentTypes
		}, api.err)
}

api.getViewInsight = (
	insight,
	subaction = '',
	filter,
	sort,
	limit,
	current
) => {
	const token = auth.getToken()

	return Request.get(
		config.BACKURL +
			'/insights/' +
			insight +
			'/' +
			config.PID +
			'/view/' +
			subaction
	)
		.set('x-access-token', token || '')
		.query({
			filter: filter ? JSON.stringify(filter) : null
		})
		.query({
			sort: sort ? JSON.stringify(sort) : null
		})
		.query({
			limit: limit
		})
		.query({
			current: current
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.getTrendInsight = (
	insight,
	subaction = '',
	filter,
	sort,
	limit,
	current
) => {
	const token = auth.getToken()

	return Request.get(
		config.BACKURL +
			'/insights/' +
			insight +
			'/' +
			config.PID +
			'/trend/' +
			subaction
	)
		.set('x-access-token', token || '')
		.query({
			filter: filter ? JSON.stringify(filter) : null
		})
		.query({
			sort: sort ? JSON.stringify(sort) : null
		})
		.query({
			limit: limit
		})
		.query({
			current: current
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.getShareInsight = (
	insight,
	subaction = '',
	filter,
	sort,
	limit,
	current
) => {
	const token = auth.getToken()

	return Request.get(
		config.BACKURL +
			'/insights/' +
			insight +
			'/' +
			config.PID +
			'/share/' +
			subaction
	)
		.set('x-access-token', token || '')
		.query({
			filter: filter ? JSON.stringify(filter) : null
		})
		.query({
			sort: sort ? JSON.stringify(sort) : null
		})
		.query({
			limit: limit
		})
		.query({
			current: current
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

api.getGrowthInsight = (
	insight,
	subaction = '',
	filter,
	sort,
	limit,
	current
) => {
	const token = auth.getToken()

	return Request.get(
		config.BACKURL +
			'/insights/' +
			insight +
			'/' +
			config.PID +
			'/growth/' +
			subaction
	)
		.set('x-access-token', token || '')
		.query({
			filter: filter ? JSON.stringify(filter) : null
		})
		.query({
			sort: sort ? JSON.stringify(sort) : null
		})
		.query({
			limit: limit
		})
		.query({
			current: current
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}

// utm: {source, medium, campaign, content}
// response: {success:true/false, url:'url'}
// if unable to shorten, success will be false
api.shorten = (url, utm) => {
	url = utils.appendUTM(url, utm)

	return Request.post(
		'https://www.googleapis.com/urlshortener/v1/url?key=' +
			config.ANALYTIC.GOOGLE_URL_SHORTENER
	)
		.set('Content-Type', 'application/json')
		.send("{longUrl: '" + url + "'}")
		.then(
			res => {
				if (res.status != 200)
					//return Promise.reject(new Error('Unable to shorten the link'))
					return {
						success: false,
						url: url
					}

				return {
					success: true,
					url: res.body.id
				}
			},
			() => {
				return {
					success: false,
					url: url
				}
			}
		)
}

// hash is without #
api.createHash = (hash, sid) => {
	return Request.post(config.BACKURL + '/publishers/' + config.PID + '/hashes')
		.send({
			hash: hash,
			story: sid
		})
		.set('Accept', 'application/json')
		.then(res => {
			//console.log('1. CREATE HASH', res.body)
			return res.body
		}, api.err)
}

// hash is without #
// sid is optional
api.checkHash = hash => {
	return (
		Request.get(
			config.BACKURL + '/publishers/' + config.PID + '/hashes/' + hash
		)
			// .query({
			// 	story: sid!=null ? sid : ''
			// })
			.set('Accept', 'application/json')
			.then(res => {
				//console.log('2. CHECK HASH', res.body)
				return res.body
			}, api.err)
	)
}

api.checkSignUp = email => {
	return Request.post(config.BACKURL + '/signup/check')
		.send({
			email
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.user
		}, api.err)
}

api.filterStoryByTitle = (title, sort) => {
	return Request.post(config.BACKURL + '/stories/find')
		.send({
			title,
			sort
		})
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.stories
		}, api.err)
}

api.getChildren = () => {
	return Request.get(
		config.BACKURL + '/publishers/' + config.PID + '/columns/parent'
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.columns
		}, api.err)
}

api.getChildrenFromParent = parent => {
	return Request.get(
		config.BACKURL +
			'/publishers/' +
			config.PID +
			'/columns/' +
			parent +
			'/parent'
	)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body.columns
		}, api.err)
}

api.getSignature = sid => {
	return Request.get('/get_signature/' + sid)
		.set('Accept', 'application/json')
		.then(res => {
			return res.body
		}, api.err)
}
api.getNextStory = sid =>{
	return Request.get(`${config.BACKURL}/stories/${sid}/next`)
	.set('Accept', 'application/json')
	.then(res => {
		return res.body
	}, api.err)
}
api.getRecommendStories = sid =>{
	return Request.get(`${config.BACKURL}/stories/${sid}/recommend`)
	.set('Accept', 'application/json')
	.then(res => {
		return res.body
	}, api.err)
}
api.deleteImage = url =>{
	return Request.delete(`${config.BACKURL}${url}`)
	.set('x-access-token', auth.getToken())
	.set('Accept', 'application/json')
	.then(res => {
		return res.body
	}, api.err)
}
api.addStoryTag = (sid,tid) =>{
	return 	Request.post(`${config.BACKURL}/stories/${sid}/tags/${tid}`)
	.set('x-access-token', auth.getToken())
	.set('Accept', 'application/json')	
	.then(res => {
		return res.body
	}, api.err)
}
module.exports = api
