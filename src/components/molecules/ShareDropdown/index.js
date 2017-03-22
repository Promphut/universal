import React from 'react'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton';
import onClickOutside from 'react-onclickoutside'

const Dropdown = styled.div`
  float: right;

  &:hover{
    cursor:pointer;
  }
`

const DropdownContent = styled.div`
  visibility: ${props => props.dropdown ? 'visible' : 'hidden'};
  opacity: ${props => props.dropdown ? '1' : '0'};
  transition: .2s;
  // display: ${props => props.dropdown ? 'block' : 'none'};
  position: absolute;
  marginLeft: -5px;
  padding: 0px;
  border: 2px solid rgba(0,178,180,1);
  background: white;
  z-index: 1;
`

const ShareDropdown = onClickOutside(React.createClass({
  getInitialState() {
    return {
      open: false
    }
  },

  handleTouchTap(){
    if (!this.state.open) {
      this.setState({
        open: true
      })
    } else {
      this.setState({
        open: false
      })
    }
  },

  handleRequestClose(index) {
    if (index === 0) {
      console.log('Select Share')
    } else if (index === 1) {
      console.log('Select Copy Link')
    }
    this.setState({
      open: false
    })
  },

  handleClickOutside() {
    this.setState({
      open: false
    })
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
        <FlatButton
          key={i}
          label={buttons[i]}
          labelStyle={{fontWeight: 'bold', fontSize: '15px', color: '#00B2B4', fontFamily:"'Nunito', 'Mitr'", textTransform:'none'}}
          style={{width: '130px', textAlign: 'left', display: 'inline-block'}}
          onTouchTap={() => this.handleRequestClose(i)}
        />
      )
      button.push(<br/>)
    }

    return(
      <Dropdown>
        <FontIcon
          className="material-icons" style={{color:'#8f8f8f'}}
           onClick={this.handleTouchTap}
          >keyboard_arrow_down
        </FontIcon>
        <DropdownContent dropdown={this.state.open}>
          {button}
        </DropdownContent>
      </Dropdown>
    )
  }
}))

export default ShareDropdown
