import React from 'react'
import { PageTemplate, TopBarWithNavigation, ArticlePage, RecommendArticle, TrendingSideBar, ShareSideBar,BGImg} from 'components'
import {Link} from 'react-router'
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'

const Wrapper = styled.div`
	.recommends{
		font-size:19px;
		color:#8F8F8F;
	}
	@media(max-width:480px){
    .center{
      justify-content: center;
    }
		.recommends{
			font-size:16px;
		}
  }
`

const GradientOverlay = styled.div`
	background: -moz-linear-gradient(-45deg,  rgba(202,130,172,0.3) 0%, rgba(49,77,170,0.3) 100%);
	background: -webkit-linear-gradient(-45deg,  rgba(202,130,172,0.3) 0%,rgba(49,77,170,0.3) 100%);
	background: linear-gradient(135deg,  rgba(202,130,172,0.3) 0%,rgba(49,77,170,0.3) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4dca82ac', endColorstr='#4d314daa',GradientType=1 );

	bottom:0;
	top:0; left:0;
	right:0;
	position:absolute;
	z-index:0
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
`
const Share = styled.div`
	flex: 1 150px;
	position:relative;
	max-width: 150px;
	margin-right:10px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`

const Aside = styled.div`
	flex: 3 325px;
	position:relative;
	max-width: 325px;
	margin-left:60px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const RecommendContainer = styled.div`
	flex:12 1160px;
	max-width:1160px;
	margin-top:60px;
	@media (max-width: 480px) {
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`
const Recommend = styled.div`
	flex:1 540px;
	max-width:540px;
	margin:10px 20px 0 0;
`
const rec = {
	name:'Donald Trump’s First, Alarming Week',
	column:'Money Ideas',
	writer:'RYAN LIZZA',
	vote:'18',
	comment:'3'
}
const trending = {
	name:'โมหจริตดินฮิปฮอปด็อกเตอร์โมหจริตแอดมิสชััน?',
	vote:'18',
	comment:11,
	photo:'/tmp/story-list/1485309433041-Screen-Shot-2017-01-23-at-33221-PM-1.png'
}
const trendingArray = [trending,trending,trending,trending,trending,trending]
const Page3 = React.createClass({
	getInitialState(){
		return {
			stopPos:''
		}
	},

	updateDimensions(){
		this.setState({
			width: window.getWidth(),
			height: window.getHeight()
		});
	},

	componentWillMount(){
		this.updateDimensions();
	},

	componentDidMount(){
		this.setState({
			stopPos:dom(this.refs.recommend).getBoundingClientRect().top
		})
	},


	render(){
		var {stopPos} = this.state
		return (
		    <Wrapper >
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} />

		      <BGImg style={{width:'100%',height:'90vh'}} src='/tmp/a-story/pic-min.jpg'/>

		      <Content>
						<Share ref='share'>
							<ShareSideBar stop={stopPos}/>
						</Share>

						<Main>
							<ArticlePage/>
			      </Main>

			      <Aside  id='trendingBar' ref='trendingBar'><TrendingSideBar stop={stopPos} detail={trendingArray} /></Aside>
		      </Content>
					<Content>
						<RecommendContainer ref='recommend'>
							<div className='recommends sans-font'>Recommends</div>
							<div className='row center'>
								<div className='col-lg-6 col-md-6 col-sm-12'>
									<Link to='#'><RecommendArticle detail={rec}/></Link>
									<Link to='#'><RecommendArticle detail={rec}/></Link>
								</div>
								<div className='col-lg-6 col-md-6 col-sm-12'>
									<Link to='#'><RecommendArticle detail={rec}/></Link>
									<Link to='#'><RecommendArticle detail={rec}/></Link>
								</div>
							</div>
						</RecommendContainer>
					</Content>
		   </Wrapper>
		  )
	}
});

export default Page3;
