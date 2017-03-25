import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
var RenderApp = require('./components/pages/RenderApp/index.js')
import routes from 'routes'

const root = document.getElementById('app')

render(<AppContainer><RenderApp routes={routes}/></AppContainer>, root)

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(<AppContainer><RenderApp routes={routes}/></AppContainer>, root)
  })
}
