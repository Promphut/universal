import React, {PropTypes} from 'react'
import styled,{keyframes} from 'styled-components'
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider'
import {findDOMNode as dom} from 'react-dom'

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
  background:rgba(0,0,0,0.6);
  animation: ${props=> props.open?fadeOut:fadeIn} 0.5s forwards;
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
    transform: translateX(-100%);
    opacity:0;
  }
  to {
    transform: translateX(0%);
    opacity:1;
  }
`
const slideIn = keyframes`
	from {
    transform: translateX(0%);
    opacity:1;
  }
  to {
    transform: translateX(-100%);
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
    opacity:1;
  }
  to {
    opacity:0;
  }
`



const Nav = styled.nav`
	position: relative; 
	top: 0; 
	left:0; 
	height: 100%; 
	width: 400px; 
	overflow-x: hidden; 
	overflow-y: auto; 
	padding: 40px; 
	-webkit-overflow-scrolling: touch; 
	z-index:11;
  animation: ${props=> props.open?slideOut:slideIn} 0.8s forwards;

	background: -moz-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%, rgba(206,241,183,0.75) 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(135deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\#bf00b2b4\, endColorstr=\#bfcef1b7\,GradientType=1 ); /* IE6-9 fallback on horizontal gradient */ 

	& ul {
		margin: 70px 60px 0 60px;
		list-style-type:none; 
		font-size: 20px; 
	}

	& ul li {
		padding: 10px;
		color: White;
	}

	& ul li > * {
		display: inline-block;
		vertical-align: middle;
	}

	& ul li .right-arrow { 
		font-size: 20px; 
		line-height: 40px; 
		vertical-align: middle;
		margin-left: 22px !important; 
	}

	& ul li a {
		text-decoration:none
		color:#FFF; 
	}

	& ul li a:hover {
		text-decoration: underline;
	}

	& ul hr {
		margin: 20px 0 !important;
		background-color: #e2e2e2 !important;
	}
`
const Nav2 = styled.div`
	position: absolute; 
	top: 0; 
	left:0; 
	height: 100%; 
	width: 400px; 
	overflow-x: hidden; 
	overflow-y: auto; 
	padding: 40px; 
	-webkit-overflow-scrolling: touch; 
	z-index:11;
  display: ${props=> !props.open?'none':'block'};
  animation: slideOut 0.8s forwards;

	background: -moz-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%, rgba(206,241,183,0.75) 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(135deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\#bf00b2b4\, endColorstr=\#bfcef1b7\,GradientType=1 ); /* IE6-9 fallback on horizontal gradient */ 

	& ul {
		margin: 70px 60px 0 60px;
		list-style-type:none; 
		font-size: 20px; 
	}

	& ul li {
		padding: 10px;
		color: White;
	}

	& ul li > * {
		display: inline-block;
		vertical-align: middle;
	}

	& ul li .right-arrow { 
		font-size: 20px; 
		line-height: 40px; 
		vertical-align: middle;
		margin-left: 22px !important; 
	}

	& ul li a {
		text-decoration:none
		color:#FFF; 
	}

	& ul li a:hover {
		text-decoration: underline;
	}

	& ul hr {
		margin: 20px 0 !important;
		background-color: #e2e2e2 !important;
	}
`

const CloseBtn = styled(IconButton)`
	top: 20px;
	left: 20px;
	position: absolute !important;

	& .material-icons {
		width: 30px;
		height: 30px;
		color: #e2e2e2 !important;
	}
`
const MiniMenu = styled.div`
  position:relative;
  top:0;
  left:0;
  width:70px;
  height:100%;
`

const SearchBtn = styled(IconButton)`
	top: 20px;
	right: 20px;
	position: absolute !important;

	& .material-icons {
		width: 30px;
		height: 30px;
		color: #e2e2e2 !important;
	}
`

const LeftMenu = React.createClass({
	getInitialState() {
		return {
      open:this.props.open,
      miniMenu:false,
    }
	},

	shrinkDrawer(e){
		e.preventDefault() 
    console.log(e)
		this.setState({
      miniMenu:true
    })
	},

	render(){
    //console.log(this.props.open)
    var {open,close} = this.props
		return(
      <Container open={open} >
      <Container2  onClick={close} />
        <Nav open={open}>
          <div className="menu">
            <CloseBtn onTouchTap={close}><FontIcon className="material-icons">close</FontIcon></CloseBtn>
            <SearchBtn onTouchTap={this.onSearch}><FontIcon className="material-icons">search</FontIcon></SearchBtn>
            <ul>
              <li><Link to="/" style={{fontSize: 30}}>Home</Link></li>
              <li><Link to="#" style={{fontSize: 40}} onClick={this.shrinkDrawer}>Stories</Link></li>
              <li><Divider /></li>
              <li><Link to="/" style={{fontSize: 24}}>About Us</Link></li>
              <li><Link to="/" style={{fontSize: 24}}>Contact</Link></li>
              <li><Divider /></li>
              <li><em style={{color:'#e2e2e2', fontSize:'18px'}}>Other Channels</em></li>
              <li><Link to="/">Infographic Thailand</Link></li>
            </ul>
          </div>
        </Nav>
        <Nav2 >
          <MiniMenu open={this.state.miniMenu}>

          </MiniMenu>
        </Nav2>    
      </Container>
		)
	}
})


export default LeftMenu