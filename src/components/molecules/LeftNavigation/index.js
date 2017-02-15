import React, {PropTypes} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider'

const Nav = styled.nav`
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

	& ul {
		margin: 70px 60px 0 60px;
		list-style-type:none; 
		font-size: 20px; 
	}

	& ul li {
		padding: 10px;
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

const LeftNavigation = React.createClass({
	getInitialState() {
		return { }
	},

	onSearch(){

	},

	render(){
		return(
			<Nav>
				<CloseBtn onTouchTap={this.context.onDrawerClose}><FontIcon className="material-icons">close</FontIcon></CloseBtn>
				<SearchBtn onTouchTap={this.onSearch}><FontIcon className="material-icons">search</FontIcon></SearchBtn>
				
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
			</Nav>	
		)
	}
})

LeftNavigation.contextTypes = {
	onDrawerClose: PropTypes.func
};

export default LeftNavigation