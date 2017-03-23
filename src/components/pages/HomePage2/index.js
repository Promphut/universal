import React from 'react'
import { PageTemplate, TopBarWithNavigation, OverlayImg, Thumpnail,
	ThumpnailSmall, ArticleBox, ArticleBoxLarge, ThumpnailRow, TopColumnSidebar,
	TopWriterSidebar, More, BGImg} from 'components'
import styled from 'styled-components'
//import Request from 'superagent'
import auth from 'components/auth'
import api from 'components/api'
import slider from 'react-slick'

const Wrapper = styled.div`

`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 120px 0 0 0;
`

const Main = styled.div`
	flex: 3 790px;
	max-width: 790px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		min-width: 100%;
		padding:0 15px 0 15px;
  }
`
const Feed = styled.div`
	flex: 12 1120px;
	max-width: 1120px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		min-width: 100%;
		padding:0 15px 0 15px;
  }
`

const Aside = styled.div`
	flex: 1 350px;
	max-width: 350px;

	@media (max-width: 1160px) {
		display:none;
	}
`
const Text = styled.div`
	color:#8F8F8F;
	font-size:19px;
`

const TextLine = styled.div`
	color:#8F8F8F;
	font-size:19px;
	border-bottom:1px solid #E2E2E2;
	padding-bottom:11px;
`

const Footer = styled.div`
	text-align:center;
	background: lightgreen;
	height:400px;
`

const HomePage2 = React.createClass({
	getInitialState(){
		this.trendingStories = []
		this.latestStories = []

		return {
			refresh: 0
		}
	},

	componentDidMount(){
		this.getPublisher()
		this.getFeed()
	},

	getPublisher(){
		api.getPublisher()
		.then(pub => {
			this.publisher = pub

			this.setState({
				refresh: Math.random()
			})
		})
	},

	getFeed(){
		// 1. Fetching trendingStories
		// THIS WILL BE CHANGED TO "TRENDING" SORT IN THE FUTURE ONCE SUPPORTED
		api.getFeed('story', {status:1}, 'latest', null, 0, 15)
		.then(result => {
			//console.log('feed', result.feed.length)
			this.trendingStories = result.feed

			this.setState({
				refresh: Math.random()
			})
		})

		// 2. Fetching latestStories
		api.getFeed('story', {status:1}, 'latest', null, 0, 15)
		.then(result => {
			//console.log('feed', result.feed.length)
			this.latestStories = result.feed

			this.setState({
				refresh: Math.random()
			})
		})
	},

	render(){
		let pub = this.publisher
		//console.log('PUB', pub)
		return (
		    <Wrapper>
		    	{pub && <BGImg src={pub.cover.medium} style={{width:'100%',height:'350px'}} className="hidden-mob" />}

	      		<TopBarWithNavigation title={'Title of AomMoney goes here..'} />

				{/* THIS IS FOR NEXT VERSION - TRENDING
				<Content style={{paddingTop:'100px'}}>
					<Feed>
						<div className='row' style={{display:'block',overflow:'hidden'}}>
							<Text className='sans-font' style={{float:'left'}}>Trending Now</Text>
							<Text className='sans-font' style={{fontSize:'14px',float:'right',margin:'5px'}}>View more</Text>
						</div>
						{!_.isEmpty(this.trendingStories) && <ThumpnailRow detail={this.trendingStories} style={{margin:'20px 0 30px 0'}}/>}
						{!_.isEmpty(this.trendingStories) && <ThumpnailRow detail={this.trendingStories} size='small' style={{margin:'30px 0 30px 0'}}/>}
					</Feed>
				</Content>*/}

		      <Content>
			      <Main>
						<TextLine className='sans-font'>Latest</TextLine>
						{/*{article}*/}
						{this.latestStories.map((story, index) => (
							index%3==0 ? <ArticleBoxLarge detail={story} key={index}/> : <ArticleBox detail={story} key={index}/>
						))}
						<More style={{margin:'30px auto 30px auto'}}/>
			      </Main>
			      <Aside>
						<TopColumnSidebar />
						<TopWriterSidebar />
					</Aside>
		      </Content>
		   </Wrapper>
		  )
	}
});

export default HomePage2;
