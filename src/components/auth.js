import Request from 'superagent'
import helpers from './helpers'
import Cookies from 'react-cookie'
import _ from 'lodash'
const ROLES = {
  MEMBER: 0, 
  EDITOR: 1, 
  WRITER: 2, 
  ADMIN: 3
}
var auth = {}
auth = {

  // login(email, pass, cb) {
  //   cb = arguments[arguments.length - 1]
  //   if (auth.getToken()) {
  //     if (cb) cb(true)
  //     //this.onChange(true)
  //     return
  //   }
  //   api.login(email, pass, (res) => {

  //     if (res.authenticated) {
  //       //helpers.setCookieAndToken(res)
  //       if (cb) cb(true)
  //       //this.onChange(true)
  //     } else {
  //       if (cb) cb(false)
  //       //this.onChange(false)
  //     }
  //   })
  // },

  // signup(email, pass, cb){
  //   Request
  //   .post(config.BACKURL + '/users')
  //   .send({email: email, password: pass})
  //   .set('Accept', 'application/json')
  //   .end((err, res) => {
  //     //console.log('err res', err, res)
  //     if(!err && res.ok && res.body.token) {
  //       helpers.setCookieAndToken(res.body)
  //       // Only cookie.user, but no cookie.menu to set for a newly registered user
  //       if(cb) cb(true)
  //     }
  //     else if (cb) cb(false)
  
  //   })

  // },

  setCookieAndToken(cookieAndToken){
    //if(!cookieAndToken || cookieAndToken.token==null || !cookieAndToken.cookie) return 
    if(cookieAndToken.token) helpers.set('token', cookieAndToken.token)
    if(cookieAndToken.user) helpers.setJSON('user', cookieAndToken.user)
    if(cookieAndToken.roles) helpers.setJSON('roles', cookieAndToken.roles)
    if(cookieAndToken.menu) helpers.setJSON('menu', cookieAndToken.menu)
  },

  // syncTokenAndCookie(token, cookie){
  //   if(token==null || cookie==null) return 
  //   helpers.setCookieAndToken({token: token, cookie: cookie})
  // },

  getToken() {
    //console.log('getToken', helpers.get('token'))
    return helpers.get('token')
  },

  getUser(){
    return helpers.getJSON('user')
  },

  getRoles(){
    return helpers.getJSON('roles')
  },

  // setCookieAndToken(tokenAndCookie){
  //   helpers.setCookieAndToken(tokenAndCookie)
  // },

  // updateCookie(cb) {
  //   let token = auth.getToken()
  //   //console.log('token', token)
  //   Request
  //   .get(config.BACKURL + '/me/menu' + (token ? '?token='+token : ''))
  //   .set('Accept', 'application/json')
  //   .end((err, res) => {
  //     if(err || !res.ok) return 
  //     //console.log('updateCookie', res.body)
  //     // Set cookie
  //     helpers.setCookieAndToken(res.body)

  //     //console.log('updateCookie', auth.getToken(), auth.getMenu())

  //     if(cb) cb(res.body)
  //   })
  // },

  isAdmin(pid){
    pid = parseInt(pid)
    if(_.isNaN(pid)) throw new Error('pid must be specified.')

    let user = helpers.getUser(), 
        roles = helpers.getRoles()

    return _.filter(roles, {type:ROLES.ADMIN, user:user._id, publisher:pid}).length > 0 
    // let cookie = helpers.getCookie()
    // return _.filter(cookie.roles, {type:ROLES.ADMIN, user:cookie.user._id, publisher:pid}).length > 0 
  },

  isWriter(cid){
    cid = parseInt(cid)
    if(_.isNaN(cid)) throw new Error('cid must be specified.')

    let user = helpers.getUser(), 
        roles = helpers.getRoles()

    return _.filter(roles, {type:ROLES.WRITER, user:user._id, column:cid}).length > 0 
    // let cookie = helpers.getCookie()
    // return _.filter(cookie.roles, {type:ROLES.WRITER, user:cookie.user._id, column:cid}).length > 0 
  },

  isEditor(cid){
    cid = parseInt(cid)
    if(_.isNaN(cid)) throw new Error('cid must be specified.')
    
    let user = helpers.getUser(), 
        roles = helpers.getRoles()

    return _.filter(roles, {type:ROLES.EDITOR, user:user._id, column:cid}).length > 0 
    // let cookie = helpers.getCookie()
    // return _.filter(cookie.roles, {type:ROLES.EDITOR, user:cookie.user._id, column:cid}).length > 0 
  },


  // socialLogin(token, cookie, cb){
  //   //console.log('socialLogin', token, cookie)
  //   if(token==null || cookie==null) return 

  //   helpers.setCookieAndToken({token: token, cookie: cookie})

  //   if(cb) cb
  // },

  

  // getMenu() {
  //   let cookie = helpers.getCookie()
  //   //console.log('cookie', cookie)
  //   return (cookie && cookie.menu)? cookie.menu : null
  // },

  // getUser(){
  //   let cookie = helpers.getCookie()
  //   //console.log('cookie', cookie)
  //   return (cookie && cookie.user)? cookie.user : null
  // },

  logout(cb) {
    helpers.remove('token')
    helpers.remove('user')
    helpers.remove('roles')
    // except menu

    //helpers.remove('cookie')
    //console.log('REMOVE!', cb)
    if (cb) cb()
    //this.onChange(false)
  },

  loggedIn() {
    //console.log('token', auth.getToken(), auth.getUser())
    return !!auth.getToken() && !!auth.getUser()
  },

  //onChange() {}
}

module.exports = auth