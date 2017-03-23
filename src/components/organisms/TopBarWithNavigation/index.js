import React, {PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {TopBar, TopNavigation, Stick} from 'components'
import auth from 'components/auth'
import api from 'components/api'

const TopBarWithNavigation = React.createClass({
	getInitialState(){
	    return {
	    	//loggedIn: false,
	    	scrolling: false,

	    	status: 'LOADING'
	    }
	},

	handleNavbarMouseOver(){
		if (window.getScrollY() <= 60)
			this.setState({scrolling: true})
	},

	handleNavbarMouseOut(){
		if (window.getScrollY() <= 60)
			this.setState({scrolling: false})
	},

	componentWillMount(){
		// Get from cookie, else get from query
		let token = browserHistory.getCurrentLocation().query.token || auth.getToken()

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
	},

	handleScroll(e) {
		let top = e.srcElement.body.scrollTop,
			scrolling = this.state.scrolling

		if (top > 60 && !scrolling)
			this.setState({scrolling: true})

		else if (top <= 60 && scrolling)
			this.setState({scrolling: false})
	},

	render () {
		const {scrolling, status} = this.state
		let {title, article, notShowNav} = this.props
		let transparent = false

		// titleText = 'Article'
		let children = ''
		if (article) {
			children = <h4 className="menu-font">{article}</h4>
			transparent = true
		} else if (!notShowNav) {
			children = <TopNavigation menu={this.menu} />
		}

	  return (
			<Stick>
				<TopBar
					onScroll={this.handleScroll}
					scrolling={this.state.scrolling}
					status={status}
					title={title}
					user={this.user}
					menu={this.menu}
					transparent={transparent}
				>
					{children}
				</TopBar>
			</Stick>
	  )
	}
})

TopBarWithNavigation.propTypes = {
	title: PropTypes.string
}

export default TopBarWithNavigation;
