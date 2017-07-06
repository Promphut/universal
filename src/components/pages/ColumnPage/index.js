import React from 'react'
import PropTypes from 'prop-types'
import {
	TopBarWithNavigation,
	ArticleBox,
	ArticleBoxLarge,
	TrendingSideBar,
	BGImg,
	StoryMenu,
	Stick,
	Footer,
	EmptyStory,
	BackToTop
} from 'components'
import { findDOMNode as dom } from 'react-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import api from 'components/api'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import CircularProgress from 'material-ui/CircularProgress'
import utils from '../../../services/utils'
import config from '../../../config'

const Wrapper = styled.div`
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding:110px 0 20px 0;
	min-height: calc(100vh - ${props => (props.isMobile ? '321px' : '501px')});
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

const Head = styled.div`
	 position:relative;
	 width:100%;
	 height:100%;
	 top:0px;
	 left:0px;
	 display: flex;
	 justify-content:center;
	 padding:0 20% 0 20%;
	 flex-direction:column;
	@media (max-width: 768px) {
		padding:0 5% 0 5%;
  }

	@media (max-width: 480px) {
		padding:0 5% 0 5%;
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
	flex: 3 325px;
	position:relative;
	max-width: 325px;
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

const ColumnName = styled.div`
  color:#fff;
  font-size:48px;
  font-weight:bold;
	display:inline;
	@media (max-width:480px) {
		padding-top:13px;
  	font-size: 16px;
  }
`

const ColumnDetail = styled.div`
	color:#fff;
  font-size:16px;
	font-family:'Mitr';
	margin-top:15px;
	font-weight:normal;
	@media (max-width:480px) {
  	font-size: 12px;
		margin-top: 8px;
  }
`
const Cover = styled(BGImg)`
	 width: 100%;
	 height: 340px;
	 position:relative;
	 top:60px;
	 display: flex;
	 align-items:center;
	 @media (max-width:480px) {
			height: 160px;
	 }
`

const Icon = styled.img`
	width:72px;
	height:72px;
	display:inline;
	margin:10px 30px 0 0;
	@media (max-width:480px) {
  	width:30px;
		height:30px;
		margin:0 10px 0 0;
  }
`

const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`

class ColumnPage extends React.Component {
	state = {
		column: {
			cover: {}
		},
		isMobile: false,

		page: 0,
		feedCount: 1,
		feed: [],
		hasMoreFeed: true
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)
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
				feedCount: 1,
				feed: [],
				hasMoreFeed: true
			},
			() => {
				this.loadFeed(this.state.column._id)()
			}
		)
	}
	loadFeed = colId => {
		return () => {
			//console.log('LOAD FEED0', colId, this.loading)
			if (colId == null) return
			// ensure this method is called only once at a time
			if (this.loading === true) return
			this.loading = true
			//console.log('LOAD FEED1')

			let page = this.state.page
			//console.log('page', page)

			api
				.getFeed(
					'article',
					{ status: 1, column: colId },
					'latest',
					null,
					page,
					15
				)
				.then(result => {
					//console.log(result)
					let feed = this.state.feed.concat(result.feed)
					this.setState(
						{
							page: ++page,
							feed: feed,
							feedCount: result.count['1']
								? result.count['1']
								: 0 ? result.count['1'] : 0,
							hasMoreFeed: feed.length < result.count['1']
						},
						() => {
							this.loading = false
						}
					)
				})
		}
	}

	getColumnFromSlug = (columnSlug, done = () => {}) => {
		if (!columnSlug) utils.notFound(this.props.history)

		api
			.getColumnFromSlug(columnSlug)
			.then(col => {
				this.setState({ column: col }, done)
			})
			.catch(err => {
				utils.toError(this.props.history, err)
			})
	}

	componentWillMount() {
		this.getColumnFromSlug(this.props.match.params.columnSlug)
	}

	componentDidMount() {
		//this.handleInfiniteLoad()
		this.setState({
			isMobile: utils.isMobile()
		})
	}

	componentWillReceiveProps(nextProps) {
		//console.log('COL', nextProps, this.props)
		if (
			nextProps.match.params.columnSlug != this.props.match.params.columnSlug
		) {
			//console.log('RELOAD FEED')
			this.getColumnFromSlug(nextProps.match.params.columnSlug, this.reloadFeed)
			//this.reloadFeed()
		}
	}

	render() {
		let { keywords, channels, theme } = this.context.setting.publisher
		const BGImgSize = (utils.isMobile() ? 100 : 280) + 60
		let { column, isMobile } = this.state
		let { feedCount, feed, hasMoreFeed } = this.state
		//let {count, loadOffset, isInfiniteLoading, latestStories, isMobile} = this.state
		//console.log(feedCount)
		var head = (
			<Head>
				<div className="row">
					{column.icon != config.BACKURL + '/imgs/brand_display.png' &&
						<Icon src={column.icon} />}
					<ColumnName className="sans-font">{column.name}</ColumnName>
				</div>
				<ColumnDetail>{column.shortDesc}</ColumnDetail>
			</Head>
		)
		return (
			<Wrapper>
				<Helmet>
					<title>{column.name}</title>
					<meta name="title" content={column.name} />
					<meta name="keywords" content={keywords} />
					<meta name="description" content={column.shortDesc} />
				</Helmet>
				<div style={{}}>
					<TopBarWithNavigation
						 
						onLoading={this.props.onLoading}
					/>
				</div>

				<Cover
					style={{ display: 'flex', alignItems: 'center' }}
					src={
						column.cover.medium != config.BACKURL + '/imgs/column_cover.png'
							? column.cover.medium
							: null
					}
					alt={column.name}>
					{head}
				</Cover>

				<Content isMobile={isMobile}>
					{feedCount <= 0
						? <Main>
								<StoryMenu
									style={{ padding: '15px 0 15px 0', margin: '0 0 50px 0' }}
									next={column.name}
								/>
								<EmptyStory
									title="No Story, yet"
									description={
										<div>
											There are no stories in this column right now. Wanna back to see
											<Link
												to="/stories/columns"
												style={{
													color: theme.accentColor,
													padding: '0 0.5em 0 0.5em'
												}}>
												other columns
											</Link>
											?
										</div>
									}
								/>
							</Main>
						: <Main>
								<StoryMenu
									style={{ padding: '15px 0 15px 0', margin: '0 0 50px 0' }}
									next={column.name}
								/>
								<TextLine className="sans-font">Latest</TextLine>
								<InfiniteScroll
									loadMore={this.loadFeed(column._id)}
									hasMore={hasMoreFeed}
									loader={this.onload()}>
									<div>
										{feed &&
											feed.map((item, index) => (
												<ArticleBox detail={item} key={index} />
											))}
									</div>
								</InfiniteScroll>
							</Main>}
					<Aside>
						<Stick topOffset={70} style={{ zIndex: '0' }}>
							<TrendingSideBar />
						</Stick>
					</Aside>
				</Content>

				<BackToTop scrollStepInPx="200" delayInMs="16.66" showOnTop="600" />
				<Footer />
			</Wrapper>
		)
	}
}

export default ColumnPage
