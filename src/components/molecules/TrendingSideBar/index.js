import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components'
import {TrendingSideBarInner} from 'components'

const Container = styled.div`
  width:324px;
  margin-top:50px;
`

const Head = styled.div`
  color:#8F8F8F;
  font-size:20px;
  text-align:center;
  margin:20px 0 15px 0;
`
const Divider =styled.div`
  height:1px;
  width:100%;
  background-color:#E2E2E2;
  margin:15px 0 15px 0;
`
const Column = styled.div`
  font-weight:bold;
  font-size:36px;
  color:#00B2B4;
  text-align:center;
`
function mapTrending(data,index){
  return(
    <Link to='#' key={index}><TrendingSideBarInner detail={data}/></Link>
  )
}

const TrendingSideBar = ({style,detail})=>{
  return(
    <Container style={{...style}}>
      <Head>Trending Stories in</Head>
      <Column>Fund</Column>
      <Divider/>
      {detail.map(mapTrending)}
      <Divider/>
    </Container>
  )
}
    
export default TrendingSideBar;