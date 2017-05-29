import React from 'react'
import PropTypes from 'prop-types'
import {
	TopBarWithNavigation,
	ArticleBox,
	BGImg,
	Footer,
	StaffPickSideBar,
	TopHome,
	TopVideoHome,
	TopNewsHome,
	LogoLink,
	BackToTop
} from 'components'
import styled from 'styled-components'
import auth from 'components/auth'
import api from 'components/api'
import slider from 'react-slick'
import InfiniteScroll from 'react-infinite-scroller'
//import Infinite from 'react-infinite'
import CircularProgress from 'material-ui/CircularProgress'
import LinearProgress from 'material-ui/LinearProgress'
import FontIcon from 'material-ui/FontIcon'
import { Tabs, Tab } from 'material-ui/Tabs'
import SwipeableViews from 'react-swipeable-views'
import utils from '../../../services/utils'
import isEmpty from 'lodash/isEmpty'

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
	padding: 40px 0 0 0;
	min-height: calc(100vh - ${props => (props.isMobile ? '261px' : '261px')});

	@media (max-width:480px) {
		padding: 0;
  }

`

const Main = styled.div`
	flex: 3 825px;
	max-width: 825px;
	@media (max-width:480px) {
    flex: 0 100%;
		max-width: 100%;
		padding:0 16px 0 16px;
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
  background-color:${props => props.theme.accentColor};
`

const TextLine = styled.div`
  color:${props => props.theme.primaryColor};
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
	background-color:${props => props.theme.primaryColor};
	display:flex;
  align-items: center;
  justify-content: center;
`
const Line = styled.div`
  position:relative;
  top:-2px;
  z-index:-5;
  width:100%;
  height:1px;
  background-color:#C4C4C4;
`
const BG = styled(BGImg)`
	width:100%;
	height:350px;
	display:flex !important;
	align-items:center !important;
	justify-content:center !important;
`
const Tagline = styled.div`
	font-size:20px;
	margin:30px auto 0 auto;
	width:600px;
	text-align:center;
	color:white;
`

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

class HomePage extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	state = {
		isMobile: false,
		completed: 0,
		selectTab: 0,

		page: 0,
		feedCount: -1,
		feed: [],
		hasMoreFeed: true
	}

	constructor(props) {
		super(props)

		this.publisher = {
			cover: {}
		}
		this.writer = []
		this.column = []
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
	reloadFeed = () => {
		this.setState(
			{
				page: 0,
				feedCount: -1,
				feed: [],
				hasMoreFeed: true
			},
			() => {
				this.loadFeed(this.state.tag._id)()
			}
		)
	}
	loadFeed = () => {
		return () => {
			//console.log('LOAD FEED0', tagId, this.loading)
			// ensure this method is called only once at a time
			if (this.loading === true) return
			this.loading = true
			//console.log('LOAD FEED1')

			let page = this.state.page
			//console.log('page', page)

			api
				.getFeed('article', { status: 1 }, 'latest', null, page, 15)
				.then(result => {
					let feed = this.state.feed.concat(result.feed)
					// console.log(result)
					this.setState(
						{
							page: ++page,
							feed: feed,
							feedCount: result.count['1'],
							hasMoreFeed: feed.length < result.count['1']
						},
						() => {
							this.loading = false
						}
					)
				})
		}
	}

	// getPublisher = () => {
	// 	api.getPublisher().then(pub => {
	// 		this.publisher = pub

	// 		this.setState({})
	// 	})
	// }

	handleChangeTab = e => {
		this.setState({ selectTab: e })
	}

	componentDidMount() {
		this.setState({
			isMobile: utils.isMobile(),
			completed: 100
		})
	}

	render() {
		let { isMobile, completed, selectTab } = this.state
		let { feedCount, feed, hasMoreFeed } = this.state
		let pub = this.context.setting.publisher
		let { theme } = this.context.setting.publisher

		//console.log(this.state.feedCount)
		//if(feed.length==0) return <div></div>
		return (
			<Wrapper>
				{!isEmpty(pub) &&
					!utils.isMobile() &&
					<BG
						src={pub.cover && pub.cover.medium}
						opacity={-1}
						className="hidden-mob"
						alt={pub && pub.name}>
						<div>
							<LogoLink to="/" src={theme && theme.llogo} id={'Largelogo'} />
							<Tagline className="nunito-font">{pub && pub.tagline}</Tagline>
						</div>
					</BG>}

				<TopBarWithNavigation
					title={'Title of AomMoney goes here..'}
					onLoading={this.props.onLoading}
				/>

				<TopHome />

				{/*<TopVideoHome className='hidden-mob'></TopVideoHome>*/}
				<Content isMobile={isMobile}>
					<Main>
						<TextLine className="sans-font hidden-mob">LATEST STORIES</TextLine>
						<Dash className="hidden-mob" style={{ margin: '5px 0 10px 0' }} />
						<InfiniteScroll
							loadMore={this.loadFeed()}
							hasMore={hasMoreFeed}
							loader={this.onload()}>
							<div>
								{feed.length != 0 &&
									feed.map((item, index) => (
										<ArticleBox detail={item} key={index} />
									))}
							</div>
						</InfiniteScroll>

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
								label="Stories"
								value={0}
							/>
							<Tab
								buttonStyle={{
									...styles.tab,
									color: selectTab == 1 ? '#222' : '#c4c4c4'
								}}
								label="News"
								value={1}
							/>
							{/*<Tab
			                  buttonStyle={{...styles.tab,color: selectTab == 2 ? '#222' : '#c4c4c4'}}
			                  label="Video"
			                  value={2}
			                />*/}
						</Tabs>

						<Line />

						{utils.isMobile() &&
							<SwipeableViews
								index={selectTab}
								onChangeIndex={this.handleChangeTab}
								className="hidden-des">
								{/*<div className='story'>
								{feed && utils.isMobile() && feed.map((story, index) => (
									<ArticleBox detail={story} key={index}/>
								))}
							</div>*/}
								<InfiniteScroll
									loadMore={this.loadFeed()}
									hasMore={hasMoreFeed}
									loader={this.onload()}>
									<div>
										{feed.length != 0 &&
											feed.map((item, index) => (
												<ArticleBox detail={item} key={index} />
											))}
									</div>
								</InfiniteScroll>

								<div className="news">
									<TopNewsHome />
								</div>

								{/*<div className='video'>

							</div>*/}
							</SwipeableViews>}
					</Main>
					{/*<Aside>
						<StaffPickSideBar></StaffPickSideBar>
					</Aside>*/}
				</Content>

				<BackToTop scrollStepInPx="200" delayInMs="16.66" showOnTop="1800" />
				<Footer />
			</Wrapper>
		)
	}
}

export default HomePage
