import React from 'react';
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'

const Container = styled.div`
	width: auto;
  z-index:100;
  position: -webkit-sticky;
  position: sticky;
  top: ${props=> props.topOffset?props.topOffset:0}px;
  bottom: ${props=> props.bottomOffset?props.bottomOffset:0}px;
	margin-bottom: ${props => props.marginBottom ? props.marginBottom : 0}px;
`

const Stick = (props) => {
  return (
    <Container
      topOffset={props.fixed ? -100 : props.topOffset}
      bottomOffset={props.bottomOffset}
      style={{...props.style}}
      className={props.className}
      marginBottom={props.marginBottom}
    >
      {props.children}
    </Container>
  )
}

export default Stick;
