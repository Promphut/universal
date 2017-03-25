import React from 'React'
import styled from 'styled-components'
import {RecommendArticle} from 'components'

const Recommend = styled.div`
	flex:12 1275px;
	max-width:1275px;
	margin-top:60px;
  .recommends{
		font-size:20px;
		color:#222;
		font-weight:bold;
	}
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`
const RecommendContainer = ({style,className,recommend})=>{
  return(
    <Recommend style={{...style}} className={className} >
      <div className='recommends sans-font' style={{marginLeft:'23px'}}>Recommends</div>
      <div className='row center'>
        {recommend.length!=0?recommend.map((data,index)=>(
          <div className='col-lg-6 col-md-6 col-sm-12' key={index}>
            <RecommendArticle detail={data}/>
          </div>
        )):''}
      </div>
    </Recommend>
  )
}

export default RecommendContainer