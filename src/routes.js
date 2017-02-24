import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App'
import auth from 'components/auth'
import Cookies from 'react-cookie'
import {HomePage, HomePage2, Page3, MoodboardPage, SignInPage,SignUpPage,
  PublisherSettingPage,ForgetPasswordPage,PublisherEditor,PublisherContactAndAboutPage,
  PublisherDashboardPage,ColumnEditor,ColumnSettingPage,PublisherStoryPage} from 'components'


const checkLogin=(nextState, replace, cb)=>{
  let token = auth.getToken()
	//console.log('token', token)
  if(token){
    nextState.params.loggedIn = true
  }else{
    nextState.params.loggedIn = false
  }
  cb()
}

const routes = (
  <Route path="/" component={App} onEnter={checkLogin}>
    <IndexRoute component={HomePage2} />
    <Route path='/article' component={Page3}/>
    <Route path="/mood" component={MoodboardPage} />
    <Route path="/forget" component={ForgetPasswordPage} />
    <Route path="/signin" component={()=>(<SignInPage visible={true}/>)} />
    <Route path="/signup" component={()=>(<SignUpPage visible={true}/>)} />
    <Route path='editor' component={PublisherEditor}>
      <IndexRoute component={PublisherDashboardPage} />
      <Route path='settings' component={PublisherSettingPage}/>
      <Route path='stories' component={PublisherStoryPage}/>
      <Route path='contact' component={PublisherContactAndAboutPage}/>
      <Route path='columns'>
        <Route path='settings' component={ColumnSettingPage}/>
      </Route>
    </Route>
  </Route>
)

export default routes
