import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {} from 'components'

const Container = styled.div`
  width:324px;
  margin:15px 0 15px 0;
`
const Name = styled.div`
  color:#222;
  font-size:17px;

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

`
const TrendingSideBar = ({style,detail})=>{
  var {name,comment,vote,photo} = detail
  return(
    <Container style={{...style}}>
      <div>
        <Name>{name}</Name>
        <Vote>{vote} Votes {''+ comment} Comments</Vote>
        <Img src={photo} />
      </div>
    </Container>
  )
}
    
export default TrendingSideBar;