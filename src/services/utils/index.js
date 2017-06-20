import api from '../../components/api'

const config = require('../../config'), { parse } = require('query-string')
const utils = {}

utils.getWidth = () => {
	return (
		window.innerWidth ||
		doc.clientWidth ||
		document.getElementsByTagName('body')[0].clientWidth
	)
}
utils.getHeight = () => {
	return (
		window.innerHeight ||
		doc.clientHeight ||
		document.getElementsByTagName('body')[0].clientHeight
	)
}

utils.getScrollX = () => {
	return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
}

utils.getScrollY = () => {
	return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
}
utils.isMobile = () => {
	//if(!navigator) return false
	// return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	)
}

utils.getFbUrl = fbid => {
	return 'https://facebook.com/' + fbid
}
utils.getTwtUrl = username => {
	return 'https://twitter.com/' + username
}
utils.getIgUrl = username => {
	return 'https://instagram.com/' + username
}
utils.getYtUrl = username => {
	// channel
	if (username.startsWith('UC') && username.length === 24)
		return 'https://youtube.com/channel/' + username

	// user
	return 'https://youtube.com/user/' + username
}

// default twt tweet url
utils.getTweetUrl = (url, hashtags) => {
	//console.log("TWT", url, hashtags)
	return (
		'https://twitter.com/intent/tweet?url=' +
		encodeURIComponent(url) +
		(hashtags ? '&hashtags=' + hashtags : '')
	)
}

// append UTM to url
// utm: {source, medium, campaign, content}
utils.appendUTM = (url, utm) => {
	if (!utm) return url
	return (
		url +
		'?' +
		(utm
			? 'utm_source=' + encodeURIComponent(utm.source || config.DOMAIN) + '&'
			: '') +
		(utm && utm.medium
			? 'utm_medium=' + encodeURIComponent(utm.medium) + '&'
			: '') +
		(utm && utm.campaign
			? 'utm_campaign=' + encodeURIComponent(utm.campaign) + '&'
			: '') +
		(utm && utm.content
			? 'utm_content=' + encodeURIComponent(utm.content) + '&'
			: '')
	)
}

utils.getTrailingSid = url => {
	// Get sid by trailing the last param from url
	// because all story url have trailing :sid
	//let arr = url ? url.split('/') : window.location.href.split('/')
	let arr
	if (!url) {
		if (!window) return null
		arr = window.location.href.split('/')
	} else arr = url.split('/')

	return parseInt(arr[arr.length - 1])
}

utils.dotToObj = (obj, str, val) => {
	str = str.split('.')
	while (str.length > 1) {
		let key = str.shift()
		if (!obj[key]) obj[key] = {}
		obj = obj[key]
	}
	return (obj[str.shift()] = val)
}

utils.getTotalPages = (itemsLimit, itemsCount) => {
	let count = Math.ceil(itemsCount / itemsLimit)
	return isNaN(count) ? 0 : count
}

utils.querystring = (field, location) => {
	if (!location || !field) throw new Error('location and field are required.')
	return parse(location.search)[field]
}

utils.toError = (history, err) => {
	history.replace({
		pathname: '/error'
	})

	return err
}
utils.notFound = history => {
	history.replace({
		pathname: '/'
	})
}
utils.toSignin = history => {}

utils.analyticsHasImg = (html) => {
  const img = html.match(/<img((?!>).)*/g)
  if (img.length === 0) return false
  return true
}

utils.analyticsHasLink = (html) => {
  const link = html.match(/<a((?!>).)*/g)
  if (link.length === 0) return false
  return true
}

utils.analyticsDensityKeywords = (keyword, content) => {
  const reg = new RegExp(keyword, 'g')
  const match = content.match(reg)
  return ((keyword.length * match.length) * 100) / content.length
}

// Return the number of char in content
utils.analyticsCharCount = (content) => {
  return content.length
}

// Return number of repeated focus word in title
utils.analyticsHasKeywordInTitle = (title, keyword) => {
  const reg = new RegExp(keyword, 'g')
  const match = title.match(reg)

  if (match === null) return 0
  return match.length
}

// Return the status of focus keyword weather true/false
utils.analyticsisFocusWordIsAvailable = (focusWord) => {
  const wordDetail = api.getFocusWordDetail(focusWord)

  if (wordDetail.size === 0) return true
  return false
}


module.exports = utils
