import React, {Component, PropTypes} from 'react';
import {findDOMNode as dom} from 'react-dom'
import {Link, browserHistory} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import styled from 'styled-components'
import {PrimaryButton, SecondaryButton, Logo, Drawer, LeftNavigation, RightNavigation, LeftMenu, RightMenu} from 'components'

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

 	.hamburger {
		float: left;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		height:60px !important;
		width: 60px !important;
		display: block !important;
		position: fixed !important;
		background: rgba(255,255,255,.0) !important;
		z-index:2;
		cursor:pointer;
	}

	.bar-on-top .hamburger div span {
		background: #e2e2e2 !important;
		box-shadow: 0 6px 0 #e2e2e2, 0 12px 0 #e2e2e2 !important;
	}


 	.avatar {
		float: right;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		position: fixed !important;
		background: rgba(255,255,255,.0) !important;
		z-index:2;
		cursor:pointer;
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

const Fixed = styled.div`
	float: right;
	position: fixed !important;
	cursor: pointer;
`

const Hamburger = styled.span`
	content: '';
	display: block;
	position: absolute;
	height: 2px;
	width: 20px;
	left: 20px;
	top: 23px;
	background: #8d8d8d;
	box-shadow: 0 6px 0 #8d8d8d, 0 12px 0 #8d8d8d;
	z-index: 10000;

	-webkit-transition: .25s ease-in-out;
	-moz-transition: .25s ease-in-out;
	-o-transition: .25s ease-in-out;
	transition: .25s ease-in-out;
	-webkit-text-size-adjust: none;
`

const ProfileAvatar = styled(Avatar)`
	right: 15px;
	top: 15px;
	position: fixed;
	z-index:2;
	cursor:pointer;
`

const NotLogin = styled.div`
	width: 180px;
	display: inline-block;
	margin-right: -50px;
	font-size: 15px;

	& * {
		color: #8f8f8f;
	}

	& a:hover {
		text-decoration: underline;
	}
`

const TopBar = React.createClass({
	getInitialState(){
    return {
			alertLeft: false,
			alertRight: false
    }
	},

	componentDidMount() {
		if(this.props.onScroll)
			window.addEventListener('scroll', this.handleScroll);
	},

	componentWillUnmount() {
		if(this.props.onScroll)
			window.removeEventListener('scroll', this.handleScroll);
	},

	handleScroll(e) {
		this.props.onScroll(e)
	},

	signup(){
		browserHistory.push('/signup')
	},

	handleRequestClose(side){
		if (side === 'left') {
			this.setState({alertLeft: false})
		} else if (side === 'right') {
			this.setState({alertRight: false})
		}
	},

	openPop(side){
		if (side === 'left') {
			this.setState({alertLeft: true})
		} else if (side === 'right') {
			this.setState({alertRight: true})
		}
	},

	render(){
		let {alertLeft, alertRight} = this.state
		let status = this.props.status || 'UNLOGGEDIN',
			user = this.props.user,
			menu = this.props.menu

		const avatarStyle = {
			content: '',
			display: 'block',
			position: 'absolute',
			height: '2px',
			width: '20px',
			left: '20px',
			top: '23px',
			background: '#8d8d8d',
			boxShadow: '0 6px 0 #8d8d8d, 0 12px 0 #8d8d8d',
			zIndex: '10000'
		}

		return (
			<Wrapper className="menu-font" onMouseOver={this.props.onMouseOver} onMouseOut={this.props.onMouseOut}>
				<div className={this.props.scrolling || 'bar-on-top'}>
					<IconButton className="hamburger" onClick={() => this.openPop('left')}>
						<Hamburger/>
					</IconButton>
					<LeftMenu menu={menu} open={alertLeft} close={() => this.handleRequestClose('left')}/>

					<Container id="container-bar">
	   					<header>
	   						<Link to="/" id="logo" title={this.props.title} style={{display:'block', marginTop:3}}><Logo fill={'#00B2B4'}/></Link>
	   					</header>

	   					{this.props.children}

						<div style={{textAlign:'right'}}>
							{status=='LOGGEDIN' && <HideOnTablet><PrimaryButton label="Story" iconName="add" style={{verticalAlign:'middle'}}/></HideOnTablet>}
							{status=='UNLOGGEDIN' &&  <NotLogin id="not-login"><SecondaryButton label="Sign Up" onClick={this.signup} style={{verticalAlign:'middle'}}/><span>&nbsp; or </span><Link to="/signin" style={{fontWeight:'bold'}}>Sign In</Link></NotLogin>}
							{status=='LOGGEDIN' &&
									<ProfileAvatar src={user.pic.medium} size={30} onClick={() => this.openPop('right')}/>

							}
							{status=='LOGGEDIN' && <RightMenu open={alertRight} close={() => this.handleRequestClose('right')} user={user}/>}
						</div>
					</Container>


	        </div>
			</Wrapper>
		)
	}
})

TopBar.propTypes = {
  onScroll: PropTypes.func,
  scrolling: PropTypes.bool,
  status: PropTypes.string,

  title: PropTypes.string,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,

  menu: PropTypes.object,
  user: PropTypes.object
}

export default TopBar;
