import React from 'react'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const Button = (props) => {

  return(
    <RaisedButton
      label={props.label}
      labelColor={'White'}
      style={{borderRadius:'20px', height:'40px', lineHeight:'40px'}}
      buttonStyle={{borderRadius: '20px', backgroundColor: '#00B2B4'}}
      icon={<FontIcon className="material-icons" style={{fontSize:"22px"}}>{props.iconName}</FontIcon>}
    ></RaisedButton>
  )
}

export default Button