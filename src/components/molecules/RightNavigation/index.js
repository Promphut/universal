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
		return(
			<Nav>
				<CloseBtn onTouchTap={this.context.onDrawerClose}><FontIcon className="material-icons">close</FontIcon></CloseBtn>
				
				{/*<DarkMenuItem primaryText="Editor Mode" leftIcon={<FontIcon className="material-icons">edit</FontIcon>}/>*/}

				{/*<div className="dark-menu-item menu-font lighter-bg"><Link to="/#editormode"><FontIcon className="material-icons" color={'White'} style={{lineHeight:'20px', padding:'20px 20px 20px 40px'}}>edit</FontIcon> Editor Mode</Link></div>*/}
				
				<Profile className="content-font">
					<Link to="/#toprofile"><Avatar src="/tmp/avatar.png" size={70}/></Link>
					<div><Link to="/#toprofile"><h3>Ochawin Chirasottikul</h3></Link>Writer of Money Ideas, Fund Investment, and Tax</div>
				</Profile>
				
				<Divider/>

				<ul>
					<li><a href="#">My Stories</a></li>
					<li><a href="#">Edit Profile</a></li>
					<li><Divider/></li>
					<li><a href="#">Settings</a></li>
					<li><a href="#">Log Out</a></li>
				</ul>
			</Nav>
		)
	}
})

RightNavigation.contextTypes = {
	onDrawerClose: PropTypes.func
};

export default RightNavigation