import React, {PropTypes} from 'react'
import socialUtil from 'components/socialUtil'
import api from 'components/api'

const FbShareButton = React.createClass({
	getInitialState(){
		return { }
	},

	handleFbShare(){
		// Get sid
		let sid = this.props.sid
		if(sid==null) sid = socialUtil.getTrailingSid(this.props.url)

		// Set url
		let url = this.props.url
		if(!url){
			let loc = window.location
			url = [loc.protocol, '//', loc.host, loc.pathname].join('')
		}

		// Set hashtags
		let hashtag = this.props.hashtag
		if(hashtag==null) hashtag = '#'+config.NAME

		FB.ui({
			method: 'share',
			display: 'popup',
			hashtag: hashtag,
			href: url
		}, function(response){
			if(sid!=null) api.incStoryInsight(sid, 'share', 'share_fb')
		})
	},

	render(){
		return <div onClick={this.handleFbShare}>{this.props.button}</div>
	}
})

FbShareButton.propTypes = {
  button: PropTypes.node.isRequired,
  hashtag: PropTypes.string, // optional, default is publisher name
  sid: PropTypes.number, // optional, default will try to pick sid from url, unless storyinsight won't be saved.
  url: PropTypes.string // optional, default is this window.location url. If url presented with /:sid, no need to input sid, it will auto get from the url.
};

export default FbShareButton