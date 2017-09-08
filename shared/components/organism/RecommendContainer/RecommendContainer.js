import React from 'react';
import styled from 'styled-components';
import { RecommendArticle } from '../../../components';

const Recommend = styled.div`
  flex: 8 730px;
  max-width: 730px;
  @media (max-width:480px){
    display:none;
  }
`
const Head = styled.div`
  font-size:20px;
  color:#222;
  font-family:'PT sans';
  font-weight:bold;
`
const Dash = styled.div`
margin:5px 0 0 0;
width:30px;
height:4px;
background-color:${props => props.theme.accentColor};
`;
const Row = styled.div`
  flex: 8 730px;
  max-width: 730px;
  display:flex;
  flex-wrap:wrap;
  flex-flow:<‘flex-wrap’>;
  justify-content:space-between;
`

const RecommendContainer = ({ style, className, stories }) => {
  return(
    <Recommend style={{ ...style }} className={className}>
      <Head>Recommends</Head>
      <Dash/>  
      <Row>
        {stories&&stories.map((data,i)=>(
          <RecommendArticle detail={data} key={i}/>
        ))}
      </Row>
    </Recommend>
  )
}

export default RecommendContainer;
