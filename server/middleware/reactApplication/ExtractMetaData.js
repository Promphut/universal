import api from '../../../shared/services/api';
import { FRONTURL, port, host, basename, ANALYTIC, COVER, amazonAccessKey, secretKey, PID } from '../../../shared/config.js'

const ExtractMeta = (setting, url) => {
	let meta = {
		name: '',
		keywords: setting.publisher.keywords || '',
		desc: setting.publisher.desc || '',
		cover : COVER || '',
		analytic: ANALYTIC.FBAPPID || '',
		url : url,
		logo: setting.publisher.theme.slogo,
		publisher: setting.publisher.name,
		writer: setting.publisher.name,
		datePublished: new Date(),
		story:null
	}

	if(setting.publisher.name)
		meta.name = setting.publisher.name + (setting.publisher.tagline ? ' | ' + setting.publisher.tagline : '')

	let path = url.split('/')

	if (path[1] === 'stories' && !(path[2].startsWith('all')||path[2].startsWith('columns')) && !path[3]) {
		// 1. Column case
		let slug = decodeURIComponent(path[2])
		return api.getColumnFromSlug(slug)
		.then(col => {
			if(col.name) meta.name = col.name + ' | ' + setting.publisher.name
			if(col.shortDesc) meta.desc = col.shortDesc
			if(col.cover && col.cover.medium) meta.cover = col.cover.medium || '/pic/fbthumbnail.jpg'
			if(col.url) meta.url = col.url
			return meta
		}).catch((err)=>{return {status: 404}})
	} else if (path[1] === 'stories' && !(path[2].startsWith('all')||path[2].startsWith('columns'))) {
		// 2. Story case
			if(path.length>4 && path[4]) {
				let sid = path[4]
				return api.getStoryFromSid(sid)
				.then(res => {
					//console.log(res.story)
					if(res.story.publisher._id!=setting.publisher._id) return {status: 404}
					let s = res.story
					if(s.meta) meta.name = s.meta.title + ' | ' + setting.publisher.name
					if(s.meta) meta.desc = s.meta.desc
					if(s.cover) meta.cover = s.cover.large || '/pic/fbthumbnail.jpg'
					if(s.url) meta.url = s.url
					if(s.writer) meta.writer = s.writer.display
					if(s.published) meta.datePublished = s.published
					if(s.tags){ s.tags.map((tag,ind)=>{
							meta.keywords += ','+tag.name
						})
					}
					meta.story = s 
					// console.log(meta.keywords)
					return meta
				}).catch((err)=>{return {status: 404}})
			}else return Promise.resolve(meta)
	} else if (path[1] && path[1].substring(0, 1) === '@') {
		// 3. User case with username
		let user
		if(path[1].indexOf("?") != -1)
			user = decodeURIComponent(path[1].substring(1,path[1].indexOf("?")))
		else
			user = decodeURIComponent(path[1].substring(1))
		return api.getUserFromUsername(user)
		.then(u => {
			if(u.display) meta.name = u.display + ' | ' + setting.publisher.name
			if(u.desc) meta.desc = u.desc
			if(u.url) meta.url = u.url
			return meta
		}).catch((err)=>{return {status: 404}})
	} else if (path[1] === 'u') {
		// 4. User case with user id
		let uid
		if(path[2].indexOf("?") != -1)
			uid = path[2].substring(path[2].indexOf("?"))
		else
			uid = path[2]
		path[2].substring(1,path[1].indexOf("?"))
		return api.getUser(uid)
		.then(u => {
			if(u.display) meta.name = u.display + ' | ' + setting.publisher.name
			if(u.desc) meta.desc = u.desc
			if(u.url) meta.url = u.url
			return meta
		}).catch((err)=>{return {status: 404}})
	} else if (path[1] === 'tags'){
		// 5. Tags case
		let tag
		if(path[2].indexOf("?") != -1)
			tag = path[2].substring(0,path[2].indexOf("?"))
		else
			tag = path[2]
		return api.getTagFromTagSlug(decodeURIComponent(tag))
		.then()
		.catch((err)=>{return {status: 404}})
	}
	else return Promise.resolve(meta)
}

export default ExtractMeta