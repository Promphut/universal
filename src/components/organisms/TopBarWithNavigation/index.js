import React, {PropTypes} from 'react'
import {TopBar, TopNavigation} from 'components'
import auth from 'components/auth'
const TopBarWithNavigation = React.createClass({
	getInitialState(){
	    return{
	    	loggedIn: false,
	    	scrolling: false
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

	componentWillReceiveProps(nextProps){
		if(nextProps.loggedIn!=this.props.loggedIn){
			this.setState({
				loggedIn:nextProps.loggedIn
			})
		}
	},

	componentDidMount(){
		
	},

	componentWillMount(){
		var token = auth.getToken()
		if(token) this.setState({loggedIn:true})
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
		return (
			<TopBar onScroll={this.handleScroll} scrolling={this.state.scrolling} loggedIn={this.state.loggedIn} title={this.props.title}>
				<TopNavigation onMouseOver={this.handleNavbarMouseOver} onMouseOut={this.handleNavbarMouseOut} />
			</TopBar>
		)
	}
})

TopBarWithNavigation.propTypes = {
	loggedIn: PropTypes.bool,
	title: PropTypes.string
}

export default TopBarWithNavigation;