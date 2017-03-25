import React, {PropTypes} from 'react'
import styled,{keyframes} from 'styled-components'
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider'
import {findDOMNode as dom} from 'react-dom'
import Avatar from 'material-ui/Avatar';
import auth from 'components/auth'

const Container = styled.div`
  text-align: left;
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index:10;
  display:${props=> props.open?'block':'none'};
  animation: ${props=> props.open?displayNone:displayBlock} 0.5s forwards;
  @media (max-width:480px){
    width: 100vw;
    .mobile{
      margin:20px;
    }
  }
`

const Container2 = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index:10;
  background:rgba(0,0,0,0.8);
  animation: ${props=> props.open?fadeOut:fadeIn} 0.5s forwards;
  @media (max-width:480px){
    width: 100vw;
  }
`

const displayNone = keyframes`
  from {
    display:block;
  }
  to {
    display:none;
  }
`
const displayBlock = keyframes`
  from {
    display:none;
  }
  to {
    display:block;
  }
`

const slideOut = keyframes`
	from {
    transform: translateX(100%);
    opacity:0;
  }
  to {
    transform: translateX(0%);
    opacity:1;
  }
`
const slideIn = keyframes`
	from {
    transform: translateX(100%);
    opacity:1;
  }
  to {
    transform: translateX(0%);
    opacity:0;
  }
`

const fadeIn = keyframes`
  from {
    opacity:0;
  }
  to {
    opacity:1;
  }
`
const fadeOut = keyframes`
  from {
    opacity:1;
  }
  to {
    opacity:0;
  }
`

const Nav = styled.nav`
	position: relative;
	top: 0;
  float: right;
	height: 100%;
	width: 400px;
	overflow-x: hidden;
	overflow-y: auto;
	// padding: 40px;
	-webkit-overflow-scrolling: touch;
	z-index:11;
  animation: ${props=> props.open?slideOut:slideIn} 0.6s forwards;
  background: rgba(255, 255, 255, 0.85);
	& hr {
		background-color: #c1c1c1 !important;
    margin: 15px 0px !important;
	}

	& ul {
		list-style-type:none;
		font-size: 24px;
    margin: 0px;
	}
	& ul li a {
		display: block;
    padding: 15px 10px;
		color: #222;
	}

	& ul li a:hover {
		text-decoration: underline;
	}
  @media(max-width:480px){
    width: 80vw;
    & ul {
      font-size: 20px;
    }
  }
`

const CloseBtn = styled(IconButton)`
	top: 15px;
	left: 15px;
	position: relative !important;

	& .material-icons {
		width: 30px;
		height: 30px;
	}
`

const Profile = styled.div`
	padding: 40px 40px 0 40px;
	& > * {
		vertical-align: middle;
		display: inline-block;
	}
	& > div {
		width: 240px;
		font-size: 15px;
		color: #8f8f8f;
		padding-left: 20px;
	}
  @media (max-width:480px){
    & > div {
      font-size: 12px;
    }
    & > * {
      display: block;
    }
    padding: 0px 40px 0 40px;
  }
`
const EditMode = styled.div`
  background-color:#222;
  color:#fff;
  position:relative;
  top:0;
  left:0;
  width:100%;
  height:60px;
  padding:12px;
  font-size:20px;
  @media(max-width:480px){
    font-size: 18px;
  }
`

const RightMenu = React.createClass({
	getInitialState() {
		return {
      open:this.props.open
    }
	},

	render(){
    const displayStyle = {
      fontSize: '22px',
      margin: '0px',
      color: '#222',
      fontWeight: 'bold'
    }

    let {open, close} = this.props,
        user = this.props.user

		return (
      <Container open={open}>
        <Container2 onClick={close} />
        <Nav open={open}>
          <div className="menu menu-font">
            <Link to={'/editor'}><EditMode className="nunito-font"><FontIcon className="material-icons" style={{color:'#fff',margin:'0 25px 0 20px',top:'4px'}}>edit</FontIcon>Editor Mode</EditMode></Link>
            <CloseBtn onTouchTap={close}><FontIcon className="material-icons" style={{color:'#222',fill:'#222'}}>close</FontIcon></CloseBtn>

            <Profile className="content-font">
              <Link to={user.url}><Avatar src={user.pic.medium}size={70} className="mobile"/></Link>
              <div style={{marginTop: '-15px'}}>
                <Link to={user.url}>
                  <h3 style={displayStyle}>{user.display}</h3>
                </Link>{user.intro}
              </div>
            </Profile>
            <Divider />
    				<ul>
    					<li><Link to='/me/stories' onClick={close}>My Stories</Link></li>
    					<li><Link to='/me/settings' onClick={close}>Edit Profile</Link></li>
    				</ul>
    				<Divider />
    				<ul>
    					<li><Link to='/me/settings/account' onClick={close}>Settings</Link></li>
    					<li><Link to='/logout'>Log Out</Link></li>
    				</ul>
          </div>
        </Nav>
      </Container>
		)
	}
})

export default RightMenu
