import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const SecondaryButton = (props) => {
	let opt, defaultStyle;

	if(props.size==='large'){
		// default is medium size
		opt = {
			className: 'secondary-btn secondary-large-btn',
			label: props.label,
			labelColor: '#00B2B4',
			onClick:props.onClick,
			type:props.type,
			labelStyle: {fontWeight:'bold', fontSize:18, top:-2, fontFamily:"'Nunito', 'Mitr'"},
			style: {borderRadius:'24px', height:'48px', lineHeight:'48px', background:'none', boxShadow:'none', ...props.style},
	      	buttonStyle: {borderRadius: '24px', background: 'none', border:'2px solid #00B2B4', padding:'0 5px'}
		}

		defaultStyle = {
			icon: {
				color: '#00B2B4', 
				margin:'-8px 0px 0 15px', 
				fontSize: '18px',
				width: 18
			},
			fontIcon: {
				fontSize:"22px", 
				marginTop:-8
			}
		}
	} else if(props.size==='small'){
		opt = {
			className: 'secondary-btn secondary-small-btn',
			label: props.label,
			labelColor: '#00B2B4',
			onClick:props.onClick,
			type:props.type,
			labelStyle: {fontWeight:'bold', fontSize:15, top:-2, fontFamily:"'Nunito', 'Mitr'"},
			style: {borderRadius:'17px', height:'35px', lineHeight:'35px', background:'none', boxShadow:'none', ...props.style},
	      	buttonStyle: {borderRadius: '17px', background: 'none', border:'2px solid #00B2B4', padding:'0'}
		}

		defaultStyle = {
			icon: {
				color: '#00B2B4', 
				margin:'-4px 0px 0 14px', 
				fontSize: '13px',
				width: 13
			},
			fontIcon: {
				fontSize:"16px", 
				marginTop:-5
			}
		}
	} else {
		// default is medium size
		opt = {
			className: 'secondary-btn',
			label: props.label,
			labelColor: '#00B2B4',
			onClick:props.onClick,
			type:props.type,
			labelStyle: {fontWeight:'bold', fontSize:15, top:-2, fontFamily:"'Nunito', 'Mitr'"},
			style: {borderRadius:'20px', height:'40px', lineHeight:'40px', background:'none', boxShadow:'none', ...props.style},
	      	buttonStyle: {borderRadius: '20px', background: 'none', border:'2px solid #00B2B4', padding:'0 2px'}
		}

		defaultStyle = {
			icon: {
				color: '#00B2B4', 
				margin:'-6px 0px 0 15px', 
				fontSize: '15px',
				width: 15
			},
			fontIcon: {
				fontSize:"18px", 
				marginTop:-6
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

export default SecondaryButton