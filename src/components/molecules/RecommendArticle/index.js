import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {OverlayImg} from 'components'

const Container = styled.div`
  width:540px;
  margin:30px auto 0 auto;
  .imgWidth{
    width:540px;
    height:314px;
  }
  @media (max-width:480px){
    width:284px;
    .imgWidth{
      width:284px;
      height:164px;
    }
  }
`

const Div = styled.div`
  color:#8F8F8F;
  font-size:15px;
  text-align:center;
  margin:10px 0 10px 0;
  @media (max-width:480px){
    font-size:12px;
    margin:5px 0 0 0;
  }
`
const Column = styled.span`
  font-weight:bold;
`
const Name = styled.div`
  color:#222;
  font-weight:bold;
  text-align:center;
  font-size:28px;
  padding: 0 30px 0 30px;
  @media (max-width:480px){
    font-size:18px;
  }
`


const RecommendArticle = ({detail})=>{
  var {column,name,writer,vote,comment} = detail
  return(
    <Container>
      <OverlayImg src='/tmp/story-list/1485309433041-Screen-Shot-2017-01-23-at-33221-PM-1.png' className='imgWidth' />
      <Div className='sans-font'>in <Column>{column}</Column></Div>
      <Name className='serif-font'>{name}</Name>
      <Div className='sans-font'>By <strong>{writer}</strong> - {vote} Votes {comment} Comments</Div>
    </Container>
  )
}
    


export default RecommendArticle;