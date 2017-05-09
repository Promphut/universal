import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { basename } from 'config'

import AppRoutes from 'routes'
//import App from 'components/App'

// const renderApp = () => (
//   <BrowserRouter basename={basename}>
//     <App />
//   </BrowserRouter>
// )
const renderApp = () => (
	<Router>
		<AppRoutes/>
	</Router>
)

const root = document.getElementById('app')
render(renderApp(), root)

if (module.hot) {
  //module.hot.accept('components/App', () => {
  module.hot.accept('routes', () => {
    //require('components/App')
    require('routes')
    render(renderApp(), root)
  })
}
