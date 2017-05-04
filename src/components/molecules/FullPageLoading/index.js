import React, {PropTypes} from 'react'
import {Link}from 'react-router'
import styled, {keyframes} from 'styled-components'

const Container = styled(Link)`
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:white;
  display:flex;
  align-items: center;
  justify-content: center;
  z-index:500;
`
const Rotate = styled.div`
	width:50px;
	height:50px;
	background:red;
	animation: ${props=> props.open?rot:rot2} 2s linear infinite;
`
const rot = keyframes`
	0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const rot2 = keyframes`

`


const FullPageLoading = ({style}) => {
	return (
    <Container style={{...style}}>
      <Rotate open={true}/>
    </Container>     
	)
}

export default FullPageLoading;
