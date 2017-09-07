import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import {BGImg} from '../../../components'

const Container = styled.div`
  flex:0 350px;
  width:350px;
  margin-top:20px;
`
const Img = styled(BGImg)`
  width:350px;
  height:183px;
`
const Column = styled(Link)`
  font-weight:bold;
`
const NameLink = styled(Link)`
  display: block;
  color:#222;
  font-size:18px;
  font-family:'Mitr';
  padding:12px 0 0 0;
`

const RecommendArticle = ({detail,style})=>{
  // if(!detail) return (<Container/>)
  
  let {column,ptitle,writer,url,cover} = detail

  return(
    <Container style={{...style}}>
      <Img src={cover && cover.medium || '/pic/fbthumbnail.jpg'} alt={ptitle} url={url}/>
      <NameLink to={url||'/'} >{ptitle}</NameLink>
    </Container>
  )
}

export default RecommendArticle;
