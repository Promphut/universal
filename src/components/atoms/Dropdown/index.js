import React from 'react'
import styled from 'styled-components'

const DropdownStyle = styled.div`
  display: inline-block;
  height: ${props => props.height}
`

const Dropdown = (props) => {
  return (
    <DropdownStyle
      // onClick: props.onClick,
      // onMouseOver: props.onMouseOver,
      // onMouseLeave: props.onMouseLeave,
      // height: props.height
    >
    {this.props.children}
    </DropdownStyle>
  )
}

export default Dropdown
