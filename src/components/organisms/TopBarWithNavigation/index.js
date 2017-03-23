import React, {PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {TopBar, TopNavigation, Stick} from 'components'
import auth from 'components/auth'
import api from 'components/api'

const TopBarWithNavigation = React.createClass({
	getInitialState(){
	    return {
	    	loggedIn: false,
	    	scrolling: false,

	    	status: 'LOADING'
	    }
	},

	handleNavbarMouseOver(){
		if(window.getScrollY() <= 60)
			this.setState({scrolling: true})
	},

	handleNavbarMouseOut(){
		if(window.getScrollY() <= 60)
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

	render () {
		const {scrolling, status} = this.state
		let {title, titleText, notShowNav} = this.props

		const transparent = true

		let children = ''
		if (titleText) {
			children = <h4>{titleText}</h4>
		} else if (!notShowNav) {
			children = <TopNavigation menu={this.menu} />
		}

	  return (
			<Stick>
				<TopBar
					scrolling={scrolling}
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
