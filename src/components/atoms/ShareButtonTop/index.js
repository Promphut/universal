import React from 'react'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton';

const styles = {
  btn (barTone, scrolling) {
    return {
      float:'left',
      margin: '11px 0px',
      borderRadius: '20px',
      border: (barTone == 'light' && scrolling) ? '1px solid #222' : '1px solid #FFF',
      height: '34px',
      lineHeight: '28px',
      minWidth: '72px'
    }
  },
  labelStyle (barTone, scrolling) {
    return {
      fontSize: '15px',
      color: (barTone == 'light' && scrolling) ? '#222' : '#FFF',
      textTransform: 'none',
      padding: '0px 0px 0px 0px'
    }
  },
  iconStyle (barTone, scrolling) {
    return {
      fontSize: '11px',
      color: (barTone == 'light' && scrolling) ? '#222' : '#FFF',
      margin: '0px',
      padding: '3px 8px 0px 0px'
    }
  }
}

const label = (number, barTone, scrolling) => {
  return (
    <span>
      <span style={{
        borderLeft: (barTone == 'light' && scrolling) ? '1px solid #222' : '1px solid #FFF',
        padding: '5px 0px 4px 10px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>{number}</span>
    </span>
  )
}

const ShareButtonTop = ({className, number, barTone, scrolling, style, onClick}) => {
  return (
    <FlatButton
      onClick={onClick}
      label = {label(number, barTone, scrolling)}
      labelStyle = {styles.labelStyle(barTone, scrolling)}
      backgroundColor='rgba(0, 0, 0, 0)'
      icon = {<i className='fa fa-facebook' style={styles.iconStyle(barTone, scrolling)} aria-hidden="true"></i>}
      style = {{...styles.btn(barTone, scrolling), ...style}}
    />
  )
}

ShareButtonTop.contextTypes = {
	setting: React.PropTypes.object
};

export default ShareButtonTop
