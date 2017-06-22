import 'react-hot-loader/patch'
import 'babel-polyfill'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
// require.extensions['.css'] = () => {
//   return null
// }
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { basename } from 'config'
import { CookiesProvider } from 'react-cookie'

import AppRoutes from 'components/routes'
//import mainStyles from '../public/scss/main.scss'

OfflinePluginRuntime.install()
//import App from 'components/App'

const renderApp = () => (
	<CookiesProvider>
		<BrowserRouter basename={basename}>
			<AppRoutes/>
		</BrowserRouter>
	</CookiesProvider>
)

const root = document.getElementById('app')
render(renderApp(), root)

if (module.hot) {
  //module.hot.accept('components/App', () => {
  module.hot.accept('components/routes', () => {
    //require('components/App')
    require('components/routes')
    render(renderApp(), root)
  })
}
