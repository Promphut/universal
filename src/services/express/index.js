import express from 'express'
import forceSSL from 'express-force-ssl'
import compression from 'compression'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
import { env } from 'config'
import cookiesMiddleware from 'universal-cookie-express'

const root = path.join(__dirname, '../../..')

export default (routes) => {
  const app = express()

  /* istanbul ignore next */
  /*if (env === 'production') {
    app.set('forceSSLOptions', {
      enable301Redirects: true,
      trustXFPHeader: true,
    })
    app.use(forceSSL)
  }*/

  app.use(function(req, res, next) {
    global.window = global.window || {};
    global.navigator = global.navigator || {};
    global.navigator.userAgent = req.headers['user-agent'] || 'all';
    
    next();
  });

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(compression())
    app.use(morgan('dev'))
    //app.use(cookieParser())
    app.use(express.static(path.join(root, env === 'development' ? 'public' : 'dist')))
    app.use(cookiesMiddleware())
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  //console.log('ROUTES', routes)
  app.use(routes)

  return app
}
