import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {OverlayImg} from 'components'

const Container = styled.div`
  width:255px;
  display:inline;
  .imgWidth{
    width:255px;
    height:365px;
  }
  @media (max-width:480px) {
    width:135px;
    .imgWidth{
      width:135px;
      height:193px;
    }
  }
`
const Div = styled.div`
  color:#8F8F8F;
  font-size:14px;
  @media (max-width:480px) {
    font-size:11px;
  }
`
const Column = styled.span`
  font-weight:bold;
`
const Name = styled.div`
  color:#222;
  font-weight:bold;
  font-size:19px;
  margin:10px 0 0 0;
  @media (max-width:480px) {
    font-size:13px;
  }
`

const Thumpnail = ({detail,style})=>{
  var {name,time} = detail
  return(
    <Container style={{...style}}>
      <OverlayImg src='tmp/16112046_10209835674580972_1744602643_n.jpg' className='imgWidth' />
      <Name className='sans-font'>{name}</Name>
      <Div className='sans-font'>{time} min read</Div>
    </Container>
  )
}
    


export default Thumpnail;