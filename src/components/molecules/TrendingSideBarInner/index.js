import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {} from 'components'

const Container = styled.div`
  width:324px;
  margin:40px 0 40px 0;
`
const Name = styled.div`
  color:#222;
  font-size:17px;
  width:190px;
`
const Img = styled.img`
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
        <Img src={photo} />
        <Name>{name}</Name>
        <Vote>{vote} Votes {''+ comment} Comments</Vote>
      </div>
    </Container>
  )
}
    
export default TrendingSideBar;