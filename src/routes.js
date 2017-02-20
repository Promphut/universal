import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App'
import {HomePage, HomePage2, Page3, MoodboardPage, SignInPage,SignUpPage,PublisherSettingPage} from 'components'
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage2} />
    <Route path='/article' component={Page3}/>
    <Route path="/mood" component={MoodboardPage} />
    <Route path="/signin" component={()=>(<SignInPage visible={true}/>)} />
    <Route path="/signup" component={()=>(<SignUpPage visible={true}/>)} />
    <Route path='editor'>
      <Route path='settings' component={PublisherSettingPage}/>
    </Route>
  </Route>
)

export default routes
