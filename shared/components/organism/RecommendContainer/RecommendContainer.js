import React from 'react';
import styled from 'styled-components';
import { RecommendArticle } from '../../../components';

const Recommend = styled.div`
	flex:12 1275px;
	max-width:1275px;
	margin-top:60px;
  .recommends{
		font-size:20px;
		color:#222;
		font-weight:bold;
    margin-left:23px;
	}
	@media (max-width: 480px) {
		flex:1 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
    .mobile{
      width:100%;
      display:block;
    }
    .recommends{
      margin-left:0px;
    }
	}
`
// const Row = styled.div`
//   display:flex;
//   flex-direction: row;
//   flex-wrap:wrap;
//   flex
// `
const RecommendContainer = ({ style, className, stories }) => {
  return(
    <Recommend style={{ ...style }} className={className}>
      <div className="recommends sans-font">Recommends</div>
      <div className="row center">
        {stories&&stories.map((data,i)=>(
          <RecommendArticle detail={data} key={i}/>
        ))}
      </div>
    </Recommend>
  )
}

export default RecommendContainer;
