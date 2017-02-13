import React, {Component} from 'react';
import {Link} from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
//import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import styled from 'styled-components'

import {Button} from 'components'

const styles = {
	MenuFont: {
		color: '#8f8f8f'
	},
	Toolbar: {
		height: '60px', 
		backgroundColor:'white', 
		borderBottom:'1px solid #e2e2e2'
	},
	Gradient: {
		background: '-moz-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%, rgba(206,241,183,0.75) 100%)', /* FF3.6-15 */
		background: '-webkit-linear-gradient(-45deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%)', /* Chrome10-25,Safari5.1-6 */
		background: 'linear-gradient(135deg,  rgba(0,178,180,0.75) 0%,rgba(206,241,183,0.75) 100%)', /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#bf00b2b4\', endColorstr=\'#bfcef1b7\',GradientType=1 )' /* IE6-9 fallback on horizontal gradient */
	},
	FadeWhite: {
		background: 'rgba(255, 255, 255, 0.75)'
	},
	DefaultIcon: {
		width: 30,
		height: 30
	}
}

const HideOnMobile = styled.span`
	@media (max-width: 600px) {
		display:none;
	}
`

const MenuItems = styled.ul`
	list-style: none;
	margin:0;
	padding:0;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
`

const ColMenuItems = styled.ul`
	list-style: none;
	margin:0;
	padding:0;
	display: flex;
	flex-flow: column wrap;
	align-content: flex-start;
`

const MenuItemLink = styled(Link)`
	text-decoration: none;
	display: block;
	padding: 0 2em;
	line-height: 60px;
	cursor: pointer;
	align-self: stretch;
`

const MenuItem = (props) => {
  return(
  	<li><MenuItemLink to={props.to}>{props.children}</MenuItemLink></li>
  )
}


const TopBar = React.createClass({
	getInitialState(){
	    return{
	    	openLeft: false,
	    	openRight: false
	    }
	},

	toggleLeftDrawer(e, i, value) {
		this.setState({openLeft: !this.state.openLeft})
	},

	closeLeftDrawer(){
		this.setState({openLeft: false})
	},

	toggleRightDrawer(e, i, value) {
		this.setState({openRight: !this.state.openRight})
	},

	handleSearch(){
		
	},

	render(){
		return (
			<Toolbar style={styles.Toolbar}>
				<ToolbarGroup style={{flex:'1 200px', justifyContent:'flex-start'}}>
					<IconButton onTouchTap={this.toggleLeftDrawer} iconStyle={styles.MenuFont}><FontIcon className="material-icons">menu</FontIcon></IconButton>
					<Drawer 
					open={this.state.openLeft} 
					docked={false} 
					width={400}
					containerStyle={styles.Gradient}
					onRequestChange={(openLeft) => this.setState({openLeft})}>
						<div style={{display:'flex', justifyContent:'space-between'}}>
							<IconButton onTouchTap={this.closeLeftDrawer} iconStyle={styles.DefaultIcon}><FontIcon className="material-icons">close</FontIcon></IconButton>
							<IconButton onTouchTap={this.handleSearch} iconStyle={styles.DefaultIcon}><FontIcon className="material-icons">search</FontIcon></IconButton>
						</div>
						<ColMenuItems>
							<MenuItem to="/">Home</MenuItem>
							<MenuItem to="/">About</MenuItem>
							<MenuItem to="/">Contact</MenuItem>
						</ColMenuItems>
						
			        </Drawer>

					<Link to="/"><img src='/aommoneyIcon.svg'/></Link>
				</ToolbarGroup>

				<ToolbarGroup style={{flex:'3 0 auto', justifyContent:'center', alignItems: 'stretch'}}>
					<HideOnMobile>
						<MenuItems>
							<MenuItem to="/">Home</MenuItem>
							<MenuItem to="/">About</MenuItem>
							<MenuItem to="/">Contact</MenuItem>
						</MenuItems>
					</HideOnMobile>
				</ToolbarGroup>

				<ToolbarGroup style={{flex:'1 200px', justifyContent:'flex-end'}}>
					<HideOnMobile><Button label="Story" iconName="add"/></HideOnMobile>
					<IconButton onTouchTap={this.toggleRightDrawer}><Avatar src="/tmp/avatar.png" size={30}/></IconButton>
					<Drawer 
					width={400} 
					docked={false} 
					openSecondary={true} 
					containerStyle={styles.FadeWhite}
					open={this.state.openRight}
					onRequestChange={(openRight) => this.setState({openRight})}>
						Profile menu here..
			        </Drawer>
				</ToolbarGroup>
			</Toolbar>
		)
	}
})

export default TopBar;