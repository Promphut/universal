import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App2 from 'components/App2'
//import App from 'components/App'
//import { HomePage, HomePage2, IndexPage } from 'components'
import {HomePage, HomePage2, Page3, MoodboardPage, SignInPage,SignUpPage} from 'components'
const routes = (
  <Route path="/" component={App2}>
    <IndexRoute component={HomePage2} />
    <Route path='/article' component={Page3}/>
    <Route path="/mood" component={MoodboardPage} />
    <Route path="/signin" component={SignInPage} />
    <Route path="/signup" component={SignUpPage} />
  </Route>
)

export default routes
