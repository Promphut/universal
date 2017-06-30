import React from 'react'
import PropTypes from 'prop-types'
import api from 'components/api'
import utils from '../../../services/utils'
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
			url = config.FRONTURL + this.props.location.pathname
		}
		api.shorten(url, {medium:'social', source:'twitter'})
		.then(done)
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.url && this.props.url != nextProps.url){
			api.shorten(nextProps.url, {medium:'social', source:'twitter'})
			.then(res => {
				this.setState({url: res.url})
			})
		}
	}

	componentDidMount(){
		// Handel url
		this.getUrl(res => {
			//console.log('URL', res)
			this.setState({url: res.url})
		})

		// Handle story insight
		let sid = this.props.sid
		if(sid==null) sid = utils.getTrailingSid(this.props.url)

		// The story page will have sid, else just ignore.
		if(sid!=null){ 
			// When twt button clicked
			// add event to DOM element 
			//console.log('before tweet')
			this.a.addEventListener('tweetStory', function(event){
				//console.log('tweetStory', sid, event)
				api.incStoryInsight(sid, 'share', 'share_twt')

				//this.a.removeEventListener('tweetStory')
			})
		} 
	}

	render(){
		// Set url
		let url = this.state.url

		// Set hashtags
		let hashtags = this.props.hashtags
		if(hashtags==null) hashtags = config.NAME

		return <a href={utils.getTweetUrl(url, hashtags)} ref={(_a) => {this.a = _a}}>{this.props.button}</a>;
	}
}

export default withRouter(TwtShareButton)