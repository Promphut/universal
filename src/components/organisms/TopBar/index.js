import React, {Component} from 'react';
import {findDOMNode as dom} from 'react-dom'
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import styled from 'styled-components'

import {PrimaryButton, SecondaryButton, Logo} from 'components'

const styles = {
	DefaultIcon: {
		width: 30,
		height: 30,
		color: '#e2e2e2'
	}
}

const Wrapper = styled.div`
	* { 
		margin: 0; 
		padding: 0; 
	} 

	.animate-me * {
		-webkit-transition: .25s ease-in-out; 
		-moz-transition: .25s ease-in-out; 
		-o-transition: .25s ease-in-out; 
		transition: .25s ease-in-out; 
		-webkit-text-size-adjust: none; 
	}

	#ld-toggle{
		/*position: absolute;
		opacity: 0;*/
		display: none;
	}

	#ld-toggle-area { 
		-webkit-touch-callout: none; 
		-webkit-user-select: none; 
		-khtml-user-select: none; 
		-moz-user-select: none; 
		-ms-user-select: none; 
		user-select: none; 
		left: 0px; 
		height:60px; 
		width: 60px; 
		display: block; 
		position: fixed; 
		background: rgba(255,255,255,.0); 
		z-index:2;
		cursor:pointer;
	} 

	#ld-toggle-area:before { 
		content: ''; 
		display: block; 
		position: absolute; 
		height: 2px; 
		width: 20px; 
		left: 20px; 
		top: 23px; 
		background: #8d8d8d; 
		box-shadow: 0 6px 0 #8d8d8d, 0 12px 0 #8d8d8d; 
	} 

	#l-drawer { 
		position: fixed; 
		top: 0; 
		left:-400px; 
		height: 100%; 
		width: 400px; 
		overflow-x: hidden; 
		overflow-y: auto; 
		padding: 40px; 
		-webkit-overflow-scrolling: touch; 
		z-index:4;

		background: -moz-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%, rgba(206,241,183,0.75) 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(135deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#bf00b2b4\', endColorstr=\'#bfcef1b7\',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
	} 

	#l-drawer > ul {
		margin: 40px 20px 0 20px;
	}

	#l-drawer > ul li {
		padding: 10px;
	}

	#l-drawer > ul li a:hover {
		text-decoration: underline;
	}

	#l-drawer > ul hr {
		margin: 20px 0 !important;
		background-color: #e2e2e2 !important;
	}

	#ld-toggle:checked ~ #ld-toggle-area { 
		height: 100%; 
		width: 100%;
		background: rgba(34,34,34,.57); 
		cursor:initial;
		z-index: 3;
	} 

	#ld-toggle:checked ~ #l-drawer { 
		left: 0px; 
	} 



	#rd-toggle{
		/*position: absolute;
		opacity: 0;*/
		display: none;
	}

	#rd-toggle-area { 
		-webkit-touch-callout: none; 
		-webkit-user-select: none; 
		-khtml-user-select: none; 
		-moz-user-select: none; 
		-ms-user-select: none; 
		user-select: none; 
		right: 0px; 
		height:60px; 
		width: 60px; 
		display: block; 
		position: fixed; 
		background: rgba(255,255,255,.0); 
		z-index:2;
		cursor:pointer;
	} 

	#rd-toggle-area > * {
		right: 15px;
		top: 15px;
		position: absolute; 
	}

	#r-drawer { 
		position: fixed; 
		top: 0; 
		right:-400px; 
		height: 100%; 
		width: 400px; 
		overflow-x: hidden; 
		overflow-y: auto; 
		/*padding: 40px; */
		-webkit-overflow-scrolling: touch; 
		z-index:4;

		background: rgba(255, 255, 255, 0.75)
	} 

	#r-drawer hr {
		background-color: #c1c1c1 !important;
		margin: 40px 0 40px 0 !important;
	}

	#r-drawer > ul li a {
		display: block;
		margin: 20px 70px;
		color: #222;
	}

	#r-drawer > ul li a:hover {
		text-decoration: underline;
		text-shadow:0px 0px 1px #222;
	}

	#r-drawer .dark-menu-item {
		background-color: #222;
	}

	#r-drawer .dark-menu-item a > *{
		vertical-align: middle;
	}

	#r-drawer .dark-menu-item a {
		display: block;
		height: 60px;
		color: #fff;
	}

	.lighter-bg:hover {
		opacity:.8;
	}

	#rd-toggle:checked ~ #rd-toggle-area { 
		height: 100%; 
		width: 100%;
		background: rgba(34,34,34,.57); 
		cursor:initial;
		z-index:3;
	} 

	#rd-toggle:checked ~ #r-drawer { 
		right: 0px; 
	} 


	.vertical-nav ul { 
		list-style-type:none; 
	} 

	.vertical-nav ul li {
		
		font-size: 20px; 
	}

	.vertical-nav ul a { 
		text-decoration:none
		color:#FFF; 
	} 

	.vertical-nav ul a:hover { 
		color:white; 
	} 

	#top-nav {
		flex: 2 40%;
		text-align: center;
		/*overflow:hidden;*/

		@media (max-width: 960px) {
			display:none;
		}
		/* PORTRAIT TABLET 
		@media (max-width: 640px) {
			display:none;
		}*/
	}


	#top-nav ul {
		padding: 0;
        list-style: none;
	}
	#top-nav ul li {
		display: inline-block;
        position: relative;
        text-align: left;
	}
	#top-nav ul li a {
		display: block;
        padding: 0 1.5em;
        text-decoration: none;
        color: #8f8f8f;
	}
	#top-nav ul li a:hover {
		background: #e2e2e2;
		color: #222;
		text-shadow:0px 0px 1px #222;	/* instead of bold */
	}
	#top-nav ul li ul.dropdown {
		min-width: 230px;
        background: #f4f4f4;
        display: none;
        position: absolute;
        z-index: 3;
        left: 0;
        top: 59px;
	}
	#top-nav ul li ul.dropdown li {
		position:relative;
		display: inline-block;
		line-height: 20px;
		width:100%;
	}
	#top-nav ul li ul.dropdown li a {
		padding: 1em 2em;
		color: #222;
	}
	#top-nav ul li:hover ul.dropdown {
		display: block;
	}
	#top-nav ul li ul.dropdown li {
		display: block;
	}

	#container-bar #not-login * {
		color: #8f8f8f;
	}

	#container-bar #not-login a:hover {
		text-decoration: underline;
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
	.bar-on-top #ld-toggle-area:before {
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
	flex-flow: row wrap;
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

const TopBar = React.createClass({
	getInitialState(){
	    return{
	    	loggedIn: this.props.loggedIn || false,
	    	scrolling: false
	    }
	},

	handleSearch(){
		
	},

	handleLDClose(){
		dom(this.refs.ldToggle).checked = false;
	},

	handleRDClose(){
		dom(this.refs.rdToggle).checked = false;
	},

	mouseOver(){
		// add "bar-on-top" class and rerender
		this.setState({scrolling: true})
	},

	mouseOut(){
		// remove "bar-on-top" class and rerender
		this.setState({scrolling: false})
	},

	render(){
		let loggedIn = this.state.loggedIn

		return (
			<Wrapper className="menu-font">
				<div className={this.state.scrolling || 'bar-on-top'}>
					<div className="animate-me">
						<input type="checkbox" id="ld-toggle" name="ld-toggle" ref="ldToggle"/>
						<label htmlFor="ld-toggle" id="ld-toggle-area"></label>
						<nav id="l-drawer" className="vertical-nav">
							<IconButton iconStyle={styles.DefaultIcon} style={{top:20, left:20, position: 'absolute'}} onTouchTap={this.handleLDClose}><FontIcon className="material-icons">close</FontIcon></IconButton>
							{/*<IconButton  iconStyle={styles.DefaultIcon} style={{top:20, right:20, position: 'absolute'}} onTouchTap={this.handleSearch}><FontIcon className="material-icons">search</FontIcon></IconButton>*/}
							
							<ul>
								<li><Link to="/" style={{fontSize: 30}}>Home</Link></li>
								<li><Link to="/" style={{fontSize: 40}}>Stories</Link></li>
								<li><Divider /></li>
								<li><Link to="/" style={{fontSize: 24}}>About Us</Link></li>
								<li><Link to="/" style={{fontSize: 24}}>Contact</Link></li>
								<li><Divider /></li>
								<li><em style={{color:'#e2e2e2', fontSize:'18px'}}>Other Channels</em></li>
								<li><Link to="/">Infographic Thailand</Link></li>
							</ul>
						</nav>
					</div>

					<Container id="container-bar">
	   					<header>
	   						<Link to="/#tohome" title={this.props.title} style={{display:'block', marginTop:3}}><Logo fill={'#00B2B4'}/></Link>
	   					</header>

	   					<nav id="top-nav" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
							<ul>
								<li><a href="#">Home</a></li>
								<li>
									<a href="#">Stories &#9662;</a>
									<ul className="dropdown">
						                <li><a href="#">All</a></li>
						                <li><a href="#">Saving</a></li>
						                <li><a href="#">Fund</a></li>
						                <li><a href="#">Stock</a></li>
						                <li><a href="#">Money Ideas</a></li>
						            </ul>
								</li>
								<li><a href="#">About Us</a></li>
								<li><a href="#">Contact</a></li>
							</ul>
						</nav>

						<HideOnTablet style={{textAlign:'right'}}>
							{loggedIn ? 
								(<PrimaryButton label="Story" iconName="add" style={{verticalAlign:'middle'}}/>) : 
								(<div id="not-login"><SecondaryButton label="Sign Up" style={{verticalAlign:'middle'}}/><span>&nbsp; or </span><Link to="/#tologin" style={{fontWeight:'bold'}}>Sign In</Link></div>
							)}
						</HideOnTablet>
					</Container>

					{loggedIn && (<div className="animate-me">
						<input type="checkbox" id="rd-toggle" name="rd-toggle" ref="rdToggle" />
						<label htmlFor="rd-toggle" id="rd-toggle-area"><Avatar src="/tmp/avatar.png" size={30}/></label>
						<nav id="r-drawer" className="vertical-nav">
							<IconButton iconStyle={{...styles.DefaultIcon, color:'#8f8f8f'}} style={{top:20, left:20, position: 'absolute'}} onTouchTap={this.handleRDClose}><FontIcon className="material-icons">close</FontIcon></IconButton>

							{/*<DarkMenuItem primaryText="Editor Mode" leftIcon={<FontIcon className="material-icons">edit</FontIcon>}/>*/}

							{/*<div className="dark-menu-item menu-font lighter-bg"><Link to="/#editormode"><FontIcon className="material-icons" color={'White'} style={{lineHeight:'20px', padding:'20px 20px 20px 40px'}}>edit</FontIcon> Editor Mode</Link></div>*/}
							
							<div className="content-font" style={{padding:'80px 40px 0 40px'}}>
								<Link to="/#toprofile"><Avatar src="/tmp/avatar.png" size={70} style={{verticalAlign:'middle'}}/></Link>
								<div style={{display:'inline-block', width:240, verticalAlign:'middle', fontSize:15, color:'#8f8f8f', paddingLeft:15}}><Link to="/#toprofile"><h3>Ochawin Chirasottikul</h3></Link>Writer of Money Ideas, Fund Investment, and Tax</div>
							</div>
							
							<Divider/>

							<ul>
								<li><a href="#">My Stories</a></li>
								<li><a href="#">Edit Profile</a></li>
								<li><Divider/></li>
								<li><a href="#">Settings</a></li>
								<li><a href="#">Log Out</a></li>
							</ul>

						</nav>
					</div>)}
		        </div>
			</Wrapper>
		)
	}
})

export default TopBar;