import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const PrimaryButton = (props) => {
	let opt, defaultStyle;

	if(props.size==='large'){
		opt = {
			className: 'primary-btn primary-large-btn',
			label: props.label,
			onClick:props.onClick,
			type:props.type,
			children:props.children,
			labelColor: 'White',
			labelStyle: {fontWeight:'bold', fontSize:18, fontFamily:"'Nunito', 'Mitr'"},
			style: {borderRadius:'24px', height:'48px', lineHeight:'48px', ...props.style},
	      	buttonStyle: {borderRadius: '24px', backgroundColor: '#00B2B4', padding:'0 5px'}
		}

		defaultStyle = {
			icon: {
				color: 'White', 
				margin:'-4px 0px 0 18px', 
				fontSize: '18px',
				width: 18
			},
			fontIcon: {
				fontSize:"22px", 
				marginTop:-4
			}
		}
	} else if(props.size==='small'){
		opt = {
			className: 'primary-btn primary-small-btn',
			label: props.label,
			labelColor: 'White',
			onClick:props.onClick,
			children:props.children,
			type:props.type,
			labelStyle: {fontWeight:'bold', fontSize:13, fontFamily:"'Nunito', 'Mitr'"},
			style: {borderRadius:'17px', height:'35px', lineHeight:'35px', ...props.style},
	      	buttonStyle: {borderRadius: '17px', backgroundColor: '#00B2B4', padding:'0'}
		}

		defaultStyle = {
			icon: {
				color: 'White', 
				margin:'-1px 0 0 14px', 
				fontSize: '13px',
				width: 13
			},
			fontIcon: {
				fontSize:"16px", 
				marginTop:-2
			}
		}
	} else {
		// default is medium size
		opt = {
			className: 'primary-btn',
			label: props.label,
			labelColor: 'White',
			onClick:props.onClick,
			children:props.children,
			type:props.type,
			labelStyle: {fontWeight:'bold', fontSize:15, fontFamily:"'Nunito', 'Mitr'"},
			style: {borderRadius:'20px', height:'40px', lineHeight:'40px', ...props.style},
	      	buttonStyle: {borderRadius: '20px', backgroundColor: '#00B2B4', padding:'0 2px'}
		}

		defaultStyle = {
			icon: {
				color: 'White', 
				margin:'-2px 0px 0 15px', 
				fontSize: '15px',
				width: 15
			},
			fontIcon: {
				fontSize:"18px", 
				marginTop:-2
			}
		}
	}
	

	if(props.iconName) {
		opt.icon = <FontIcon className="material-icons" style={defaultStyle.fontIcon}>{props.iconName}</FontIcon>
	} else if(props.icon) {
		// Create react element from inputted icon, and copy all its props
		let newProps = {...props.icon.props, style:{...defaultStyle.icon ,...props.icon.props.style}} 
		opt.icon = React.createElement('i', newProps, props.icon.children)
	}

	return React.createElement(RaisedButton, opt, null)
}

export default PrimaryButton