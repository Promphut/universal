import React from 'react';
import styled from 'styled-components'
import CopyToClipboard from 'react-copy-to-clipboard'
import api from 'components/api'
import utils from '../../../services/utils'
import config from '../../../config'

const ImageShareContainer = styled.div `
  display: ${props=>props.open==true?'flex':'none;'};
  left: ${props => props.posLeft}px;
  top: ${props => props.posTop}px;
  position: absolute;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  z-index:3;
`

const SocialItem = styled.a `
  order: ${props => props.order};
  color: white;
  background-color: ${props => props.BGColor};

  &:hover {
		color: white !important;
    background-color: ${props => props.BGDarkColor};
	}
`

const SocialIcon = styled.i `
  height: auto;
  margin: 20px 20px 20px 20px;
  font-size: 20px;
`

export default class ImageShare extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      url:'',
      posTop: 0,
      posLeft: 0,
      open:false,
      open2:false,
      topen:false
    }
  }

  //Get shorten url based on current page
  getUrl = (done) => {
    let url = this.props.url
    if(!url){
      url = window.location.href
    }
    api.shorten(url, {medium:'social'})
    .then(done)
  }

  handleFbShare = (e) => {
    // Get sid
    let sid = this.props.sid
    if(sid==null) sid = utils.getTrailingSid(this.state.url)
    if(sid!=null) api.incStoryInsight(sid, 'share', 'share_fb')
    //console.log(sid)
    this.getUrl(res => {
      //console.log('URL', res)

      // Set hashtags
      let hashtag = this.props.hashtag
      if(hashtag==null) hashtag = '#'+config.NAME

      FB.ui({
        method: 'share',
        display:'dialog',
        hashtag: hashtag,
        href: res.url,
      }, function(response){
      })
    })
  }

  onStoryCopied (val) {
    val = utils.getTrailingSid(val)
    if(val!=null) api.incStoryInsight(val, 'share', 'share_dark')
  }

  getPos = (el)=> {
    // yay readability
    for (var lx=0, ly=0;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    this.setState({
      posLeft:lx,
      posTop:ly
    })
  }

  hadleMouseEnter = (e) => {
    this.getPos(e.currentTarget)
    this.setState({
      open: true,
    },()=>this.checkOpen());
  }

  mouseEnter = (e)=>{
    this.setState({
      open2:true
    },()=>this.checkOpen())
  }

  mouseLeave = (e)=>{
    this.setState({
      open2:false
    },()=>this.checkOpen())
  }

  checkOpen = ()=>{
    var {open,open2} = this.state
    if(open==false&&open2==false) this.setState({topen:false})
    else this.setState({topen:true})
  }

  componentDidMount(){
    // Handel url
    this.getUrl(res => {
      // console.log('URL', res.url)
      this.setState({url: res.url})
    })
    var self  =  this
    this.imgContainer = document.querySelectorAll('img.ui-sortable-handle')
    var eventList = [].forEach.call(this.imgContainer,function(e){e.addEventListener('mouseenter',function(e){
      self.hadleMouseEnter(e)
    })})
    var eventList2 = [].forEach.call(this.imgContainer,function(e){e.addEventListener('mouseleave',function(e){
      self.setState({
        open: false,
      },()=>self.checkOpen());
    })})
  }

  componentWillUnmount(){
    var eventList = [].forEach.call(this.imgContainer,function(e){e.removeEventListener('mouseenter')})
    var eventList2 = [].forEach.call(this.imgContainer,function(e){e.removeEventListener('mouseleave')})
  }

  render () {
    // Set url
		let url = this.state.url

		// Set hashtags
		let hashtags = this.props.hashtags
		if(hashtags==null) hashtags = config.NAME
    var o = this.checkOpen
    return (
      <ImageShareContainer onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} open={this.state.topen} posLeft = {this.state.posLeft} posTop = {this.state.posTop} id='shareImg'>
        <SocialItem onClick={this.handleFbShare} target="_blank" BGColor = {"#38559c"} BGDarkColor = {"#052269"} order = {"1"}><SocialIcon className = "fa fa-facebook" aria-hidden="true"></SocialIcon></SocialItem>
        <SocialItem href = {utils.getTweetUrl(url, hashtags)} target="_blank" BGColor = {"#35a9e0"} BGDarkColor = {"#0276AD"} order = {"2"}><SocialIcon className = "fa fa-twitter" aria-hidden="true"></SocialIcon></SocialItem>

        <CopyToClipboard SocialItem text={url} onCopy={this.onStoryCopied.bind(this)}>
          <SocialItem BGColor = {"#c7c7c7"} BGDarkColor = {"#949494"} order = {"3"}>
            <SocialIcon className = "fa fa-link" aria-hidden="true"></SocialIcon>
          </SocialItem>
        </CopyToClipboard>
        
      </ImageShareContainer>
    )
  }

}
