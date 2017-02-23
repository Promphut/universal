import React, {PropTypes} from 'react'
import {findDOMNode as dom} from 'react-dom'
import styled from 'styled-components'
import {AnimateMe} from 'components'


const HiddenToggle = styled.input`
	display: none;
	
	&:checked + label { 
		height: 100%; 
		width: 100%;
		background: rgba(34,34,34,.57); 
		cursor:initial;
		z-index: 3;
	} 

	&:checked ~ nav { 
		${props => props.position==='right' ? 'right:0;': 'left:0;'}
	}
`

const OverlayLabel = styled.label`
	-webkit-touch-callout: none; 
	-webkit-user-select: none; 
	-khtml-user-select: none; 
	-moz-user-select: none; 
	-ms-user-select: none; 
	user-select: none; 
	${props => props.position==='right' ? 'right:0;': 'left:0;'}
	height:60px; 
	width: 60px; 
	display: block; 
	position: fixed; 
	background: rgba(255,255,255,.0); 
	z-index:2;
	cursor:pointer;
`

const Drawer = React.createClass({
	getChildContext() {
		return {
			onDrawerClose: this.handleDrawerClose,
			onDrawerShrink: this.handleDrawerShrink,
			onDrawerExtend: this.handleDrawerExtend
		}
	},

	getInitialState(){
	    return{ }
	},

	handleDrawerClose(){
		dom(this.refs[this.props.name+'Toggle']).checked = false;
	},

	handleDrawerShrink(){
		//dom(this.refs.overlay).style.left = '-300px'
	},

	handleDrawerExtend(){

	},

	render(){
		let name = this.props.name,
			position = this.props.position || 'left'

		return (
			<AnimateMe>
				<HiddenToggle type="checkbox" position={position} id={name+'-toggle'} ref={name+'Toggle'} />
				<OverlayLabel htmlFor={name+'-toggle'} id={name+'-toggle-area'} ref={'overlay'} position={position}>{this.props.toggleIcon}</OverlayLabel>
				
				{this.props.children}
			</AnimateMe>
		)
	}
})

Drawer.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string
}

Drawer.childContextTypes = {
	onDrawerClose: PropTypes.func,
	onDrawerShrink: PropTypes.func,
	onDrawerExtend: PropTypes.func
}

export default Drawer