import React from 'react'
import PropTypes from 'prop-types'
import { TopBarWithNavigation, BGImg, ArticleBox, TopColumnSidebar, TopWriterSidebar, More, Footer} from 'components'
import styled from 'styled-components'
//import Request from 'superagent'
import auth from 'components/auth'
import api from 'components/api'
import slider from 'react-slick'
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import utils from '../../../services/utils'

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

	@media (max-width:480px) {
		padding: 70px 0 0 0;
  }

	@media (min-width: 481px) {
		min-height: 480px;
	}
`

const Main = styled.div`
	flex: 3 731px;
	max-width: 731px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
  }

	.hidden-des-flex {
		display: none !important;
		@media (max-width: 480px) {
			display: flex !important;
	  }
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

const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`
// const Infinite2 = styled(Infinite)`
// 	overflow-y:visible !important;
// `

class HomePage2 extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		//this.trendingStories = []
		//this.latestStories = []
		this.writer = []
		this.column = []

		this.state = {
			//latestStories:[],
			//refresh: 0,
			//isInfiniteLoading: false,
			//loadOffset:300,
			page:0,
			feedCount:-1,
			feed: [],
			hasMoreFeed: true,

			isMobile:false
		}
	}	

	getPublisher = () => {
		api.getPublisher()
		.then(pub => {
			this.publisher = pub

			this.setState({
				//refresh: Math.random()
			})
		})
	}

	// getFeed = () => {
	// 	// - Fetching latestStories
	// 	api.getFeed('article', {status:1}, 'latest', null, 0, 15)
	// 	.then(result => {
	// 		if(result) {
	// 			this.trendingStories = result.feed

	// 			this.setState({
	// 				//refresh: Math.random()
	// 			})
	// 		}
	// 	})
	// }

	getSidebar = () => {
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
				//refresh: Math.random()
			})
		})
	}

	onload = () => <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>
	loadFeed = () => {
		return () => {
			// ensure this method is called only once at a time
			if(this.loading===true) return 
			this.loading = true

			let page = this.state.page
			//console.log('page', page)

			api.getFeed('article', {status:1}, 'latest', null, page, 15)
			.then(result => {

				let feed = this.state.feed.concat(result.feed)
				this.setState({
					page: ++page,
					feed: feed,
					feedCount: result.count['1'],
					hasMoreFeed: feed.length < result.count['1']
				}, () => {this.loading = false})
			})
		}
	}

	// buildElements = () => {
	// 	let page = this.state.page

	// 	api.getFeed('article', {status:1}, 'latest', null, page, 2)
	// 	.then(result => {
	// 		let s = this.state.latestStories.concat(result.feed)
	// 		this.setState({
	// 			feedCount:result.count['1'],
	// 			latestStories:s,
	// 		},()=>{
	// 			if(s.length==result.count['1']){
	// 				//console.log('000000')
	// 				this.setState({
	// 					loadOffset:undefined,
	// 					isInfiniteLoading: false,
	// 				})
	// 			}else{
	// 				//console.log('111111111')
	// 				this.setState({
	// 					isInfiniteLoading: false
	// 				})
	// 			}
	// 		})
	// 	})
	// }

	// handleInfiniteLoad = () => {
	// 	//console.log('Onload')
	// 	this.buildElements(this.state.page)
	// 	this.setState({
	// 		isInfiniteLoading: true,
	// 		page:this.state.page+1
	// 	});
	// }

	// elementInfiniteLoad = () => {
	// 	return <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>;
	// }

	componentDidMount(){
		this.getPublisher()
		//this.getFeed()
		this.getSidebar()
		this.setState({
			isMobile:utils.isMobile()
		})
	}

	render(){
		//let {feedCount,loadOffset,isInfiniteLoading,latestStories,isMobile,completed} = this.state
		let {feedCount,feed,hasMoreFeed,isMobile} = this.state
		let pub = this.publisher
		//console.log(this.props.onLoading)
		//console.log(feedCount)
		return (
		    <Wrapper>
		    	{pub && <BGImg src={pub.cover.medium} opacity={-1} style={{width:'100%',height:'350px'}} className="hidden-mob" alt={pub.name} />}

	      		<TopBarWithNavigation title={'Title of AomMoney goes here..'} onLoading={this.props.onLoading}/>
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
						<InfiniteScroll
						    loadMore={this.loadFeed()}
						    hasMore={hasMoreFeed}
						    loader={this.onload()}
						>
							<div>
							    {feed.map((item, index) => (
									<ArticleBox detail={item} key={index}/>
								))}
							</div>
						</InfiniteScroll>
						{/*<Infinite
						containerHeight={!isMobile?(feedCount*210)-100:(feedCount*356)-100}
						elementHeight={!isMobile?210:356}
						infiniteLoadBeginEdgeOffset={loadOffset}
						onInfiniteLoad={this.handleInfiniteLoad}
						loadingSpinnerDelegate={this.elementInfiniteLoad()}
						isInfiniteLoading={isInfiniteLoading}
						useWindowAsScrollContainer={true}>

							{latestStories.length!=0  && latestStories.map((story, index) => (
								<ArticleBox detail={story} key={index}/>
							))}

						</Infinite>*/}

						<More style={{margin:'30px auto 30px auto'}}/>
			      </Main>
			      <Aside>
						<TopColumnSidebar column={this.column}/>
						<TopWriterSidebar writer={this.writer}/>
					</Aside>
		      	</Content>
				<Footer/>
		   </Wrapper>
		)
	}
}

export default HomePage2;
