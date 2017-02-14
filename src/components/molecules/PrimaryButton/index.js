import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const PrimaryButton = (props) => {
	let opt = {
		className: 'primary-btn',
		label: props.label,
		labelColor: 'White',
		labelStyle: {fontWeight:'bold', fontSize:15},
		style: {borderRadius:'20px', height:'40px', lineHeight:'40px', ...props.style},
      	buttonStyle: {borderRadius: '20px', backgroundColor: '#00B2B4'}
	}

	if(props.iconName) {
		opt.icon = <FontIcon className="material-icons" style={{fontSize:"22px"}}>{props.iconName}</FontIcon>
	} else {
		opt.labelStyle.top = -2
	}

	return React.createElement(RaisedButton, opt, null)
}

export default PrimaryButton