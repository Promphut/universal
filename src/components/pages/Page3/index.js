import React from 'react'
import { PageTemplate, TopBarWithNavigation, ArticlePage, RecommendArticle, TrendingSideBar} from 'components'
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

const Cover = React.createClass({
	getInitialState(){
		return {}
	},

	render(){return (
			<div style={{
				overflow:'hidden',
				maxHeight: this.props.height-120+'px',
				position:'relative'
			}}>
				<img src="/tmp/a-story/pic-min.jpg" style={{width: '100%'}}/>
				<GradientOverlay />
			</div>
		)
	}
})

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;

`

const Main = styled.div`
	flex: 9 790px;
	max-width: 790px;
	@media (max-width: 480px) {
		flex: 12;
	}
`

const Aside = styled.div`
	flex: 3 350px;
	position:relative;
	max-width: 350px;
	margin-left:20px;
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
const trendingArray = [trending,trending,trending,trending,trending]
const HomePage2 = React.createClass({
	getInitialState(){
		return {
			startPos:'',
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
			startPos:dom(this.refs.trendingBar).getBoundingClientRect().top,
			stopPos:dom(this.refs.recommend).getBoundingClientRect().top
		})
		// var posTop = dom(this.refs.trendingBar).getBoundingClientRect().top
		// var footPos = dom(this.refs.recommend).getBoundingClientRect().top
		// var self = this
		// window.addEventListener("scroll", function(event) {
		// 	var top = this.scrollY
		// 	if(top>600&&top<footPos-100){
		// 		dom(self.refs.trendingBar).style.top = top-600+'px';
		// 	}else if(top==0){
		// 		dom(self.refs.trendingBar).style.top = posTop+'px';
		// 	}else if(top>footPos-100){
		// 		dom(self.refs.trendingBar).style.top = footPos-730+'px';
		// 	}
		// });
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
		var {startPos,stopPos} = this.state
		return (
		    <Wrapper >
		      <TopBarWithNavigation title={'Title of AomMoney goes here..'} loggedIn={true} />

		      <Cover width={this.state.width} height={this.state.height}/>

		      <Content>
						<Main>
							<ArticlePage/>
			      </Main>
			      
			      <Aside  id='trendingBar' className='' ref='trendingBar'><TrendingSideBar start={startPos} stop={stopPos} detail={trendingArray} /></Aside>
		      </Content>
						
					<RecommendContainer ref='recommend'>
						<Recommend>
							<div style={{fontSize:'19px',color:'#8f8f8f'}}>Recommends</div>
							<Link to='#'><RecommendArticle detail={rec}/></Link>
						</Recommend>
						<Recommend>
							<div style={{height:'22px'}}></div>
							<Link to='#'><RecommendArticle detail={rec}/></Link>
						</Recommend>
						<Recommend>
							<Link to='#'><RecommendArticle detail={rec}/></Link>
						</Recommend>
						<Recommend>
							<Link to='#'><RecommendArticle detail={rec}/></Link>
						</Recommend>
					</RecommendContainer>
				

		      <Footer>This is footer</Footer>
		   </Wrapper>
		  )
	}
});

export default HomePage2;