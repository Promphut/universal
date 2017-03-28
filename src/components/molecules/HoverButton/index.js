import React from 'react'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'

const HoverButton = React.createClass({
  getInitialState () {
    return {
      hover: false
    }
  },

  onHover() {
    this.setState({
      hover: true
    })
  },

  onNotHover() {
    this.setState({
      hover: false
    })
  },

  render() {
    var {theme} = this.context.setting.publisher
    
    const buttonStyleBase = {
      color: theme.accentColor,
      fontSize: '18px',
      float: 'left',
      marginTop: '10px',
      paddingLeft: '10px',
      width: '28px'
    }
    let buttonStyle = {...buttonStyleBase}

    const labelStyleBase = {
      fontWeight: 'bold',
      fontSize: '15px',
      color: theme.accentColor,
      fontFamily:"'Nunito', 'Mitr'",
      textTransform:'none'
    }
    let labelStyle = {...labelStyleBase}

    const styleBase = {
      ...this.props.style,
      width: '180px',
      textAlign: 'left',
      display: 'inline-block',
      transition: '.3s'
    }
    let style = {...styleBase}

    if (this.state.hover == true) {
      buttonStyle = {
        ...buttonStyleBase,
        color: '#FFF',
      }
      labelStyle = {
        ...labelStyleBase,
        color: '#FFF'
      }
      style = {
        ...styleBase
      }
    } else {
      buttonStyle = {
        ...buttonStyleBase
      }
      labelStyle = {
        ...labelStyleBase
      }
      style = {
        ...styleBase
      }
    }

    const label = (
    <span>
      <i className="fa fa-facebook" aria-hidden="true" style={buttonStyle}></i>
      Share on Facebook
    </span>)

    return(
      <div onMouseEnter={this.onHover} onMouseLeave={this.onNotHover}>
        <FlatButton
          label={label}
          labelStyle={labelStyle}
          style={style}
          hoverColor='theme.accentColor'
        />
      </div>
    )
  }
})

HoverButton.contextTypes = {
	setting: React.PropTypes.object
};

export default HoverButton
