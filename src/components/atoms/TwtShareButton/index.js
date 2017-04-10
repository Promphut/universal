import React, {PropTypes} from 'react'
import socialUtil from 'components/socialUtil'
import api from 'components/api'

const TwtShareButton = React.createClass({
	getInitialState(){
		return { }
	},

	componentDidMount(){
		let self = this
		let sid = this.props.sid
		if(sid==null) sid = socialUtil.getTrailingSid(this.props.url)

		// The story page will have sid, else just ignore.
		if(sid!=null){ 
			// add event to DOM element 
			this.a.addEventListener('tweetStory', function(event){
				//console.log('tweetStory', sid, self.props.url, event)
				api.incStoryInsight(sid, 'share', 'share_twt')
			})
		} 
	},

	render(){
		// Set url
		let url = this.props.url
		if(!url){
			let loc = window.location
			url = [loc.protocol, '//', loc.host, loc.pathname].join('')
		}

		// Set hashtags
		let hashtags = this.props.hashtags
		if(hashtags==null) hashtags = config.NAME

		return <a href={getTweetUrl(url, hashtags)} ref={(_a => this.a = _a)}>{this.props.button}</a>
	}
})

TwtShareButton.propTypes = {
  button: PropTypes.node.isRequired,
  hashtags: PropTypes.string, // optional, a string comma seperated, default is publisher name
  sid: PropTypes.number, // optional, default will try to pick sid from url, unless storyinsight won't be saved.
  url: PropTypes.string // optional, default is this window.location url. If url presented with /:sid, no need to input sid, it will auto get from the url.
};

export default TwtShareButton