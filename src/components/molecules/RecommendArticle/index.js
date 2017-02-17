import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {} from 'components'

const Container = styled.div`
  width:540px;
  margin-top:30px;
  @media (min-width:481px) {
    .serif-font {
      font-family: 'PT Serif', 'Mitr';
    }
    .sans-font {
      font-family: 'PT Sans', 'cs_prajad', sans-serif;
    }
  }

  /* FOR MOBILE */
  @media (max-width:480px) {
    .serif-font {
      font-family: 'Roboto Slab', 'Mitr';
    }
    .sans-font {
      font-family: 'Roboto', 'cs_prajad', sans-serif;
    }
  }
`
const Img = styled.img`
  width:100%;
  height:314px;
  background-position:center;
  background-size:cover;
`

const Div = styled.div`
  color:#8F8F8F;
  font-size:15px;
  text-align:center;
  margin:10px 0 10px 0;
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
`


const RecommendArticle = ({detail})=>{
  var {column,name,writer,vote,comment} = detail
  return(
    <Container>
      <Img src='/tmp/story-list/1485309433041-Screen-Shot-2017-01-23-at-33221-PM-1.png'/>
      <Div className='sans-font'>in <Column>{column}</Column></Div>
      <Name className='serif-font'>{name}</Name>
      <Div className='sans-font'>By <strong>{writer}</strong> - {vote} Votes {comment} Comments</Div>
    </Container>
  )
}
    


export default RecommendArticle;