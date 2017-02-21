import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App'
import {HomePage, HomePage2, Page3, MoodboardPage, SignInPage,SignUpPage,PublisherSettingPage,ForgetPasswordPage,PublisherEditor,PublisherContactAndAboutPage,PublisherDashboardPage} from 'components'
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage2} />
    <Route path='/article' component={Page3}/>
    <Route path="/mood" component={MoodboardPage} />
    <Route path="/forget" component={ForgetPasswordPage} />
    <Route path="/signin" component={()=>(<SignInPage visible={true}/>)} />
    <Route path="/signup" component={()=>(<SignUpPage visible={true}/>)} />
    <Route path='editor' component={PublisherEditor}>
      <IndexRoute component={PublisherDashboardPage} />
      <Route path='settings' component={PublisherSettingPage}/>
      <Route path='contact' component={PublisherContactAndAboutPage}/>
    </Route>
  </Route>
)

export default routes
