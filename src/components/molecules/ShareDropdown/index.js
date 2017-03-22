import React from 'react'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import {Dropdown} from 'components'

const ShareDropdown = React.createClass({
  getInitialState () {
    return {
      open: false
    }
  },

  select(index) {
    if (index === 0) {
      console.log('Select Share')
    } else if (index === 1) {
      console.log('Select Copy Link')
    }
  },

  render() {
    const buttonStyle = {
      color: '#00B2B4',
      fontSize: '18px',
      float: 'left',
      marginTop: '10px',
      paddingLeft: '10px'
    }
    let buttons = []
    buttons.push(<span><FontIcon className="material-icons" style={buttonStyle}>share</FontIcon>Share</span>)
    buttons.push(<span><FontIcon className="material-icons" style={buttonStyle}>link</FontIcon>Copy Link</span>)

    let button = []
    for (let i = 0; i < buttons.length; i++){
      button.push(
        <div key={i}>
          <FlatButton
            label={buttons[i]}
            labelStyle={{fontWeight: 'bold', fontSize: '15px', color: '#00B2B4', fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
            style={{width: '130px', textAlign: 'left', display: 'inline-block'}}
            onTouchTap={() => this.select(i)}
          /><br/>
        </div>
      )
    }

    const buttonDropdown = (
      <FontIcon className="material-icons" style={{color:'#8f8f8f'}}>
        keyboard_arrow_down
      </FontIcon>
    )

    return(
      <Dropdown button={buttonDropdown} float='right'>
        {button}
      </Dropdown>
    )
  }
})

export default ShareDropdown
