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
    UserStory, AllStory, AllColumn, NewStory, NotFoundPage, ErrorPage, AboutPage, ContactPage, StoryPage,
    EditStory
  } from 'components'
import api from 'components/api'

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
    console.log('err', err)
    replace({
      pathname: '/error',
      state: { error: err }
    })
    next()
  }
}

const loggedIn = (nextState, replace, next) => {
  //console.log('loggedIn', auth.loggedIn())
  if(auth.loggedIn()) return next()
  toSignin(nextState, replace, next)()
}

const hasRoles = (roles) => {
  return (nextState, replace, next) => {
    let authorized = false,
        user = auth.getUser(), 
        roles = auth.getRoles() || []

    if(!user) return toSignin(nextState, replace, next)()

    roles.forEach(role => {
      role = _.capitalize(role)
      let compare

      if(role==='ADMIN') compare = {type:ROLES.ADMIN, user:user._id, publisher:nextState.params.pid || nextState.location.query.pid}
      else if(role==='EDITOR') compare = {type:ROLES.EDITOR, user:user._id, column:nextState.params.cid || nextState.location.query.cid}
      else if(role==='WRITER') compare = {type:ROLES.WRITER, user:user._id, column:nextState.params.cid || nextState.location.query.cid}
      
      authorized = authorized || (_.filter(roles, compare).length > 0)
    })

    //console.log('authorized', authorized)
    
    if(!authorized) return toError(nextState, replace, next)(new Error('Unauthorized access'))

    next()
  }
}

const getUserFromUsername = (nextState, replace, next) => {
  api.getUserFromUsername(nextState.params.username)
  .then(user => {
    nextState.params.user = user
    next()
  })
  .catch(toError(nextState, replace, next))
}

const getColumnFromSlug = (nextState, replace, next) => {
  api.getColumnFromSlug(nextState.params.columnSlug)
  .then(col => {
    nextState.params.column = col
    next()
  })
  .catch(toError(nextState, replace, next))
}

const getStoryFromSid = (nextState, replace, next) => {
  api.getStoryFromSid(nextState.params.sid)
  .then(story => {
    nextState.params.story = story
    next()
  })
  .catch(toError(nextState, replace, next))
}

const logout = (nextState, replace, next) => {
  auth.logout(() => {
    window.location = '/'
  })
}

const routes = (
  <Route path="/" component={App} >
    {/*<IndexRoute component={HomePage2} onEnter={syncTokenAndCookie}/>*/}
    <IndexRoute component={HomePage2} />
    {/*<Route path='article' component={Page3}/>*/}
    <Route path='stories'>
      {/*<IndexRoute component={AllStory}/>*/}
      <Route path='columns' component={AllColumn}/>
      <Route path=':columnSlug' component={ColumnPage} onEnter={getColumnFromSlug}/>
      <Route path=':columnSlug/:storySlug/:sid' component={StoryPage} onEnter={getStoryFromSid}/>
    </Route>

    <Route path='publisher' component={PublisherPage} onEnter={hasRoles([])}/>
    <Route path="mood" component={MoodboardPage} />
    <Route path="about" component={AboutPage} />
    <Route path="contact" component={ContactPage} />

    <Route path="forget" component={ForgetPasswordPage} />
    <Route path="signin" component={()=>(<SignInPage visible={true}/>)} />
    <Route path="signup" component={()=>(<SignUpPage visible={true}/>)} />
    <Route path="logout" onEnter={logout} />

    <Route path='editor' component={PublisherEditor} onEnter={hasRoles(['ADMIN', 'WRITER', 'EDITOR'])}>
      <IndexRoute component={PublisherDashboardPage} />
      <Route path='settings' component={PublisherSettingPage}/>
      <Route path='stories' component={PublisherStoryPage} />
      <Route path='contact' component={PublisherContactAndAboutPage}/>
      <Route path='stories/new' component={NewStory}/>
      <Route path='stories/:sid/edit' component={EditStory}/>
      <Route path='columns/:cid' >
        <Route path='settings' component={ColumnSettingPage} onEnter={getColumnId}/>
      </Route>
    </Route>

    <Route path='me/stories/:sid' component={StoryPage} onEnter={getStoryFromSid}/>
    <Route path='me' component={UserSetting} onEnter={loggedIn}>
      <Route path='settings' component={UserSettingProfile}/>
      <Route path='settings/account' component={UserSettingAccount}/>
      <Route path='stories' component={UserSettingStory}/>
      {/*<Route path='stories/drafts' component={UserSettingProfile}/>*/}
    </Route>

    <Route path='@:username' onEnter={getUserFromUsername} component={UserStory}/>
    <Route path='@:username/stories/:storySlug/:sid' onEnter={getStoryFromSid} component={StoryPage}/>

    <Route path='error' component={ErrorPage}/>
    <Route path='404' component={NotFoundPage}/>
    <Route path='*' component={NotFoundPage}/>
  </Route>
)

export default routes
