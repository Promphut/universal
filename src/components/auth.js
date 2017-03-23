import Request from 'superagent'
import cookies from './cookies'
import _ from 'lodash'

let auth = {}
auth = {
  setCookieAndToken(cookieAndToken){
   // console.log('setCookieAndToken', cookieAndToken)
    if(cookieAndToken.token) cookies.set('token', cookieAndToken.token)
    if(cookieAndToken.user) cookies.setJSON('user', cookieAndToken.user)
    if(cookieAndToken.roles) cookies.setJSON('roles', cookieAndToken.roles)
    //if(cookieAndToken.menu) cookies.setJSON('menu', cookieAndToken.menu)
  },

  getToken() {
    return cookies.get('token')
  },

  getUser(){
    return cookies.getJSON('user')
  },

  getRoles(){
    return cookies.getJSON('roles')
  },

  // hasRoleOf(roleName, ofId){
  //   ofId = parseInt(ofId)
  //   if(_.isNaN(ofId)) throw new Error('ofId must be specified.')

  //   return auth['is'+roleName](ofId)
  // },

  // isAdmin(pid){
  //   pid = parseInt(pid)
  //   if(_.isNaN(pid)) throw new Error('pid must be specified.')

  //   let user = cookies.getUser(), 
  //       roles = cookies.getRoles()
  //   if(!user || !roles) return false // this user hasn't logged in, authorization will be false.

  //   return _.filter(roles, {type:ROLES.ADMIN, user:user._id, publisher:pid}).length > 0 
  // },

  // isWriter(cid){
  //   cid = parseInt(cid)
  //   if(_.isNaN(cid)) throw new Error('cid must be specified.')

  //   let user = cookies.getUser(), 
  //       roles = cookies.getRoles()
  //   if(!user || !roles) return false // this user hasn't logged in, authorization will be false.

  //   return _.filter(roles, {type:ROLES.WRITER, user:user._id, column:cid}).length > 0 
  // },

  // isEditor(cid){
  //   cid = parseInt(cid)
  //   if(_.isNaN(cid)) throw new Error('cid must be specified.')
    
  //   let user = cookies.getUser(), 
  //       roles = cookies.getRoles()
  //   if(!user || !roles) return false // this user hasn't logged in, authorization will be false.

  //   return _.filter(roles, {type:ROLES.EDITOR, user:user._id, column:cid}).length > 0 
  // },

  // cid is optional but needed when checking for editor and writer.
  hasRoles(uid, roles=[], cid){
    let authorized = false
    if(uid==null) return authorized

    roles.forEach(role => {
      role = _.capitalize(role)
      let compare

      if(role==='ADMIN') compare = {type:config.ROLES.ADMIN, user:uid, publisher:config.PID}
      else if(role==='EDITOR' && cid!=null) compare = {type:config.ROLES.EDITOR, user:uid, column:cid}
      else if(role==='WRITER' && cid!=null) compare = {type:config.ROLES.WRITER, user:uid, column:cid}
      
      authorized = authorized || (_.filter(roles, compare).length > 0)
    })

    //console.log('authorized', authorized)
    return authorized
  },

  logout(cb) {
    cookies.remove('token')
    cookies.remove('user')
    cookies.remove('roles')
    // except menu

    if (cb) cb()
  },

  loggedIn() {
    //console.log('auth.loggedIn', auth.getToken(), auth.getUser())
    return !!auth.getToken() && !!auth.getUser()
  }
}

module.exports = auth