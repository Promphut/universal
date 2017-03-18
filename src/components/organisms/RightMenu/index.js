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
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index:10;
  display:${props=> props.open?'block':'none'};
  animation: ${props=> props.open?displayNone:displayBlock} 0.5s forwards;
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
  // filter:url(#blur);
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
	padding: 40px;
	-webkit-overflow-scrolling: touch;
	z-index:11;
  animation: ${props=> props.open?slideOut:slideIn} 0.6s forwards;

  background: rgba(255, 255, 255, 0.75);

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

const RightMenu = React.createClass({
	getInitialState() {
		return {
      open:this.props.open
    }
	},

	render(){
    let {open,close} = this.props,
        user = this.props.user

		return(
      <Container open={open} >
        <Container2 onClick={close} />
        <Nav open={open}>
          <div className="menu">
            <CloseBtn onTouchTap={close}><FontIcon className="material-icons">close</FontIcon></CloseBtn>
            
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
          </div>
        </Nav>
      </Container>
		)
	}
})

export default RightMenu
