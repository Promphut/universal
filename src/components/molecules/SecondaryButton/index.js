import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const SecondaryButton = (props) => {
	let opt = {
		className: 'secondary-btn',
		label: props.label,
		labelColor: '#00B2B4',
		labelStyle: {fontWeight:'bold', fontSize:15},
		style: {borderRadius:'20px', height:'40px', lineHeight:'40px', background:'none', boxShadow:'none', ...props.style},
      	buttonStyle: {borderRadius: '20px', background: 'none', border:'2px solid #00B2B4'}
	}
	
	if(props.iconName) {
		opt.icon = <FontIcon className="material-icons" style={{fontSize:"22px"}}>{props.iconName}</FontIcon>
	} else {
		opt.labelStyle.top = -2
	}

	return React.createElement(RaisedButton, opt, null)
}

export default SecondaryButton