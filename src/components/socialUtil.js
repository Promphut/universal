import api from './api'
import _ from 'lodash'

let socialUtil = {}

socialUtil.getTrailingSid = function(url){
	// Get sid by trailing the last param from url 
	// because all story url have trailing :sid
	let arr = url ? url.split('/') : window.location.href.split('/')
	return parseInt(arr[arr.length-1])
}

// socialUtil.shareFb = function(){
// 	FB.ui({
// 		method: 'share',
// 		display: 'popup',
// 		href: window.location.href
// 	}, function(response){
		
// 	});
// }

// socialUtil.shareStoryViaFb = function(){
// 	//console.log('href', window.location.href)
// 	let sid = socialUtil.getTrailingSid()
// 	if(!_.isInteger(sid)) return

//     FB.ui({
// 		method: 'share',
// 		display: 'popup',
// 		href: window.location.href
// 	}, function(response){
// 		api.incStoryInsight(sid, 'share', 'share_fb')

// 		// // if post is shared by facebook, array will be returned.
// 		// if(_.isArray(response)) {
// 		// 	// inc insight
// 		// 	api.incStoryInsight(sid, 'share', 'share_fb')
// 		// }
// 	});
// }

module.exports = socialUtil