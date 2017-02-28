import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App'
import auth from 'components/auth'
import Cookies from 'react-cookie'
import Request from 'superagent'
import {HomePage, HomePage2, Page3, MoodboardPage, SignInPage,SignUpPage,
  PublisherSettingPage,ForgetPasswordPage,PublisherEditor,PublisherContactAndAboutPage,
  PublisherDashboardPage,ColumnEditor,ColumnSettingPage,PublisherStoryPage,UserSetting,UserSettingProfile,
  UserSettingAccount, UserSettingStory,ColumnPage} from 'components'


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

const getPublisherId =(nextState, replace, cb)=>{
  Request
    .get(config.BACKURL+'/publishers/11')
    .set('Accept','application/json')
    .end((err,res)=>{
      if(err){
        throw err 
        cb()
      }
      else{
        nextState.params.publisher = res.body
        cb()
      }
    })
}


const routes = (
  <Route path="/" component={App} onEnter={checkLogin}>
    <IndexRoute component={HomePage2} />
    <Route path='article' component={Page3}/>
    <Route path='column' component={ColumnPage}/>
    <Route path="mood" component={MoodboardPage} />
    <Route path="forget" component={ForgetPasswordPage} />
    <Route path="signin" component={()=>(<SignInPage visible={true}/>)} />
    <Route path="signup" component={()=>(<SignUpPage visible={true}/>)} />
    <Route path='editor' component={PublisherEditor} onEnter={getPublisherId}>
      <IndexRoute component={PublisherDashboardPage} onEnter={getPublisherId}/>
      <Route path='settings' component={PublisherSettingPage} onEnter={getPublisherId}/>
      <Route path='stories' component={PublisherStoryPage} onEnter={getPublisherId}/>
      <Route path='contact' component={PublisherContactAndAboutPage} onEnter={getPublisherId}/>
      <Route path='columns' >
        <Route path='settings' component={ColumnSettingPage}/>
      </Route>
    </Route>
    <Route path='me' component={UserSetting}>
      <Route path='settings' component={UserSettingProfile}/>
      <Route path='settings/account' component={UserSettingAccount}/>
      <Route path='stories' component={UserSettingStory}/>
      <Route path='stories/drafts' component={UserSettingProfile}/>
    </Route>
  </Route>
)

export default routes
