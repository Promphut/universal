import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'components/App'
import auth from 'components/auth'
import Cookies from 'react-cookie'
import Request from 'superagent'
import _ from 'lodash'
import {
    HomePage2, Page3, MoodboardPage, SignInPage, SignUpPage,NewsPage,
    PublisherDashboardPage,ColumnEditor,ColumnSettingPage,PublisherStoryPage,UserSetting,
    PublisherSettingPage, ForgetPasswordPage, PublisherEditor, PublisherContactAndAboutPage,
    UserSettingProfile, UserSettingAccount, UserSettingStory, ColumnPage, PublisherPage,
    UserStory, AllStory, AllColumn, NewStory, NotFoundPage, ErrorPage, AboutPage, ContactPage, StoryPage,
    EditStory,TagPage, PublisherInsightStories,PublisherInsightColumns, PublisherInsightWriters
  } from 'components'
import api from 'components/api'


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
    console.error('err', err)
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

// bypassCidCheck : true/false (default = true) is the flag to bypass cid check for editor and writer.
// if this flag is set to false, it will check role type, user, and cid.
// if this is true, it will optimistically ignore cid, just check only role type and user.
const hasRoles = (roles, bypassCidCheck) => {
  return (nextState, replace, next) => {
    let user = auth.getUser(),
        cid = nextState.params.cid || nextState.location.query.cid
    //console.log('hasRoles', user, cid, roles, bypassCidCheck, auth.hasRoles(roles, cid, bypassCidCheck))
    if(!user) return toSignin(nextState, replace, next)()

    if(!auth.hasRoles(roles, cid, bypassCidCheck))
      return toError(nextState, replace, next)(new Error('Unauthorized access'))

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

const getUserFromUserId = (nextState, replace, next) => {
  api.getUserFromUserId(nextState.params.uid)
  .then(user => {
    nextState.params.user = user
    next()
  })
  .catch(toError(nextState, replace, next))
}

const getColumnFromSlug = (nextState, replace, next) => {
  //console.log(nextState.params.columnSlug)
  api.getColumnFromSlug(nextState.params.columnSlug)
  .then(col => {
    nextState.params.column = col
    next()
  })
  .catch(toError(nextState, replace, next))
}

const getStoryFromSid = (opt) => {
  opt = _.assign({
    countView:false
  }, opt)

  return (nextState, replace, next) => {
    api.getStoryFromSid(nextState.params.sid, auth.getToken(), opt.countView)
    .then(result => {
      nextState.params.story = result.story
      nextState.params.canEditStory = result.canEditStory
      nextState.params.countView = opt.countView
      //console.log('getStoryFromSid', result)
      next()
    })
    .catch(toError(nextState, replace, next))
  }
}

const getTagFromTagSlug = (nextState, replace, next) => {
  api.getTagFromTagSlug(nextState.params.tagSlug)
  .then(tag => {
    nextState.params.tag = tag
    next()
  })
  .catch(toError(nextState, replace, next))
}

const canEditStory = (nextState, replace, next) => {
  api.getStoryFromSid(nextState.params.sid, auth.getToken(), false)
  .then(result => {
    if(!result.canEditStory) return toError(nextState, replace, next)

    nextState.params.story = result.story
    nextState.params.canEditStory = result.canEditStory
    //console.log('getStoryFromSid', result)
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
  <Route path="/" component={App}>
    <IndexRoute component={HomePage2} />
    <Route path="news" component={NewsPage} />

    <Route path='stories/columns' component={AllColumn}/>
    <Route path='stories/:columnSlug' component={ColumnPage} onEnter={getColumnFromSlug}/>
    {/* STORY 1: HAVE COLUMN */ }
    <Route path='stories/:columnSlug/:storySlug/:sid' component={StoryPage} onEnter={getStoryFromSid({countView:true})}/>

    {/*<Route path='publisher' component={PublisherPage}/>*/}
    <Route path="mood" component={MoodboardPage} />
    <Route path="about" component={AboutPage} />
    <Route path="contact" component={ContactPage} />

    <Route path="tags/:tagSlug" component={TagPage} onEnter={getTagFromTagSlug} />

    <Route path="forget" component={ForgetPasswordPage} />
    <Route path="signin" component={()=>(<SignInPage visible={true}/>)} />
    <Route path="signup" component={()=>(<SignUpPage visible={true}/>)} />
    <Route path="logout" onEnter={logout} />

    <Route path='editor' component={PublisherEditor}>
      <IndexRoute component={PublisherDashboardPage} onEnter={hasRoles(['ADMIN', 'EDITOR'])}/>
      <Route path='settings' component={PublisherSettingPage} onEnter={hasRoles(['ADMIN'])}/>
      <Route path='contact' component={PublisherContactAndAboutPage} onEnter={hasRoles(['ADMIN'])}/>

      <Route path='manage' component={PublisherStoryPage} onEnter={hasRoles(['ADMIN', 'EDITOR'])}/>
      <Route path='columns/:cid' onEnter={hasRoles(['ADMIN', 'EDITOR'], false)}>
        <Route path='settings' component={ColumnSettingPage}/>
      </Route>

      <Route path='stories' component={PublisherInsightStories} onEnter={hasRoles(['ADMIN', 'EDITOR'])}/>
      <Route path='columns' component={PublisherInsightColumns} onEnter={hasRoles(['ADMIN', 'EDITOR'])}/>
      <Route path='writers' component={PublisherInsightWriters} onEnter={hasRoles(['ADMIN', 'EDITOR'])}/>
    </Route>

    <Route path='me' component={UserSetting} onEnter={loggedIn}>
      <Route path='settings' component={UserSettingProfile}/>
      <Route path='settings/account' component={UserSettingAccount}/>
      <Route path='stories' component={UserSettingStory}/>

      <Route path='stories/new' component={NewStory}  onEnter={hasRoles(['ADMIN', 'WRITER', 'EDITOR'])}/>
      {/* STORY 4 */ }
      <Route path='stories/:sid/edit' component={EditStory} onEnter={canEditStory}/>
    </Route>


    <Route path='me/stories/:sid' component={StoryPage} onEnter={getStoryFromSid()}/>

    <Route path='u/:uid' onEnter={getUserFromUserId} component={UserStory}/>
    {/* STORY 3 NO COLUMN AND NO USERNAME */ }
    <Route path='u/:uid/stories/:storySlug/:sid' onEnter={getStoryFromSid({countView:true})} component={StoryPage}/>

    <Route path='@:username' onEnter={getUserFromUsername} component={UserStory}/>
    {/* STORY 2 NO COLUMN */ }
    <Route path='@:username/stories/:storySlug/:sid' onEnter={getStoryFromSid({countView:true})} component={StoryPage}/>

    <Route path='error' component={ErrorPage}/>
    <Route path='404' component={NotFoundPage}/>
    <Route path='*' component={NotFoundPage}/>
  </Route>
)

export default routes
