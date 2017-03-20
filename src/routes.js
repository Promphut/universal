import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App'
import auth from 'components/auth'
import Cookies from 'react-cookie'
import Request from 'superagent'
import _ from 'lodash'
import {
    HomePage2, Page3, MoodboardPage, SignInPage, SignUpPage,
    PublisherDashboardPage,ColumnEditor,ColumnSettingPage,PublisherStoryPage,UserSetting,
    PublisherSettingPage, ForgetPasswordPage, PublisherEditor, PublisherContactAndAboutPage,
    UserSettingProfile, UserSettingAccount, UserSettingStory, ColumnPage, PublisherPage,
    UserStory, AllStory, AllColumn, NewStory, NotFoundPage, ErrorPage, AboutPage, ContactPage
  } from 'components'
import api from './api'


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

// =====================================

const toSignin = (nextState, replace, next) => {
  return () => {
    replace({
      pathname:'/signin',
      state: { nextPathname: nextState.location.pathname }
    })
    next()
  }
}

const toError = (nextState, replace, next) => {
  return (err) => {
    replace({
      pathname: '/error',
      state: { error: err }
    })
    next()
  }
}

const loggedIn = (nextState, replace, next) => {
  //console.log('auth', auth.loggedIn())
  if(auth.loggedIn()) return next()
  toSignin(nextState, replace, next)()
}

const getUserFromUsername = (nextState, replace, next) => {
  api.getUserFromUsername(nextState.params.username)
  .then(user => {
    nextState.params.user = user
    next()
  })
  .catch(toError(nextState, replace, next))
}

// const syncTokenAndCookie = (nextState, replace, next) => {
//   // auth token might be sent via querystring, login
//   let query = nextState.location.query

//   let token = (query && query.token) ? query.token : null

//   let cookie = null
//   try {
//     cookie = (query && query.cookie) ? JSON.parse(query.cookie) : null
//   }
//   catch(e) {}

//   auth.syncTokenAndCookie(token, cookie)

//   next()
// }

const logout = (nextState, replace, next) => {
  auth.logout(() => {
    window.location = '/'
  })
}

const routes = (
  <Route path="/" component={App} >
    {/*<IndexRoute component={HomePage2} onEnter={syncTokenAndCookie}/>*/}
    <IndexRoute component={HomePage2} />
    <Route path='article' component={Page3}/>
    <Route path='stories'>
      <IndexRoute component={AllStory}/>
      <Route path='columns' component={AllColumn}/>
      <Route path=':columns' component={ColumnPage}/>
    </Route>
    <Route path='publisher' component={PublisherPage}/>
    <Route path="mood" component={MoodboardPage} />
    <Route path="about" component={AboutPage} />
    <Route path="contact" component={ContactPage} />

    <Route path="forget" component={ForgetPasswordPage} />
    <Route path="signin" component={()=>(<SignInPage visible={true}/>)} />
    <Route path="signup" component={()=>(<SignUpPage visible={true}/>)} />
    <Route path="logout" onEnter={logout} />

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

    <Route path='me' component={UserSetting} onEnter={loggedIn}>
      <Route path='settings' component={UserSettingProfile}/>
      <Route path='settings/account' component={UserSettingAccount}/>
      <Route path='stories' component={UserSettingStory}/>
      <Route path='stories/drafts' component={UserSettingProfile}/>
    </Route>

    <Route path='@:username' onEnter={getUserFromUsername} component={UserStory}/>

    <Route path='error' component={ErrorPage}/>
    <Route path='404' component={NotFoundPage}/>
    <Route path='*' component={NotFoundPage}/>
  </Route>
)

export default routes
