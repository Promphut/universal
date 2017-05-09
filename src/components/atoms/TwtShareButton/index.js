import React from 'react'
import PropTypes from 'prop-types'
import api from 'components/api'
import utils from '../../../services/clientUtils'
import config from '../../../config'
import { withRouter } from 'react-router'

class TwtShareButton extends React.Component {
	static propTypes = {
		button: PropTypes.node.isRequired,
		hashtags: PropTypes.string, // optional, a string comma seperated, default is publisher name
		sid: PropTypes.number, // optional, default will try to pick sid from url, unless storyinsight won't be saved.
		url: PropTypes.string // optional, default is this window.location url. If url presented with /:sid, no need to input sid, it will auto get from the url.
	}

	constructor(props) {
		super(props)

		this.state = { url:'' }
	}

	getUrl = (done) => {
		let url = this.props.url
		if(!url){
			config.FRONTURL + this.props.location
		}
		api.shorten(url, {medium:'social', source:'twitter'})
		.then(done)
	}

	componentDidMount(){
		// Handle story insight
		let sid = this.props.sid
		if(sid==null) sid = utils.getTrailingSid(this.props.url)

		// The story page will have sid, else just ignore.
		if(sid!=null){ 
			// When twt button clicked
			// add event to DOM element 
			this.a.addEventListener('tweetStory', function(event){
				//console.log('tweetStory', sid, self.props.url, event)
				api.incStoryInsight(sid, 'share', 'share_twt')
			})
		} 

		// Handel url
		this.getUrl(res => {
			//console.log('URL', res)
			this.setState({url: res.url})
		})
	}

	render(){
		// Set url
		let url = this.state.url || this.props.sid

		// Set hashtags
		let hashtags = this.props.hashtags
		if(hashtags==null) hashtags = config.NAME

		return <a href={utils.getTweetUrl(url, hashtags)} ref={(_a => this.a = _a)}>{this.props.button}</a>
	}
}

TwtShareButton.propTypes = {
  button: PropTypes.node.isRequired,
  hashtags: PropTypes.string, // optional, a string comma seperated, default is publisher name
  sid: PropTypes.number, // optional, default will try to pick sid from url, unless storyinsight won't be saved.
  url: PropTypes.string // optional, default is this window.location url. If url presented with /:sid, no need to input sid, it will auto get from the url.
};

export default withRouter(TwtShareButton)