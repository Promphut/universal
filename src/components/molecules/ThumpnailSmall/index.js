import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {OverlayImg} from 'components'

const Container = styled.div`
  width:203px;
  display:inline;
`
const Div = styled.div`
  color:#8F8F8F;
  font-size:13px;
`
const Column = styled.span`
  font-weight:bold;
`
const Name = styled.div`
  color:#222;
  font-weight:bold;
  font-size:16px;
  margin:10px 0 0 0;
`

const ThumpnailSmall = ({detail,style})=>{
  var {name,time,photo} = detail
  return(
    <Container style={{...style}}>
      <OverlayImg src={photo} style={{width:'203px',height:'290px'}}/>
      <Name className='sans-font'>{name}</Name>
      <Div className='sans-font'>{time} min read</Div>
    </Container>
  )
}
    


export default ThumpnailSmall;