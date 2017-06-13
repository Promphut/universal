/* eslint-disable no-console */
import 'babel-polyfill'
// require.extensions['.css'] = () => {
//   return null
// }
// allow self signed cert for dev mode 
if (process.env.NODE_ENV == 'development') {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	require('longjohn')
}
import path from 'path'
import express from 'express'
import React from 'react'
import styleSheet from 'styled-components/lib/models/StyleSheet'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-router-server'
import { CookiesProvider } from 'react-cookie'
import cookiesMiddleware from 'universal-cookie-express'
//import forceSSL from 'express-force-ssl'
import http from 'http'
import https from 'https'
import fs from 'fs'

import { port, host, basename, ANALYTIC, COVER,amazonAccessKey,secretKey,PID } from 'config'
import AppRoutes from 'components/routes'
import Html from 'components/Html'
import Error from 'components/Error'
import api from 'components/api'

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

const ssl_options = {
  key: fs.readFileSync('./private/keys/localhost.key'),
  cert: fs.readFileSync('./private/keys/localhost.crt'),
  passphrase: 'thepublisher'
}

const app = express()

const server = http.createServer(app),
	secureServer = https.createServer(ssl_options, app)

//app.use(forceSSL)
app.use(basename, express.static(path.resolve(process.cwd(), 'dist/public')))
app.use(cookiesMiddleware())

var options = {
    tmpDir: './public/uploads/tmp',
    uploadUrl:  '/thepublisher/publishers/'+PID+'/',
		imageTypes:  /\.(gif|jpe?g|png)/i,
		useSSL: true,
    imageVersions :{
        maxWidth : 730,
        maxHeight : 'auto'
    },
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
    },
		storage : {
			type : 'aws',
			aws : {
					accessKeyId :  amazonAccessKey,
					secretAccessKey : secretKey ,
					region : 'us-west-2', //make sure you know the region, else leave this option out
					bucketName : 'thepublisher/publishers/'+PID
			}
    }
};

var uploader = require('blueimp-file-upload-expressjs')(options);

app.post('/upload/img',
	(req,res)=>{
		uploader.post(req, res, function (err,obj) {
				res.send(JSON.stringify(obj));
		});
	}
)

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

function startListen(_server, _url, _port){
	_server.listen(_port);

	_server.on('error', err => {
		if (err.syscall !== 'listen') {
			throw err;
		}

		let bind = typeof _port === 'string'
			? 'Pipe ' + _port
			: 'Port ' + _port;

		// handle specific listen errors with friendly messages
		switch (err.code) {
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw err;
		}
	});

	_server.on('listening', () => {
		const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`

		let addr = _server.address();
		let bind = typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + addr.port;
		console.info(
			`Server is running at ${boldBlue(`${_url}:${_port}${basename}/`)}`
		)
	});
}

startListen(server, 'http://localhost', port)
startListen(secureServer, 'https://localhost', port+100)
