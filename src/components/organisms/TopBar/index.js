import React, {Component, PropTypes} from 'react';
import {findDOMNode as dom} from 'react-dom'
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import styled from 'styled-components'

import {PrimaryButton, SecondaryButton, Logo, Drawer, LeftNavigation, RightNavigation} from 'components'

const Wrapper = styled.div`
	* { 
		margin: 0; 
		padding: 0; 
	} 

	/* === For Bar-on-top class === */
	.bar-on-top #container-bar {
		background:none;
		border:0;
	}
	.bar-on-top #container-bar .logo {
		fill: #e2e2e2;
	}
	.bar-on-top #container-bar #not-login * {
		color: #e2e2e2;
	}
	.bar-on-top #container-bar .secondary-btn button {
		border-color: #fff !important;
	}
	.bar-on-top #container-bar .secondary-btn button span {
		color: #fff !important;
	}
	.bar-on-top #ld-toggle-area > span {
		background: #e2e2e2; 
		box-shadow: 0 6px 0 #e2e2e2, 0 12px 0 #e2e2e2; 
	}
	.bar-on-top #top-nav ul li a {
		color: #e2e2e2;
	}
	
`

const DarkMenuItem = styled(MenuItem)`
	background-color: #222;
	color: White;
`

const HideOnTablet = styled.div`
	/* PORTRAIT TABLET */
	@media (max-width: 640px) {
		display:none;
	}
`

const Container = styled.div`
	width: 100%; 
	position: fixed; 
	left: 0px; 
	background: #FFF; 
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	line-height: 60px; 
	z-index: 1; 
	height:60px;
	padding:0 70px;
	border-bottom: 1px solid #e2e2e2;

	> * {
		flex: 1 0;
	}
`

const EmptyBlock = styled.span`
	content: ''; 
	display: block; 
	position: absolute; 
	height: 2px; 
	width: 20px; 
	left: 20px; 
	top: 23px; 
	background: #8d8d8d; 
	box-shadow: 0 6px 0 #8d8d8d, 0 12px 0 #8d8d8d; 
`

const ProfileAvatar = styled(Avatar)`
	right: 15px;
	top: 15px;
	position: absolute; 
`

const NotLogin = styled.div`
	width: 180px;
	display: inline-block;
	margin-right: -40px;

	& * {
		color: #8f8f8f;
	}

	& a:hover {
		text-decoration: underline;
	}
`

const TopBar = React.createClass({
	getInitialState(){
	    return{
	    	
	    }
	},

	componentDidMount() {
		if(this.props.onScroll) window.addEventListener('scroll', this.handleScroll);
	},

	componentWillUnmount() {
		if(this.props.onScroll) window.removeEventListener('scroll', this.handleScroll);
	},

	handleScroll(e) {
		this.props.onScroll(e)
	},

	render(){
		let loggedIn = this.props.loggedIn

		return (
			<Wrapper className="menu-font">
				<div className={this.props.scrolling || 'bar-on-top'}>
					<Drawer name="ld" position="left" toggleIcon={<EmptyBlock/>}>
						<LeftNavigation/>
					</Drawer>

					<Container id="container-bar">
	   					<header>
	   						<Link to="/#tohome" id="logo" title={this.props.title} style={{display:'block', marginTop:3}}><Logo fill={'#00B2B4'}/></Link>
	   					</header>

	   					{this.props.children}

						<div style={{textAlign:'right'}}>
							{loggedIn ? 
								(<HideOnTablet><PrimaryButton label="Story" iconName="add" style={{verticalAlign:'middle'}}/></HideOnTablet>) : 
								(<NotLogin id="not-login"><SecondaryButton label="Sign Up" style={{verticalAlign:'middle'}}/><span>&nbsp; or </span><Link to="/#tologin" style={{fontWeight:'bold'}}>Sign In</Link></NotLogin>
							)}
						</div>
					</Container>

					{loggedIn && (
					<Drawer name="rd" position="right" toggleIcon={<ProfileAvatar src="/tmp/avatar.png" size={30}/>}>
						<RightNavigation/>
					</Drawer>)}
		        </div>
			</Wrapper>
		)
	}
})

TopBar.propTypes = {
  onScroll: PropTypes.func,
  scrolling: PropTypes.bool,
  loggedIn: PropTypes.bool,
  title: PropTypes.string
}

export default TopBar;