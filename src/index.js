import React from 'react'
import { render } from 'react-dom'
import {RenderApp} from 'components'

const root = document.getElementById('app')

/*const renderApp = () => (
  <AppContainer>
    <Router history={browserHistory} routes={routes} render={applyRouterMiddleware(useScroll())} />
  </AppContainer>
)*/

const renderApp = () => (
  <RenderApp/>
)

render(renderApp(), root)

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(renderApp(), root)
  })
}
