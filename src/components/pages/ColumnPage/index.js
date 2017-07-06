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
	BackToTop,
	Pagination
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

const Page = styled.div`
  display: flex;
	flex-flow: row wrap;
	justify-content: center;
  padding:30px 0 30px 0;
`

class ColumnPage extends React.Component {
	state = {
		column: {
			cover: {}
		},
		isMobile: false,

		currentPage: utils.querystring('page',this.props.location) ? utils.querystring('page',this.props.location) - 1 : 0,
		feedCount: 1,
		feed: [],
		totalPages: 0,

		loading: false
	}

	FEED_LIMIT = config.FEED_LIMIT

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
				currentPage: utils.querystring('page',this.props.location) ? utils.querystring('page',this.props.location) - 1 : 0,
				feedCount: 1,
				feed: [],
				totalPages: 0,
			},
			() => {
				this.loadFeed(this.state.column._id)()
			}
		)
	}

	loadFeed = colId => {
		return () => {
			if (colId == null) return
			// ensure this method is called only once at a time
			if (this.state.loading === true) return
			this.state.loading = true
			//console.log('LOAD FEED1')

			let currentPage = this.state.currentPage
			//console.log('page', page)

			api
				.getFeed(
					'article',
					{ status: 1, column: colId },
					'latest',
					null,
					currentPage,
					this.FEED_LIMIT
				)
				.then(result => {
					//console.log(result)
					//let feed = this.state.feed.concat(result.feed)
					this.setState(
						{
							feed: result.feed,
							feedCount: result.count['total'] ? result.count['total'] : 0,
							totalPages: utils.getTotalPages(this.FEED_LIMIT, result.count['total']),
						},
						() => {
							this.setState({loading:false})
						}
					)
				})
		}
	}

	changePage = e => {
		this.props.history.push({ hash: this.props.location.hash ,search: "?page=" + e })
		this.setState({ currentPage: e - 1}, () => {
			document.body.scrollTop = document.documentElement.scrollTop = 400
			this.reloadFeed()
		})
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
		this.getColumnFromSlug(this.props.match.params.columnSlug, this.reloadFeed)
	}

	componentDidMount() {
		//this.handleInfiniteLoad()
		this.setState({
			isMobile: utils.isMobile()
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.columnSlug != this.props.match.params.columnSlug) {
			this.getColumnFromSlug(nextProps.match.params.columnSlug, this.reloadFeed)
			//this.reloadFeed()
		} else if(nextProps.location.search != this.props.location.search){
			this.setState({currentPage : utils.querystring('page',this.props.location)},()=>{
				document.body.scrollTop = document.documentElement.scrollTop = 0
				this.reloadFeed()
			})
		}
	}

	render() {
		let { keywords, channels, theme } = this.context.setting.publisher
		const BGImgSize = (utils.isMobile() ? 100 : 280) + 60
		let { column, isMobile, feedCount, feed, currentPage, totalPages, loading } = this.state
		//let {count, loadOffset, isInfiniteLoading, latestStories, isMobile} = this.state
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
								{totalPages > 0 && totalPages > currentPage && currentPage >= 0
									&& <TextLine className="sans-font">Latest</TextLine>
								}
								{loading ?  this.onload() : 
									<div>
										{feed && currentPage >= 0 &&
											feed.map((item, index) => (
												<ArticleBox detail={item} key={index} />
											))}
									</div> 
								}
								<Page>
									{totalPages > 0 && ((totalPages > currentPage && currentPage >= 0) ?
										<Pagination
											currentPage={currentPage + 1}
											totalPages={totalPages}
											onChange={this.changePage}/>
										:
										<EmptyStory
											title="No More Story"
											description={
												<div>
													There are no more stories in this page. Go back to
													<Link
														to={"/stories/" + this.state.column.slug + "?page=1"+this.props.location.hash}
														style={{
															color: theme.accentColor,
															padding: '0 0.5em 0 0.5em'
														}}>
														first page
													</Link>of this column
													?
												</div>
											}
											hideButton={true}
										/>)
									}
								</Page>
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
