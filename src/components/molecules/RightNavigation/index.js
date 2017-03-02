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
import auth from 'components/auth'
const Nav = styled.nav`
	position: fixed; 
	top: 0; 
	right:-400px; 
	height: 100%; 
	width: 400px; 
	overflow-x: hidden; 
	overflow-y: auto; 
	-webkit-overflow-scrolling: touch; 
	z-index:4;

	background: rgba(255, 255, 255, 0.75);

	& .lighter-bg:hover {
		opacity:.8;
	}

	& hr {
		background-color: #c1c1c1 !important;
		margin: 40px 0 40px 0 !important;
	}

	& ul {
		list-style-type:none; 
		font-size: 20px; 
	}
	& ul li a {

		display: block;
		margin: 20px 70px;
		color: #222;
	}

	& ul li a:hover {
		text-decoration: underline;
		text-shadow:0px 0px 1px #222;
	}

	& .dark-menu-item {
		background-color: #222;
	}

	& .dark-menu-item a > *{
		vertical-align: middle;
	}

	& .dark-menu-item a {
		display: block;
		height: 60px;
		color: #fff;
	}
`

const CloseBtn = styled(IconButton)`
	top: 20px;
	left: 20px;
	position: absolute !important;

	& .material-icons {
		width: 30px;
		height: 30px;
		color: #8f8f8f !important;
	}
`

const Profile = styled.div`
	padding: 80px 40px 0 40px !important;

	& > * {
		vertical-align: middle;
		display: inline-block;
	}

	& > div {
		width: 240px;
		font-size: 15px;
		color: #8f8f8f;
		padding-left: 15px;
	}
`

const RightNavigation = React.createClass({
	getInitialState() {
		return { }
	},

	onSearch(){

	},


	render(){
		var user = auth.getUser()
		return(
			<Nav>
				<CloseBtn onTouchTap={this.context.onDrawerClose}><FontIcon className="material-icons">close</FontIcon></CloseBtn>
				
				{/*<DarkMenuItem primaryText="Editor Mode" leftIcon={<FontIcon className="material-icons">edit</FontIcon>}/>*/}

				{/*<div className="dark-menu-item menu-font lighter-bg"><Link to="/#editormode"><FontIcon className="material-icons" color={'White'} style={{lineHeight:'20px', padding:'20px 20px 20px 40px'}}>edit</FontIcon> Editor Mode</Link></div>*/}
				
				<Profile className="content-font">
					<Link to="/me/settings"><Avatar src={user.pic.medium}size={70}/></Link>
					<div><Link to="/me/settings"><h3>{user.display}</h3></Link>{user.shortDesc}</div>
				</Profile>
				
				<Divider/>

				<ul>
					<li><Link to='/me/stories'>My Stories</Link></li>
					<li><Link to='/me/settings'>Edit Profile</Link></li>
					<li><Divider/></li>
					<li><Link to='/me/settings/account'>Settings</Link></li>
					<li><Link to='#'>Log Out</Link></li>
				</ul>
			</Nav>
		)
	}
})

RightNavigation.contextTypes = {
	onDrawerClose: PropTypes.func
};

export default RightNavigation