import React from 'react'
import PropTypes from 'prop-types'
import {
	TopBarWithNavigation,
	TopWriterSidebar,
	BGImg,
	NewsBox,
	Footer,
	TopNews,
	TopNewsSmall,
	BackToTop
} from 'components'
import styled from 'styled-components'
import auth from 'components/auth'
import api from 'components/api'
import slider from 'react-slick'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from 'material-ui/CircularProgress'
import LinearProgress from 'material-ui/LinearProgress'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import utils from '../../../services/utils'

const Wrapper = styled.div`
	@media (max-width:480px) {
		max-width: 100%;
		width:100%;
		.paddingTop{
			padding-top:10px;
		}
  }
	.center{
		margin:0 auto 0 auto;
	}
	.paddingTop{
		padding-top:40px;
	}
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 40px 0 0 0;

	@media (max-width:480px) {
		padding: 10px 0 0 0;
  }

	@media (min-width: 481px) {

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
	margin-left:25px;
	@media (max-width: 1160px) {
		display:none;
	}
`
const Text = styled.div`
	color:#8E8E8E;
	font-size:16px;
	font-weight:normal;
	text-align:center;
	width:864px;
	padding:35px;
	@media (max-width: 480px) {
		width:100%;
		padding:15px;
	}
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
	margin:30px 0 0 0;
`

const Head = styled.div`
	font-size:64px;
	font-weight:bold;
	text-align:center;
	padding:0 25px 0 25px;
	margin:0 auto 0 auto;
	background:white;
	width:280px;
`

const News = styled.div`
	font-size:18px;
	color:white;
	z-index:0;
	height:60px;
	text-align:center;
	vertical-align: middle;
	@media (max-width: 480px) {
		z-index:1000;
	}
`

// const Infinite2 = styled(Infinite)`
// 	overflow-y:visible !important;
// `

class NewsPage extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.writer = []
		this.column = []

		this.state = {
			page: 0,
			feedCount: 1,
			feed: [],
			hasMoreFeed: true,

			trendingNews: [],

			isMobile: false,
			selectTab: 0,
			shortDesc: ''
		}
	}

	getTrendingNews = () => {
		api.getFeed('news', { status: 1 }, 'trending', null, 0, 4).then(result => {
			if (result) {
				this.setState({
					trendingNews: result.feed
				})
			}
		})
	}

	onload = () => (
		<Onload>
			<div className="row">
				<CircularProgress
					size={60}
					thickness={6}
					style={{ width: '60px', margin: '0 auto 0 auto' }}
				/>
			</div>
		</Onload>
	)
	loadFeed = () => {
		return () => {
			// ensure this method is called only once at a time
			if (this.loading === true) return
			this.loading = true

			let page = this.state.page
			//console.log('page', page)
			var sort = this.state.selectTab ? 'trending' : 'latest'
			api.getFeed('news', { status: 1 }, sort, null, page, 15).then(result => {
				let feed = this.state.feed.concat(result.feed)
				this.setState(
					{
						page: ++page,
						feed: feed,
						feedCount: result.count['1']?result.count['1']:0,
						hasMoreFeed: feed.length < result.count['1']
					},
					() => {
						this.loading = false
					}
				)
			})
		}
	}

	handleChangeTab = e => {
		this.setState({ selectTab: e })
		this.loadFeed()
	}

	componentDidMount() {
		this.getTrendingNews()
		this.setState({
			isMobile: utils.isMobile()
		})
		api.getColumnFromSlug('news').then(col => {
			this.setState({ shortDesc: col.shortDesc })
		}).catch((er)=>{
			this.setState({ shortDesc: '' })
		})
	}

	render() {
		let {
			feedCount,
			feed,
			hasMoreFeed,
			trendingNews,
			isMobile,
			selectTab,
			shortDesc
		} = this.state
		let pub = this.context.setting.publisher
		let { theme } = this.context.setting.publisher
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

		return (
			<Wrapper>
				<TopBarWithNavigation onLoading={this.props.onLoading} />
				<News>News</News>
				{!isMobile
					? <Content>
							<Feed>
								<Head className="serif-font hidden-mob">NEWS</Head>
								<Line className="hidden-mob" style={{ top: '-41px' }} />
								<Text className="center">{shortDesc}</Text>
							</Feed>
						</Content>
					: ''}
				<Content style={{ paddingTop: '0px' }} className="hidden-mob">
					<Main>
						<TopNews detail={trendingNews[0]} />
					</Main>
					<Aside>
						<TopNewsSmall detail={trendingNews[1]} />
						<TopNewsSmall detail={trendingNews[2]} />
						<TopNewsSmall
							detail={trendingNews[3]}
							style={{ borderBottom: '1px solid #000' }}
						/>
					</Aside>
				</Content>
				<Content>
					<Feed>
						<Tabs
							style={{ width: '100%' }}
							tabItemContainerStyle={{ ...styles.tabs }}
							inkBarStyle={{ background: theme.accentColor, height: 3 }}
							onChange={this.handleChangeTab}
							value={selectTab}
							className="hidden-des">
							<Tab
								buttonStyle={{
									...styles.tab,
									color: selectTab == 0 ? '#222' : '#c4c4c4'
								}}
								label="Latest"
								value={0}
							/>
							<Tab
								buttonStyle={{
									...styles.tab,
									color: selectTab == 1 ? '#222' : '#c4c4c4'
								}}
								label="Trending"
								value={1}
							/>
						</Tabs>
						<Tabs
							style={{ width: 360 }}
							tabItemContainerStyle={{ ...styles.tabs }}
							inkBarStyle={{ background: theme.accentColor, height: 3 }}
							onChange={this.handleChangeTab}
							value={selectTab}
							className="hidden-mob">
							<Tab
								buttonStyle={{
									...styles.tab,
									color: selectTab == 0 ? '#222' : '#c4c4c4'
								}}
								label="LATEST NEWS"
								value={0}
							/>
							<Tab
								buttonStyle={{
									...styles.tab,
									color: selectTab == 1 ? '#222' : '#c4c4c4'
								}}
								label="TRENDING"
								value={1}
							/>
						</Tabs>
						<Line />

						<SwipeableViews
							index={selectTab}
							onChangeIndex={this.handleChangeTab}>
							<Latest>
								<InfiniteScroll
									loadMore={this.loadFeed()}
									hasMore={hasMoreFeed}
									loader={this.onload()}>
									<div>
										{feed.map((item, index) => (
											<NewsBox detail={item} key={index} timeline={true} />
										))}
									</div>
								</InfiniteScroll>
							</Latest>
							<Trending>
								<InfiniteScroll
									loadMore={this.loadFeed()}
									hasMore={hasMoreFeed}
									loader={this.onload()}>
									<div>
										{feed.map((item, index) => (
											<NewsBox detail={item} key={index} timeline={false} />
										))}
									</div>
								</InfiniteScroll>
							</Trending>
						</SwipeableViews>
					</Feed>
				</Content>
				<BackToTop scrollStepInPx="200" delayInMs="16.66" showOnTop="600" />
				<Footer />
			</Wrapper>
		)
	}
}

export default NewsPage
