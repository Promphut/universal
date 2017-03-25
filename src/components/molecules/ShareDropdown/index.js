import React from 'react'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import {Dropdown} from 'components'
import CopyToClipboard from 'react-copy-to-clipboard'

const ShareDropdown = React.createClass({
  getInitialState () {
    return {
      open: false,
      copied: false
    }
  },

  select(index) {
    if (index === 0) {
      //console.log('Select Share')
    } else if (index === 1) {
      //console.log('Copied')
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

    // for (let i = 0; i < buttons.length; i++){
      // button.push(
      //   <div key={i}>
      //     <FlatButton
      //       label={buttons[i]}
      //       labelStyle={{fontWeight: 'bold', fontSize: '15px', color: '#00B2B4', fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
      //       style={{width: '130px', textAlign: 'left', display: 'inline-block'}}
      //       onTouchTap={() => this.select(i)}
      //       data-clipboard-text
      //     /><br/>
      //   </div>
      // )
    // }

    const button = (
      <div>
        <FlatButton
          label={buttons[0]}
          labelStyle={{fontWeight: 'bold', fontSize: '15px', color: '#00B2B4', fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
          style={{width: '130px', textAlign: 'left', display: 'inline-block'}}
          onTouchTap={() => this.select(0)}
        /><br/>
        <CopyToClipboard text={window.location.href} onCopy={() => this.setState({copied: true})}>
          <FlatButton
            label={buttons[1]}
            labelStyle={{fontWeight: 'bold', fontSize: '15px', color: '#00B2B4', fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
            style={{width: '130px', textAlign: 'left', display: 'inline-block'}}
            onTouchTap={() => this.select(1)}
          />
        </CopyToClipboard>
      </div>
    )

    const buttonDropdown = (
      <FontIcon className="material-icons" style={{color:'#8f8f8f'}}>
        keyboard_arrow_down
      </FontIcon>
    )

    return(
      <Dropdown button={buttonDropdown} float='right' marginMobile='0px 0px 0px -100px'>
        {button}
      </Dropdown>
    )
  }
})

export default ShareDropdown
