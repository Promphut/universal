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

const Column = styled(Link)`
  font-weight:bold;
`

const NameLink = styled(Link)`
  display: block;
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
  let {column,title,writer,votes,comments,url,cover} = detail

  return(
    <Container>
      <Link to={url}><OverlayImg src={cover} className='imgWidth' /></Link>
      <Div className='sans-font'>in <Column to={column.url}>{column.name}</Column></Div>
      <NameLink to={url} className='serif-font'>{title}</NameLink>
      <Div className='sans-font'>By <Link to={writer.url}><strong>{writer.display}</strong></Link> - {votes ? votes.total : 0} Votes {comments ? comments.count : 0} Comments</Div>
    </Container>
  )
}

export default RecommendArticle;