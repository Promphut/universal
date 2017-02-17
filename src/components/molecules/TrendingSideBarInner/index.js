import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {OverlayImg} from 'components'

const Container = styled.div`
  width:324px;
  margin:40px 0 0 0;
  @media (min-width:481px) {
    .sans-font {
      font-family: 'PT Sans', 'cs_prajad', sans-serif;
    }
  }
  /* FOR MOBILE */
  @media (max-width:480px) {
    .sans-font {
      font-family: 'Roboto', 'cs_prajad', sans-serif;
    }
  }
`
const Name = styled.div`
  color:#222;
  font-size:17px;
  width:190px;
  font-weight:bold;
`
const Img = styled.div`
  width:127px;
  height:75px;
  float:right;
  background-position:center;
  background-size:cover;
`
const Vote = styled.div`
  color:#8F8F8F;
  font-size:13px;
  margin-top:15px;
`
const TrendingSideBar = ({style,detail})=>{
  var {name,comment,vote,photo} = detail
  return(
    <Container style={{...style}}>
      <div>
        <OverlayImg src={photo} style={{width:'127',height:'75',float:'right'}}/>
        <Name className="sans-font">{name}</Name>
        <Vote className="sans-font">{vote} Votes {''+ comment} Comments</Vote>
      </div>
    </Container>
  )
}
    
export default TrendingSideBar;