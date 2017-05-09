import config from '../../config'

const utils = {}

utils.getWidth = () => {
  return window.innerWidth || doc.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
};
utils.getHeight = () => {
  return window.innerHeight || doc.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
};

utils.getScrollX = () => {
  return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
};

utils.getScrollY = () => {
  return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
};
utils.isMobile = () => {
  //if(!navigator) return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

utils.getFbUrl = (fbid) => {
  return 'http://facebook.com/'+fbid;
};
utils.getTwtUrl = (username) => {
  return 'http://twitter.com/'+username;
};
utils.getIgUrl = (username) => {
  return 'http://instagram.com/'+username;
};
utils.getYtUrl = (username) => {
  // channel
  if(username.startsWith('UC') && username.length===24)
    return 'http://youtube.com/channel/'+username;

  // user
  return 'http://youtube.com/user/'+username;
};

// default twt tweet url
utils.getTweetUrl = (url, hashtags) => {
  return 'https://twitter.com/intent/tweet?url='+encodeURIComponent(url) + (hashtags ? '&hashtags='+hashtags : '');
};

// append UTM to url
// utm: {source, medium, campaign, content}
utils.appendUTM = (url, utm) => {
  if(!utm) return url
  return url + '?' + 
    (utm ? 'utm_source='+encodeURIComponent(utm.source || config.DOMAIN)+'&' : '') +
    (utm && utm.medium ? 'utm_medium='+encodeURIComponent(utm.medium)+'&' : '') +
    (utm && utm.campaign ? 'utm_campaign='+encodeURIComponent(utm.campaign)+'&' : '') +
    (utm && utm.content ? 'utm_content='+encodeURIComponent(utm.content)+'&' : '')
};

utils.getTrailingSid = (url) => {
  // Get sid by trailing the last param from url 
  // because all story url have trailing :sid
  //let arr = url ? url.split('/') : window.location.href.split('/')
  let arr
  if(!url) {
    if(!window) return null
    arr = window.location.href.split('/')
  }
  else arr = url.split('/')

  return parseInt(arr[arr.length-1])
};

module.exports = utils
