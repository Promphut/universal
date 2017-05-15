import React from 'react'
import { PageTemplate, TopBarWithNavigation, OverlayImg, Thumpnail,
	ThumpnailSmall, ArticleBox, ArticleBoxLarge, ThumpnailRow, TopColumnSidebar,
	TopWriterSidebar, More, BGImg, StoryDropdown, Footer,TopStory,TopVideo,TopNewsHome,StaffPickSideBar} from 'components'
import styled from 'styled-components'
//import Request from 'superagent'
import auth from 'components/auth'
import api from 'components/api'
import slider from 'react-slick'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import FontIcon from 'material-ui/FontIcon';

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
	padding: 80px 0 0 0;

	@media (max-width:480px) {
		padding: 70px 0 0 0;
  }

	@media (min-width: 481px) {
		min-height: 480px;
	}
`

const Main = styled.div`
	flex: 3 825px;
	max-width: 825px;
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
	display:flex;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
  }
`

const Aside = styled.div`
	flex: 1 255px;
	max-width: 255px;
	margin-left:60px;
	@media (max-width: 1160px) {
		display:none;
	}
`
const Text = styled.div`
	color:#8F8F8F;
	font-size:19px;
`
const Dash = styled.div`
  margin:5px 0 0 0;
  width:30px;
  height:4px;
  background-color:${props=>props.theme.accentColor};
`

const TextLine = styled.div`
  color:${props=>props.theme.primaryColor};
  font-size:28px;
  font-weight:bold;
`
const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`

const MiniBoxDark = styled.div`
	flex:1;
	height:222px;
	background-color:${props=>props.theme.primaryColor};
	display:flex;
  align-items: center;
  justify-content: center;
`

const Line = styled.div`
	background:${props=>props.theme.accentColor};
	width:100%;
	height:4px;
	margin:20px 0 20px 0;
`
const HomePage = React.createClass({
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
			loadOffset:300,
			feedCount:0,
			isMobile:false,
			completed:0
		}
	},
	componentWillMount(){
		//this.timer = this.progress(0)
	},
	componentDidMount(){
		this.getPublisher()
		this.getFeed()
		this.getSidebar()
		this.setState({
			isMobile:window.isMobile(),
			completed:100
		})

		// this.progress(100)
	},

	// componentDidUpdate(prevProps, prevState){
  //   clearTimeout(this.timer);
	// 	this.progress(100)
  // },


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
		api.getFeed('article', {status:1}, 'latest', null, 0, 15)
		.then(result => {
			if(result) {
				this.setState({
					latestStories: result.feed
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

		api.getFeed('article', {status:1}, 'latest', null, page, 10)
		.then(result => {
			var s = this.state.latestStories.concat(result.feed)
			this.setState({
				feedCount:result.count[1],
				latestStories:s,
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
		//console.log('Onload')
		this.buildElements(this.state.page)
		this.setState({
				isInfiniteLoading: true,
				page:this.state.page+1
		});
	},

	componentWillUnmount() {
    //clearTimeout(this.timer);
  },

  // progress(completed) {
	// 	if(this.state.completed<100){
	// 		if (completed > 100) {
  //     	this.setState({completed: 100});
	// 		} else {
	// 			this.setState({completed});
	// 			const diff = Math.random() * 10;
	// 			this.timer = setTimeout(() => this.progress(completed + diff), 200);
	// 		}
	// 	}
  // },

	elementInfiniteLoad() {
			return <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>;
	},

	render(){
		//console.log('context', this.context.setting)
		var {count,loadOffset,isInfiniteLoading,latestStories,isMobile,completed} = this.state
		let pub = this.publisher
		//console.log(this.props.onLoading)
		return (
		    <Wrapper>
					{/*{completed<100&&<LinearProgress mode="determinate" value={completed} />}*/}
		    	{pub && <BGImg src={pub.cover.medium} opacity={-1} style={{width:'100%',height:'350px'}}
					className="hidden-mob" alt={pub.name} />}

	      		<TopBarWithNavigation title={'Title of AomMoney goes here..'} onLoading={this.props.onLoading}/>
					
					<Content style={{padding:'100px 0 60px 0',backgroundColor:'#F4F4F4'}}>
						<Feed>
							<TopStory swift={true}></TopStory>
							<TopVideo large={true}></TopVideo>
						</Feed>
						<Feed>
							<TopStory></TopStory>
							<TopVideo large={true} swift={true}></TopVideo>
						</Feed>
						<Feed>
							<div style={{flex:3}}>
								<div style={{display:'flex'}}>
									<TopStory swift={true} large={true}></TopStory>
								</div>
								<div style={{display:'flex'}}>
									<TopStory></TopStory>
									<MiniBoxDark>
										<div style={{width:30}}>
											<i className="fa fa-facebook" style={{margin:'5px',fontSize:'30px',color:'white',display:'block'}} aria-hidden="true"></i>
											<Line></Line>
											<i className="fa fa-twitter" style={{fontSize:'30px',color:'white',display:'block'}} aria-hidden="true"></i>
										</div>	
									</MiniBoxDark>
								</div>
							</div>
							<div style={{flex:2,display:'flex'}}>
								<TopNewsHome></TopNewsHome>
							</div>
						</Feed>
					</Content>

		      <Content>
			      <Main>
							<TextLine className='sans-font'>LATEST STORIES</TextLine>
							<Dash style={{margin:'5px 0 10px 0'}}></Dash>

							{latestStories.length!=0?latestStories.map((story, index) => (
								<ArticleBox detail={story} key={index}/>
							)):''}

							<More style={{margin:'30px auto 30px auto'}}/>
			      </Main>
			      <Aside>
							<StaffPickSideBar></StaffPickSideBar>
						</Aside>
		      </Content>
					<Footer/>
		   </Wrapper>
		  )
	}
});

HomePage.contextTypes = {
	setting: React.PropTypes.object
};

export default HomePage;
