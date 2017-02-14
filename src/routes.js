import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App2 from 'components/App2'
//import App from 'components/App'
//import { HomePage, HomePage2, IndexPage } from 'components'
import {HomePage, HomePage2, Page3} from 'components'
const routes = (
  <Route path="/" component={App2}>
    <IndexRoute component={HomePage2} />
    <Route path='/article' component={Page3}/>
  </Route>
)

export default routes
