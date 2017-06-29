import React from 'react';
import styled from 'styled-components'
import CopyToClipboard from 'react-copy-to-clipboard'
import api from 'components/api'
import utils from '../../../services/utils'
import config from '../../../config'

const ImageShareContainer = styled.div `

  ${'' /* Check for open state  */}
  display: ${props=>props.open==true?'flex':'none;'};

  left: ${props => props.posLeft};
  top: ${props => props.posTop};
  position: absolute;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
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
    }
  }

  componentDidMount(){
    // Handel url
    this.getUrl(res => {
      // console.log('URL', res.url)
      this.setState({url: res.url})
    })
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

  render () {

    // Set url
		let url = this.state.url

		// Set hashtags
		let hashtags = this.props.hashtags
		if(hashtags==null) hashtags = config.NAME

    return (
      <ImageShareContainer open={this.props.open} posLeft = {this.state.posLeft} posTop = {this.state.posTop}>
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
