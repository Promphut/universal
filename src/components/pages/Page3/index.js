import React from 'react'
import { PageTemplate, TopBarWithNavigation, ArticlePage, RecommendArticle, TrendingSideBar, ShareSideBar,OverlayImg} from 'components'
import {Link} from 'react-router'
import styled from 'styled-components'
import {findDOMNode as dom} from 'react-dom'

const Wrapper = styled.div`
	.fixedPos{
		position:fixed;
		top:70px;
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

const Cover = (props) => (
	<OverlayImg src="/tmp/a-story/pic-min.jpg" style={{maxHeight: props.height-120+'px'}}/>
)

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;

`
const Share = styled.div`
	flex: 1 150px;
	position:relative;
	max-width: 150px;
	margin-right:20px;
	@media (max-width: 1160px) {
		display:none;
	}
`

const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
	@media (max-width: 480px) {
		flex: 12;
	}
`

const Aside = styled.div`
	flex: 3 350px;
	position:relative;
	max-width: 350px;
	margin-left:80px;
	@media (max-width: 1160px) {
		display:none;
	}
	
`

const Footer = styled.div`
	text-align:center;
	background: lightgreen;
	height:400px;
`

const RecommendContainer = styled.div`
	overflow:hidden;
	display:flex;
	flex-flow: row wrap;
	justify-content: center;
	margin-top:60px;
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
                                  
	fixedTrending(e){

	},

	componentWillUnmount() {
        //window.removeEventListener("resize", this.updateDimensions);
  },

	trendingScroll(e){
		console.log(e)
	},

	render(){
		var {stopPos} = this.state
		return (
		    <Wrapper >
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={true} />

		      <Cover width={this.state.width} height={this.state.height}/>

		      <Content>
						<Share ref='share'>
							<ShareSideBar stop={stopPos}/>
						</Share>

						<Main>
							<ArticlePage/>
			      </Main>
			      
			      <Aside  id='trendingBar' className='' ref='trendingBar'><TrendingSideBar stop={stopPos} detail={trendingArray} /></Aside>
		      </Content>
						
					<RecommendContainer ref='recommend'>
						<Recommend>
							<div style={{fontSize:'19px',color:'#8f8f8f'}}>Recommends</div>
							<Link to='#'><RecommendArticle detail={rec}/></Link>
							<Link to='#'><RecommendArticle detail={rec}/></Link>
						</Recommend>
						<Recommend>
							<div style={{height:'22px'}}></div>
							<Link to='#'><RecommendArticle detail={rec}/></Link>
							<Link to='#'><RecommendArticle detail={rec}/></Link>
						</Recommend>
					</RecommendContainer>
		   </Wrapper>
		  )
	}
});

export default Page3;