import Request from 'superagent'
import cookies from './cookies'
import _ from 'lodash'

const ROLES = {
  MEMBER: 0, 
  EDITOR: 1, 
  WRITER: 2, 
  ADMIN: 3
}

let auth = {}
auth = {
  setCookieAndToken(cookieAndToken){
    if(cookieAndToken.token) cookies.set('token', cookieAndToken.token)
    if(cookieAndToken.user) cookies.setJSON('user', cookieAndToken.user)
    if(cookieAndToken.roles) cookies.setJSON('roles', cookieAndToken.roles)
    if(cookieAndToken.menu) cookies.setJSON('menu', cookieAndToken.menu)
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

  isAdmin(pid){
    pid = parseInt(pid)
    if(_.isNaN(pid)) throw new Error('pid must be specified.')

    let user = cookies.getUser(), 
        roles = cookies.getRoles()

    return _.filter(roles, {type:ROLES.ADMIN, user:user._id, publisher:pid}).length > 0 
  },

  isWriter(cid){
    cid = parseInt(cid)
    if(_.isNaN(cid)) throw new Error('cid must be specified.')

    let user = cookies.getUser(), 
        roles = cookies.getRoles()

    return _.filter(roles, {type:ROLES.WRITER, user:user._id, column:cid}).length > 0 
  },

  isEditor(cid){
    cid = parseInt(cid)
    if(_.isNaN(cid)) throw new Error('cid must be specified.')
    
    let user = cookies.getUser(), 
        roles = cookies.getRoles()

    return _.filter(roles, {type:ROLES.EDITOR, user:user._id, column:cid}).length > 0 
  },

  logout(cb) {
    cookies.remove('token')
    cookies.remove('user')
    cookies.remove('roles')
    // except menu

    if (cb) cb()
  },

  loggedIn() {
    return !!auth.getToken() && !!auth.getUser()
  }
}

module.exports = auth