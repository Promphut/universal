import React from 'react'
import PropTypes from 'prop-types'
import {TopBar, TopNavigation, TopBarWithShare, Stick} from 'components'
import auth from 'components/auth'
import api from 'components/api'
import { withRouter } from 'react-router'
import utils from '../../../services/clientUtils'
import { parse } from 'query-string'

class TopBarWithNavigation extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	static propTypes = {
		title: PropTypes.string
	}

	constructor(props) {
		super(props)

		this.state = {
			scrolling: false,
	    	status: 'LOADING'
		}
	}

	// handleNavbarMouseOver(){
	// 	if (utils.getScrollY() <= 60)
	// 		this.setState({scrolling: true})
	// }

	// handleNavbarMouseOut(){
	// 	if (utils.getScrollY() <= 60)
	// 		this.setState({scrolling: false})
	// }

	handleScroll = (e) => {
		//console.log('HAHAH')
		let top = e.srcElement.body.scrollTop,
			scrolling = this.state.scrolling

		if (top > 60 && !scrolling)
			this.setState({scrolling: true})

		else if (top <= 60 && scrolling)
			this.setState({scrolling: false})
	}

	componentDidMount(){
		// Get from cookie, else get from query
		//let token = browserHistory.getCurrentLocation().query.token || auth.getToken()
		let query = parse(this.props.location.search)
		let token = query ? query.token : auth.getToken()

		// 1. Fetch menu, user, and roles information
		api.getCookieAndToken(token)
		.then(result => {
			//console.log('TopBarWithNavigation', result)
			// 2. Update newly fetch cookie
			auth.setCookieAndToken(result)

			// 3. Set the state to "loggedin" or "unloggedin"
			this.menu = result.menu
			this.user = result.user
			this.roles = result.roles
			//console.log('TopBarWithNavigation', this.menu, this.user, this.roles)

			if(this.user && token)
				this.setState({
					status: 'LOGGEDIN'
				})
			else
				this.setState({
					status: 'UNLOGGEDIN'
				})
		})
	}

	render () {
		let {theme} = this.context.setting.publisher
		let {scrolling, scroll, status} = this.state
		let {title, article, notShowNav, editButton, hasCover} = this.props
		let transparent = false
		let articleMobile = false

		// titleText = 'Article'
		let children = ''
		if (article) {
			// console.log('article', article)
			if (article.length > 80) {
				article = article.substring(0, 80) + '...'
			}
			children = <h4 className="menu-font">{article}</h4>
			transparent = true

			if (utils.isMobile()) {
				articleMobile = true
			}
		} else if (!notShowNav) {
			children = <TopNavigation menu={this.menu} />
		}

	  	return (
			<Stick className={this.props.className} fixed={(articleMobile && hasCover) ? !scrolling : ''}>
				{articleMobile ?
					<TopBarWithShare
						onScroll={this.handleScroll}
						scrolling={scrolling}
						status={status}
						title={title}
						user={this.user}
						menu={this.menu}
						transparent={transparent}
						editButton={editButton}
						hasCover={hasCover}
					> {children}
					</TopBarWithShare> :
					<TopBar
						onScroll={this.handleScroll}
						scrolling={scrolling}
						status={status}
						title={title}
						user={this.user}
						menu={this.menu}
						transparent={transparent}
						editButton={editButton}
						hasCover={hasCover}
						onLoading={this.props.onLoading}
					> {children}
					</TopBar>
				}
			</Stick>
	  	)
	}
}

export default withRouter(TopBarWithNavigation);