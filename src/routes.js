import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage,IndexPage,AppBarExampleIconButton } from 'components'


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/test" component={IndexPage}/>
  </Route>
)

export default routes
