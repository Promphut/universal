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

import { port, host, basename } from 'config'
import AppRoutes from 'components/routes'
import Html from 'components/Html'
import Error from 'components/Error'
if (process.env.NODE_ENV !== 'production'){
  require('longjohn');
}

const renderApp = ({ req, context, location }) => {
  return renderToString(
    <CookiesProvider cookies={req.universalCookies}>
      <StaticRouter
        context={context}
        location={location}
      >
        <AppRoutes />
      </StaticRouter>
    </CookiesProvider>
  )
}

const renderHtml = ({ content }) => {
  const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
  const assets = global.assets
  const html = <Html {...{ styles, assets, content }} />
  return `<!doctype html>\n${renderToStaticMarkup(html)}`
}

const app = express()

app.use(basename, express.static(path.resolve(process.cwd(), 'dist/public')))
app.use(cookiesMiddleware())

app.use((req, res, next) => {
  global.window = global.window || {};
  global.navigator = global.navigator || {};
  global.navigator.userAgent = req.headers['user-agent'] || 'all';

  const location = req.url
  const context = {}

  renderApp({ req, context, location }).then(({ html: content }) => {
    if (context.status) {
      res.status(context.status)
    }
    if (context.url) {
      res.redirect(context.url)
    } else {
      res.send(renderHtml({ content }))
    }
  }).catch(next)
})

app.use((err, req, res, next) => {
  const content = renderToStaticMarkup(<Error />)
  res.status(500).send(renderHtml({ content }))
  console.error(err)
  next(err)
})

var server = app.listen(port, (error) => {
  const boldBlue = text => `\u001b[1m\u001b[34m${text}\u001b[39m\u001b[22m`
  if (error) {
    console.error(error)
  } else {
    console.info(`Server is running at ${boldBlue(`http://${host}:${port}${basename}/`)}`)
  }
})