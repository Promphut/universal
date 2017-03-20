import React from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';

var styles = {
  btn: {
    //float:'left',
  },
  labelBtn: {
    color: '#E2E2E2',
    fontWeight: 'bold'
  }
}

const ShareButton = ({style}) => {
  return (
    <FlatButton
      label = 'Share'
      labelStyle = {styles.labelBtn}
      labelPosition = 'after'
      backgroundColor="#a4c639"
      style = {{...styles.btn, ...style}}
      icon = {<i className="fa fa-facebook" style={{color:'#FFF'}} aria-hidden="true"></i>}
    />
  )
}

export default ShareButton
