import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App'
import auth from 'components/auth'
import Cookies from 'react-cookie'
import Request from 'superagent'
import {HomePage, HomePage2, Page3, MoodboardPage, SignInPage,SignUpPage,
  PublisherSettingPage,ForgetPasswordPage,PublisherEditor,PublisherContactAndAboutPage,
  PublisherDashboardPage,ColumnEditor,ColumnSettingPage,PublisherStoryPage,UserSetting,UserSettingProfile,
  UserSettingAccount, UserSettingStory,ColumnPage,PublisherPage,UserStory,AllStory,AllColumn,NewStory } from 'components'


const checkLogin=(nextState, replace, cb)=>{
  let token = auth.getToken()
  cb()
}

const getUserId = (nextState, replace, cb)=>{
  var user = auth.getUser()
  if(user){
    Request
      .get(config.BACKURL+'/users/'+user._id)
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err){
          throw err 
        }
        else{
          nextState.params.user = res.body
          cb()
        }
      })
  }else{
    replace({
      pathname:'/signin',
      state: { nextPathname: nextState.location.pathname }
    })
    cb()
  }
}

const getPublisherId =(nextState, replace, cb)=>{
  var user = auth.getUser()
  if(true){
    Request
      .get(config.BACKURL+'/publishers/11')
      .set('Accept','application/json')
      .end((err,res)=>{
        if(err){
          throw err 
        }
        else{
          nextState.params.publisher = res.body
          nextState.params.user = user
          cb()
        }
      })
  }else{
    replace({
      pathname:'/',
      state: { nextPathname: nextState.location.pathname }
    })
    cb()
  }
}

const getColumnId = (nextState, replace, cb)=>{
  //console.log(nextState.params)
  var user = auth.getUser()
  Request
    .get(config.BACKURL+'/publishers/11/columns/'+nextState.params.cid)
    .set('Accept','application/json')
    .end((err,res)=>{
      if(err){
        throw err 
      }
      else{
        nextState.params.column = res.body
        nextState.params.user = user
        cb()
      }
    })
}

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage2}/>
    <Route path='article' component={Page3}/>
    <Route path='column' component={ColumnPage}/>
    <Route path='stories' component={AllStory}/>
    <Route path='stories/columns' component={AllColumn}/>
    <Route path='publisher' component={PublisherPage}/>
    <Route path="mood" component={MoodboardPage} />
    <Route path="forget" component={ForgetPasswordPage} />
    <Route path="signin" component={()=>(<SignInPage visible={true}/>)} />
    <Route path="signup" component={()=>(<SignUpPage visible={true}/>)} />
    <Route path='editor' component={PublisherEditor} onEnter={getPublisherId}>
      <IndexRoute component={PublisherDashboardPage} onEnter={getPublisherId}/>
      <Route path='settings' component={PublisherSettingPage} onEnter={getPublisherId}/>
      <Route path='stories' component={PublisherStoryPage} onEnter={getPublisherId}/>
      <Route path='contact' component={PublisherContactAndAboutPage} onEnter={getPublisherId}/>
      <Route path='stories/new' component={NewStory}/>
      <Route path='columns/:cid' >
        <Route path='settings' component={ColumnSettingPage} onEnter={getColumnId}/>
      </Route>
    </Route>
    <Route path='me' component={UserSetting} onEnter={getUserId}>
      <Route path='settings' component={UserSettingProfile} onEnter={getUserId}/>
      <Route path='settings/account' component={UserSettingAccount} onEnter={getUserId}/>
      <Route path='stories' component={UserSettingStory} onEnter={getUserId}/>
      <Route path='stories/drafts' component={UserSettingProfile}/>
    </Route>
    <Route path='@:username' component={UserStory}/>
  </Route>
)

export default routes
