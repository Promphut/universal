import React from 'react'
import { PageTemplate, TopBarWithNavigation, OverlayImg, Thumpnail,
	ThumpnailSmall, ArticleBox, ArticleBoxLarge, ThumpnailRow, TopColumnSidebar,
	TopWriterSidebar, More, BGImg} from 'components'
import styled from 'styled-components'
//import Request from 'superagent'
import auth from 'components/auth'
import api from 'components/api'
import slider from 'react-slick'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress';

const Wrapper = styled.div`
	@media (max-width:480px) {
		max-width: 100%;
		width:100%;
  }
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 140px 0 0 0;
`

const Main = styled.div`
	flex: 3 731px;
	max-width: 731px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
  }
`
const Feed = styled.div`
	flex: 12 1120px;
	max-width: 1120px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
  }
`

const Aside = styled.div`
	flex: 1 350px;
	max-width: 350px;
	margin-left:60px;
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
const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`
// const Infinite2 = styled(Infinite)`
// 	overflow-y:visible !important;
// `

const HomePage2 = React.createClass({
	getInitialState(){
		this.trendingStories = []
		this.latestStories = []
		this.writer = []
		this.column = []

		return {
			latestStories:[],
			refresh: 0,
			page:0,
			isInfiniteLoading: false,
			loadOffset:300
		}
	},

	componentDidMount(){
		this.getPublisher()
		this.getFeed()
		this.getSidebar()
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
		// - Fetching latestStories
		api.getFeed('story', {status:1}, 'latest', null, 0, 15)
		.then(result => {
			if(result) {
				this.trendingStories = result.feed

				this.setState({
					refresh: Math.random()
				})
			}
		})
	},

	getSidebar(){
		// - Fetching top columns
		// - Fetch top writers
		Promise.all([
			api.getColumns(),
			api.getPublisherWriters(),
		])
		.then(([columns, writers]) => {
			//console.log('GET FEED', result, columns, writers)
			if(columns) this.column = columns
			if(writers) this.writer = writers

			this.setState({
				refresh: Math.random()
			})
		})
	},

	buildElements() {
		let page = this.state.page

		api.getFeed('story', {status:1}, 'latest', null, page, 10)
		.then(result => {
			var s = this.state.latestStories.concat(result.feed)
			this.setState({
				latestStories:s
			},()=>{
				if(s.length==result.count[1]){
					this.setState({
						loadOffset:'undefined',
						isInfiniteLoading: false,
					})
				}else{
					this.setState({
						isInfiniteLoading: false
					})
				}
			})
		})
	},

	handleInfiniteLoad() {
		this.buildElements(this.state.page)
		this.setState({
				isInfiniteLoading: true,
				page:this.state.page+1
		});	
	},

	elementInfiniteLoad() {
			return <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>;
	},

	render(){
		//console.log('context', this.context.setting)

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
							<Infinite
									className='hidden-mob'
									containerHeight={2000}
									elementHeight={210}
									infiniteLoadBeginEdgeOffset={this.state.loadOffset}
									onInfiniteLoad={this.handleInfiniteLoad}
									loadingSpinnerDelegate={this.elementInfiniteLoad()}
									isInfiniteLoading={this.state.isInfiniteLoading}
									useWindowAsScrollContainer={true}>

								{this.state.latestStories.length!=0?this.state.latestStories.map((story, index) => (
									<ArticleBox detail={story} key={index}/>
								)):''}
							</Infinite>
							<Infinite
									className='hidden-des'
									containerHeight={2800}
									elementHeight={300}
									infiniteLoadBeginEdgeOffset={this.state.loadOffset}
									onInfiniteLoad={this.handleInfiniteLoad}
									loadingSpinnerDelegate={this.elementInfiniteLoad()}
									isInfiniteLoading={this.state.isInfiniteLoading}
									useWindowAsScrollContainer={true}>

								{this.state.latestStories.length!=0?this.state.latestStories.map((story, index) => (
									<ArticleBox detail={story} key={index}/>
								)):''}
							</Infinite>
							<More style={{margin:'30px auto 30px auto'}}/>
			      </Main>
			      <Aside>
							<TopColumnSidebar column={this.column}/>
							<TopWriterSidebar writer={this.writer}/>
						</Aside>
		      </Content>
		   </Wrapper>
		  )
	}
});

HomePage2.contextTypes = {
	setting: React.PropTypes.object
};

export default HomePage2;
