import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {OverlayImg} from 'components'

const Container = styled.div`
  width:255px;
  display:inline;
`
const Div = styled.div`
  color:#8F8F8F;
  font-size:14px;
`
const Column = styled.span`
  font-weight:bold;
`
const Name = styled.div`
  color:#222;
  font-weight:bold;
  font-size:18px;
  margin:10px 0 0 0;
`

const Thumpnail = ({detail,style})=>{
  var {name,time} = detail
  return(
    <Container style={{...style}}>
      <OverlayImg src='tmp/16112046_10209835674580972_1744602643_n.jpg' style={{width:'255px',height:'356px'}}/>
      <Name className='sans-font'>{name}</Name>
      <Div className='sans-font'>{time} min read</Div>
    </Container>
  )
}
    


export default Thumpnail;