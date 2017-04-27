import React from 'react'
import {  TopBarWithNavigation,TopWriterSidebar, More, BGImg, StoryDropdown, 
        NewsBox,Footer} from 'components'
import styled from 'styled-components'
//import Request from 'superagent'
import auth from 'components/auth'
import api from 'components/api'
import slider from 'react-slick'
import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views';

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
const Line = styled.div`
  position:relative;
  top:-2px;
  z-index:-5;
  width:100%;
  height:1px;
  background-color:#C4C4C4;
`
const Latest = styled.div`
  margin:30px 0 0 0;
`
const Trending = styled.div`
`
// const Infinite2 = styled(Infinite)`
// 	overflow-y:visible !important;
// `

const NewsPage = React.createClass({
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
			completed:0,
      selectTab:0
		}
	},
	componentWillMount(){
		this.timer = this.progress(0)
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

	buildElements() {
		let page = this.state.page

		api.getFeed('story', {status:1}, 'latest', null, page, 10)
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


	getPublisher(){
		api.getPublisher()
		.then(pub => {
			this.publisher = pub

			this.setState({
				refresh: Math.random()
			})
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


	componentWillUnmount() {
    clearTimeout(this.timer);
  },

  progress(completed) {
		if(this.state.completed<100){
			if (completed > 100) {
      	this.setState({completed: 100});
			} else {
				this.setState({completed});
				const diff = Math.random() * 10;
				this.timer = setTimeout(() => this.progress(completed + diff), 200);
			}
		}
  },

	handleChangeTab(e) {
		this.setState({selectTab: e})
	},

	elementInfiniteLoad() {
			return <Onload><div className='row'><CircularProgress size={60} thickness={6} style={{width:'60px',margin:'0 auto 0 auto'}}/></div></Onload>;
	},

	render(){
		var {count,loadOffset,isInfiniteLoading,latestStories,isMobile,completed
      ,latestStories,selectTab} = this.state
		let pub = this.publisher
    var { theme } = this.context.setting.publisher
		const styles = {
			headline: {
				fontSize: 24,
				paddingTop: 16,
				marginBottom: 12,
				fontWeight: 400
			},
			tabs: {
				background: 'none',
				height: '60px',
				color: '#222222'
			},
			tab: {
				fontFamily: "'Nunito', 'Mitr'",
				fontSize: '20px',
				fontWeight: 'bold',
				textTransform: 'none'
			}
		}
    //console.log(latestStories)
		return (
		    <Wrapper>
	      	<TopBarWithNavigation title={'Title of AomMoney goes here..'} />
		      <Content>
            <Feed>
              <Tabs
                style={{ width: 360 }}
                tabItemContainerStyle={{ ...styles.tabs }}
                inkBarStyle={{ background: theme.accentColor, height: 3 }}
                onChange={this.handleChangeTab}
                value={selectTab}>
                <Tab
                  buttonStyle={{...styles.tab,color: selectTab == 0 ? '#222' : '#c4c4c4'}}
                  label="LATEST NEWS"
                  value={0}
                />
                <Tab
                  buttonStyle={{...styles.tab,color: selectTab == 1 ? '#222' : '#c4c4c4'}}
                  label="TRENDING"
                  value={1}
                />
              </Tabs>
              <Line/>
              <SwipeableViews
                index={selectTab}
                onChangeIndex={this.handleChangeTab}
              >
                <Latest>
                  <Infinite
                    containerHeight={!isMobile?(count*210)-100:(count*356)-100}
                    elementHeight={!isMobile?210:356}
                    infiniteLoadBeginEdgeOffset={loadOffset}
                    onInfiniteLoad={this.handleInfiniteLoad}
                    loadingSpinnerDelegate={this.elementInfiniteLoad()}
                    isInfiniteLoading={isInfiniteLoading}
                    useWindowAsScrollContainer={true}>

                    {latestStories.length!=0?latestStories.map((story, index) => (
                      <NewsBox detail={story} key={index}/>
                    )):''}
                  </Infinite>
                </Latest>
                <Trending>
                  Trending
                </Trending>
              </SwipeableViews>
            </Feed>

		      </Content>
					<Footer/>
		   </Wrapper>
		  )
	}
});

NewsPage.contextTypes = {
	setting: React.PropTypes.object
};

export default NewsPage;
