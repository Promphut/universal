/* eslint-disable no-console */
import React from 'react'
//import serialize from 'serialize-javascript'
import styleSheet from 'styled-components/lib/models/StyleSheet'
//import csrf from 'csurf'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
//import { Provider } from 'react-redux'
//import { matchRoutes } from 'react-router-config'
//import { ConnectedRouter, push } from 'react-router-redux'
import { StaticRouter } from 'react-router'
//import createHistory from 'history/createMemoryHistory'
import { Router } from 'express'
import express from 'services/express'
import AppRoutes, { routes } from 'routes'
//import configureStore from 'store/configure'
import { env, port, ip, basename } from 'config'
//import { setCsrfToken } from 'store/actions'
import Html from 'components/Html'

const router = new Router()

//router.use(csrf({ cookie: true }))

router.use((req, res) => {
  if (env === 'development') {
    global.webpackIsomorphicTools.refresh()
  }

  const location = req.url.replace(basename, '')
  //console.log('LOC', location, req.url)
  //const history = createHistory()
  //const store = configureStore({}, history)

  //store.dispatch(setCsrfToken(req.csrfToken()))
  //store.dispatch(push(req.url))

  const context = {}

  // const fetchData = () => new Promise((resolve, reject) => {
  //   const branch = matchRoutes(routes, req.path)
  //   const method = req.method.toLowerCase()

  //   const promises = branch.map(({ route, match }) => {
  //     let component = route.component

  //     if (component) {
  //       while (component && !component[method]) {
  //         // eslint-disable-next-line no-param-reassign
  //         component = component.WrappedComponent
  //       }
  //       return component &&
  //         component[method] &&
  //         component[method]({ req, res, match, store })
  //     }

  //     return Promise.resolve(null)
  //   })

  //   Promise.all(promises).then(resolve).catch(reject)
  // })

  const content = renderToString(
    <StaticRouter
      context={context}
      location={location}
    >
      <AppRoutes />
    </StaticRouter>
  )

  //console.log('context', context)
  if (context.url) {
    res.redirect(context.status, context.url)
  } else {
    const styles = styleSheet.rules().map(rule => rule.cssText).join('\n')
    //const initialState = store.getState()
    const assets = global.webpackIsomorphicTools.assets()
    //const state = `window.__INITIAL_STATE__ = ${serialize(initialState)}`
    const markup = <Html {...{ styles, assets, /*state, */content }} />
    const doctype = '<!doctype html>\n'
    const html = renderToStaticMarkup(markup)
    //console.log('HTML', html)

    if(context.status!=null) res.status(context.status)
    res.send(doctype + html)
  }

  // return fetchData().then(() => {
  //   render()
  // }).catch((err) => {
  //   console.log(err)
  //   res.status(500).end()
  // })
})

const app = express(router)

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`local: http://${ip}:${port}`)
  }
})

export default app
