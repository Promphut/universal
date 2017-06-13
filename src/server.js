/* eslint-disable no-console */
import 'babel-polyfill'
// require.extensions['.css'] = () => {
//   return null
// }
import path from 'path'
import express from 'express'
import React from 'react'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-router-server'
import { CookiesProvider } from 'react-cookie'
import cookiesMiddleware from 'universal-cookie-express'

import { port, host, basename, ANALYTIC, COVER,amazonAccessKey,secretKey } from 'config'
import AppRoutes from 'components/routes'
import Html from 'components/Html'
import Error from 'components/Error'
import api from 'components/api'
if (process.env.NODE_ENV !== 'production') {
	require('longjohn')
}
// var AWS = require('aws-sdk'),
//     fs = require('fs');

const renderApp = ({ req, context, location }) => {
	return renderToString(
		<CookiesProvider cookies={req.universalCookies}>
			<StaticRouter context={context} location={location}>
				<AppRoutes currentlocation = {req.url}/>
			</StaticRouter>
		</CookiesProvider>
	)
}

const getMeta = (u) => {
	return api.getPublisherSetting().then(setting => {
		let name = setting.publisher.name+' | '+setting.publisher.tagline || ''
		let keywords = setting.publisher.keywords || ''
		let desc = setting.publisher.desc || ''
		let cover = COVER || ''
		let url = '' || ''
		let analytic = ANALYTIC.FBAPPID || ''
		var data = {name,keywords,desc,cover,analytic,url}
		const path = u.split('/')
		if (path[1] === 'stories' && (path[3] == '' || path[3] == undefined)) {
			const slug = decodeURIComponent(path[2])
			return api.getColumnFromSlug(slug).then(res => {

				data.name = res.name && res.name
				data.desc = res.shortDesc && res.shortDesc
				data.cover = res.cover.medium && res.cover.medium
				data.url = res.url && res.url
				return data
			}).catch((err)=>{return data})
		} else if (path[1] === 'stories') {
			const sid = path[4]
			return api.getStoryFromSid(sid).then(res => {

				data.name = res.story.ptitle && res.story.ptitle
				data.desc = res.story.contentShort && res.story.contentShort
				data.cover = res.story.cover.large && res.story.cover.large
				data.url = res.story.url && res.story.url
				return data
			}).catch((err)=>{return data})
		} else if (path[1].substring(0, 1) === '@') {
			const user = decodeURIComponent(path[1].substring(1))
			return api.getUserFromUsername(user).then(res => {

				data.name = res.display && res.display
 				data.desc = res.desc && res.desc
				data.url = res.url && res.url
				return data
			}).catch((err)=>{return data})
		} else if (path[1] === 'u') {
			const uid = path[2]
			return api.getUser(uid).then(res => {

				data.name = res.display && res.display
 				data.desc = res.desc && res.desc
				data.url = res.url && res.url
				return data
			}).catch((err)=>{return data})
		} else {
			return data
		}
	}).catch((err)=>{
		console.error(err)
		var data = {name:'',keywords:'',desc:'',cover:'',analytic:'',url:''}
		return data
	})
}

const renderHtml = ({ content, req, meta }) => {
	const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
	const assets = global.assets
	const html = <Html {...{ styles, assets, content, meta }} />
	return `<!doctype html>\n${renderToStaticMarkup(html)}`
}

const app = express()

app.use(basename, express.static(path.resolve(process.cwd(), 'dist/public')))
app.use(cookiesMiddleware())

app.use((req, res, next) => {
	global.window = global.window || {}
	global.navigator = global.navigator || {}
	global.navigator.userAgent = req.headers['user-agent'] || 'all'
	//console.log('req')
	const location = req.url
	const context = {}
	getMeta(req.url).then((meta)=>{
		//console.log('data',meta)
		renderApp({ req, context, location })
		.then(({ html: content }) => {
			if (context.status) {
				res.status(context.status)
			}
			if (context.url) {
				res.redirect(context.url)
			} else {
				res.send(renderHtml({ content, req, meta }))
			}
		})
		.catch(next)
	})
})

app.use((err, req, res, next) => {
	const content = renderToStaticMarkup(<Error />)
	var meta = {name:'',keywords:'',desc:'',cover:'',analytic:'',url:''}
	res.status(500).send(renderHtml({ content, req, meta }))
	console.error(err)
	next(err)
})

var server = app.listen(port, error => {
	const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`
	if (error) {
		console.error(error)
	} else {
		console.info(
			`Server is running at ${boldBlue(`http://${host}:${port}${basename}/`)}`
		)
	}
})

//AMAZON S3
// For dev purposes only
// AWS.config.update({ accessKeyId: amazonAccessKey, secretAccessKey: secretKey });

// // Read in the file, convert it to base64, store to S3
// fs.readFile('del.txt', function (err, data) {
//   if (err) { throw err; }

//   var base64data = new Buffer(data, 'binary');

//   var s3 = new AWS.S3();
//   s3.client.putObject({
//     Bucket: 'thepublisher',
//     Key: 'del2.txt',
//     Body: base64data,
//     ACL: 'public-read'
//   },function (resp) {
//     console.log(arguments);
//     console.log('Successfully uploaded package.');
//   });

// });
