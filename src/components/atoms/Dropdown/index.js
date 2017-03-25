import React from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'

const DropdownWrapper = styled.div`
  float: ${props => props.float};

  &:hover{
    cursor: pointer;
  }
`

const DropdownButton = styled.div`
`

const DropdownContent = styled.div`
  visibility: ${props => props.open ? 'visible' : 'hidden'};
  opacity: ${props => props.open ? '1' : '0'};
  transition: .2s;
  position: absolute;
  margin: ${props => props.margin}
  padding: 0px;
  border: 2px solid rgba(0,178,180,1);
  background: white;
  z-index: 1;

	@media (max-width: 991px) {
    margin: ${props => props.marginMobile}
  }
`


const Dropdown = onClickOutside(React.createClass({
  getInitialState () {
    return {
      open: false
    }
  },

  handleClick () {
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

  handleSelect () {
    this.setState({
      open: false
    })
  },

  // method from onClickOutside
  handleClickOutside () {
    this.setState({
      open: false
    })
  },

  render () {
    return (
      <DropdownWrapper float={this.props.float}>
        <DropdownButton onClick={this.handleClick}>
          {this.props.button}
        </DropdownButton>
        <DropdownContent
          open={this.state.open}
          margin={this.props.margin}
          marginMobile={this.props.marginMobile}
          onClick={this.handleSelect}
        >
          {this.props.children}
        </DropdownContent>
      </DropdownWrapper>
    )
  }
}))

export default Dropdown
