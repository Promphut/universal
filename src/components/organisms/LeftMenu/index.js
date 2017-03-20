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
  background:rgba(0,0,0,0.8);
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
	left:0;
	height: 100%;
	width: 400px;
	overflow-x: hidden;
	overflow-y: auto;
	padding: 40px;
	-webkit-overflow-scrolling: touch;
	z-index:11;
  animation: ${props=> props.open?slideOut:slideIn} 0.6s forwards;

	background: -moz-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%, rgba(206,241,183,0.75) 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(135deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\#bf00b2b4\, endColorstr=\#bfcef1b7\,GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

	& ul {
		// margin: 70px 60px 0 60px;
		margin: 70px 40px;
    padding: 0px;
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

	& ul li a {
		text-decoration:none
		color:#FFF;
	}

	& ul li a:hover {
		text-decoration: underline;
		text-shadow:0px 0px 1px #222;
	}

	& ul hr {
		margin: 20px 0 !important;
		background-color: #e2e2e2 !important;
	}

  & ul li .arrow {
		font-size: 32px !important;
		line-height: 40px;
		vertical-align: middle;
		margin-left: 140px !important;
    color: #FFF !important;
	}

  & ul li .arrow.toggleUp {
    transform: rotate(0deg);
    transition-duration: 1s
  }

  & ul li .arrow.toggleDown {
    transform: rotate(180deg);
    transition-duration: 1s
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
  // position:relative;
  // top:0;
  // left:0;
  // width:70px;
  // height:100%;
  height: ${props => props.height};
  overflow: hidden;
  transition: height 0.5s;
  margin-left: 40px !important;
  font-size: 24px;
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
      toggleArrow: 'toggleUp',
      height: 0
    }
	},

	shrinkDrawer(e){
		e.preventDefault()
		this.setState({
      miniMenu:!this.state.miniMenu
    })

    let {toggleArrow} = this.state
    if (this.state.toggleArrow === 'toggleUp') {
      this.state.toggleArrow = 'toggleDown'
    } else {
      this.state.toggleArrow = 'toggleUp'
    }

    let menu = this.props.menu
    let height = ((menu && menu.column ? menu.column : []).length+1) * 55
    this.state.height = (this.state.miniMenu) ? 0 : height
	},

	render(){
    let {miniMenu, toggleArrow, height} = this.state
    let {open, close, menu} = this.props
    let cols = menu && menu.column ? menu.column : []

    // Menu items from menu props
    let items = []
    for(let i=0; i<cols.length; i++)
      items.push(<li key={i}><Link to={'/stories/'+cols[i].slug}>{cols[i].name}</Link></li>)

		return (
      <Container open={open} >
        <Container2 onClick={close} />
        <Nav open={open}>
          <div className="menu">
            <CloseBtn onTouchTap={close}><FontIcon className="material-icons">close</FontIcon></CloseBtn>
            {/* <SearchBtn onTouchTap={this.onSearch}><FontIcon className="material-icons">search</FontIcon></SearchBtn>*/}
            <ul>
              <li><Link to="/" style={{fontSize: 24}}>Home</Link></li>
              <li><Link to="/about" style={{fontSize: 24}}>About Us</Link></li>

              <Divider />

              <li><Link to="#" style={{fontSize: 40}} onClick={this.shrinkDrawer}>Stories
                <FontIcon className={'material-icons arrow ' + toggleArrow}>keyboard_arrow_down</FontIcon>
              </Link></li>

              <MiniMenu height={height+'px'}>
                {items}
                {/*The last one is 'all columns'*/}
                <li key={999}><Link to={'/stories/columns'}>All Columns</Link></li>
              </MiniMenu>

              <Divider />

              <li><Link to="/contact" style={{fontSize: 24}}>Contact</Link></li>
              {/*<Divider />
              <li><em style={{color:'#e2e2e2', fontSize:'18px'}}>Other Channels</em></li>
              <li><Link to="/">Infographic Thailand</Link></li>*/}
            </ul>
          </div>
        </Nav>
      </Container>
		)
	}
})

LeftMenu.propTypes = {
  // menu: PropTypes.object,
  // open: PropTypes.func.isRequired,
  // close: PropTypes.func.isRequired
}

export default LeftMenu
