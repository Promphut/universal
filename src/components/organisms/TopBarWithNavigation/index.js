import React, {PropTypes} from 'react'
import {browserHistory} from 'react-router'
import {TopBar, TopNavigation} from 'components'
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
			console.log('TopBarWithNavigation', result)
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

	handleScroll(e) {
		let top = e.srcElement.body.scrollTop,
			scrolling = this.state.scrolling

		if(top > 60 && !scrolling) 
			this.setState({scrolling: true})

		else if(top <= 60 && scrolling) 
			this.setState({scrolling: false})
	},

	render(){
		let {status} = this.state

		return (
			<TopBar 
				onScroll={this.handleScroll} 
				scrolling={this.state.scrolling} 
				status={this.state.status} 
				title={this.props.title}
				onMouseOver={this.handleNavbarMouseOver} 
				onMouseOut={this.handleNavbarMouseOut}
				user={this.user}
				menu={this.menu}>
				<TopNavigation menu={this.menu} />
			</TopBar>
		)
	}
})

TopBarWithNavigation.propTypes = {
	title: PropTypes.string
}

export default TopBarWithNavigation;