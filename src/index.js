import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import routes from 'routes'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'

const root = document.getElementById('app')

const renderApp = () => (
  <AppContainer>
    <Router history={browserHistory} routes={routes} render={applyRouterMiddleware(useScroll())} />
  </AppContainer>
)

render(renderApp(), root)

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(renderApp(), root)
  })
}
