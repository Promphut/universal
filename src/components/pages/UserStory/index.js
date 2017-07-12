import React from 'react'
import PropTypes from 'prop-types'
import {
	TopBarWithNavigation,
	ArticleBox,
	ArticleBoxLarge,
	TrendingSideBar,
	BGImg,
	StoryMenu,
	EmptyStory,
	Footer,
	BackToTop,
	Pagination
} from 'components'
import { findDOMNode as dom } from 'react-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import Avatar from 'material-ui/Avatar'
import api from '../../../services/api'
import InfiniteScroll from 'react-infinite-scroller'
import CircularProgress from 'material-ui/CircularProgress'
import { Helmet } from 'react-helmet'
import utils from '../../../services/utils'
import config from '../../../config'

const Wrapper = styled.div`

`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 25px 0 20px 0;
	min-height: calc(100vh - 421px);
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

const User = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 80px 0px 15px 0px;

	@media (max-width: 480px) {
		background: -moz-linear-gradient(-45deg,  ${props => props.theme.primaryColor} 0%, ${props => props.theme.secondaryColor} 100%); /* FF3.6-15 */
		background: -webkit-linear-gradient(-45deg,  ${props => props.theme.primaryColor} 0%, ${props => props.theme.secondaryColor} 100%); /* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(135deg,  ${props => props.theme.primaryColor} 0%, ${props => props.theme.secondaryColor} 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\#bf00b2b4\, endColorstr=\#bfcef1b7\,GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

		padding-top: 60px;
		padding: 60px 0px 0px 0px;
	}
`

const UserAvatar = styled(Avatar)`
	margin-right: 20px;
	float: left;

	@media (max-width: 480px) {
		height: 80px !important;
		width: 80px !important;
		float: none;
		border: 2px solid #FFF;
		margin-right: 0px;
	}
`

const UserData = styled.div`
	float: left;

	@media (max-width: 480px) {
		float: none;
	}
`

const UserName = styled.div`
  color:#000;
  font-size:26px;
  font-weight:bold;

	@media (max-width: 480px) {
		display: flex;
		justify-content: center;
	  	color: #FFF;
		margin: 10px 0px;
		font-weight: normal;
	}
`

const UserDesc = styled.div`
  color: #8F8F8F;
  margin: 10px 10px 0px;
  font-size: 16px;
  width: 220px;

	@media (max-width: 480px) {
		display: flex;
		justify-content: center;
		width: auto;
	  	color: #C2C2C2;
		textAlign: center;
	}
`

const UserShare = styled.div`
	float: right;
	width: 250px;
	margin-top: 10px;

	@media (max-width: 480px) {
		display: none;
	}
`

const UserShareMobile = styled.div`
	overflow:'hidden';
	display: none;

	@media (max-width: 480px) {
		display: flex;
		justify-content: center;
		margin-top: 20px;
	}
`

const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`

const A = styled.a`
	margin: 0 20px;
	textAlign: center;
	color: #c2c2c2;
	cursor: pointer;
`

const LinkMobile = styled.a`
	display: flex;
	justify-content: center;
	color: #C2C2C2;
	cursor: pointer;
	width: 50px;
	font-size: 20px;
`

const Page = styled.div`
    display: flex;
        flex-flow: row wrap;
        justify-content: center;
    padding:20px 0 0 0;
`

const UserDetail = ({ style, user, checkBack }) => {
	const backStyle = {
		color: '#FFF',
		fontSize: '40px',
		position: 'absolute',
		top: '10px',
		left: '5px'
	}

	const rowStyle = {
		...style,
		margin: '50px 0 20px 0',
		display: 'block',
		overflow: 'hidden',
		maxWidth: '730px',
		flex: '8 730px'
	}
	//console.log('user', user)
	return (
		<User>
			<div className="row" style={rowStyle}>
				<a href="#" onClick={checkBack}>
					<FontIcon className="material-icons hidden-des" style={backStyle}>
						chevron_left
					</FontIcon>
				</a>
				<div style={{ textAlign: 'center' }}>
					<UserAvatar src={user.pic.medium} size={95} />
				</div>
				<UserData>
					<UserName className="serif-font">{user.display}</UserName>
					<UserDesc className="sans-font">{user.intro}</UserDesc>
				</UserData>

				{user.channels && 
					<UserShare>
						{/*<div className='row' style={{overflow:'hidden', textAlign: 'right'}}>*/}
						<div style={{ textAlign: 'right' }}>
							{user.channels.fb &&
								<A href={utils.getFbUrl(user.channels.fb)} target="_blank">
									<i className="fa fa-facebook" aria-hidden="true" />
								</A>}
							{user.channels.twt &&
								<A href={utils.getTwtUrl(user.channels.twt)} target="_blank">
									<i className="fa fa-twitter" aria-hidden="true" />
								</A>}
							{user.channels.yt &&
								<A href={utils.getYtUrl(user.channels.yt)} target="_blank">
									<i className="fa fa-youtube-play" aria-hidden="true" />
								</A>}
							{user.channels.ig &&
								<A href={utils.getIgUrl(user.channels.ig)} target="_blank">
									<i className="fa fa-instagram" aria-hidden="true" />
								</A>}
						</div>
					</UserShare> 
				}
				{user.channels && 
					<UserShareMobile className="row">
						{user.channels.fb &&
							<LinkMobile
								href={utils.getFbUrl(user.channels.fb)}
								target="_blank">
								<i className="fa fa-facebook" aria-hidden="true" />
							</LinkMobile>}
						{user.channels.twt &&
							<LinkMobile
								href={utils.getTwtUrl(user.channels.twt)}
								target="_blank">
								<i className="fa fa-twitter" aria-hidden="true" />
							</LinkMobile>}
						{user.channels.yt &&
							<LinkMobile
								href={utils.getYtUrl(user.channels.yt)}
								target="_blank">
								<i className="fa fa-youtube-play" aria-hidden="true" />
							</LinkMobile>}
						{user.channels.ig &&
							<LinkMobile
								href={utils.getIgUrl(user.channels.ig)}
								target="_blank">
								<i className="fa fa-instagram" aria-hidden="true" />
							</LinkMobile>}
					</UserShareMobile>
					}
			</div>
		</User>
	)
}

class UserStory extends React.Component {
	state = {
		//feed:[],
		//feedCount: 0,
		//latestStories:[],
		//page:0,
		//isInfiniteLoading: true,
		//loadOffset:300,
		//feedCount:0,
		user: {
			channels: {},
			pic: {}
		},
		isMobile: false,

		currentPage: utils.querystring('page',this.props.location) ? utils.querystring('page',this.props.location) - 1 : 0,
		feedCount: 1,
		feed: [],
		totalPages: 0,

		loading: false,
	}

	FEED_LIMIT = utils.isMobile() ? config.FEED_LIMIT_MOBILE*2 : config.FEED_LIMIT;

	static contextTypes = {
		setting: PropTypes.object
	}

	checkBack = e => {
		e.preventDefault()
		this.props.history.goBack()
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
				this.loadFeed(this.state.user._id)()
			}
		)
	}

	loadFeed = uid => {
		return () => {
			if (uid == null) return
			// ensure this method is called only once at a time
			if (this.state.loading === true) return
			this.state.loading = true

			let currentPage = this.state.currentPage
			//console.log('page', page)
			//console.log('UID', uid)
			api
				.getFeed('story', { writer: uid, status: 1 }, 'latest', null, currentPage, this.FEED_LIMIT)
				.then(result => {
					let feed = this.state.feed.concat(result.feed)
					this.setState(
						{
							feed: feed,
							feedCount: result.count['total'] ? result.count['total'] : 0,
							totalPages: utils.getTotalPages(this.FEED_LIMIT, result.count['total']),
						},
						() => {
							this.setState({loading : false})
						}
					)
				})
		}
	}

	changePage = e => {
		this.props.history.push({ search: "?page=" + e })
		this.setState({ currentPage: e - 1}, () => {
			document.body.scrollTop = document.documentElement.scrollTop = 0
			this.reloadFeed()
		})
	}

	getUserFromUsername = (username, done = () => {}) => {
		//console.log('PROP', this.props)
		if (!username) utils.notFound(this.props.history)

		api
			.getUserFromUsername(username)
			.then(user => {
				this.setState({ user: user }, done)
			})
			.catch(err => {
				utils.notFound(this.props.history, err)
			})
	}

	getUserFromUid = (uid, done = () => {}) => {
		//console.log('PROP', this.props)
		if (uid == null) utils.notFound(this.props.history)

		api
			.getUserFromUserId(uid)
			.then(user => {
				this.setState({ user: user }, done)
			})
			.catch(err => {
				utils.notFound(this.props.history, err)
			})
	}

	componentDidMount() {
		let username, uid
		if ((username = this.props.match.params.username)) {
			this.getUserFromUsername(username, this.reloadFeed)
		} else if ((uid = this.props.match.params.uid)) {
			this.getUserFromUid(uid, this.reloadFeed)
		}

		this.setState({
			isMobile: utils.isMobile()
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.username != this.props.match.params.username) {
			this.getUserFromUsername(nextProps.match.params.username, this.reloadFeed)
			//this.reloadFeed()
		} else if (nextProps.match.params.uid != this.props.match.params.uid) {
			this.getUserFromUid(nextProps.match.params.uid, this.reloadFeed)
			//this.reloadFeed()
		} else if(nextProps.location.search != this.props.location.search){
			this.setState({currentPage : utils.querystring('page',this.props.location) - 1},()=>{
				document.body.scrollTop = document.documentElement.scrollTop = 0
				this.reloadFeed()
			})
		}
	}

	render() {
		let { theme } = this.context.setting.publisher
		let { user, isMobile, feedCount, feed, currentPage, totalPages, loading } = this.state
		return (
			<Wrapper>
				<Helmet>
					<title>{user.display}</title>
					<meta name="title" content={user.display} />
					<meta name="description" content={user.shortDesc} />
				</Helmet>

				<TopBarWithNavigation
					className="hidden-mob"
					 
				/>
				<UserDetail user={user} checkBack={this.checkBack} />

				<Content>
					{feedCount <= 0
						? <Main>
								<TextLine className="sans-font">
									<strong
										style={{ color: theme.primaryColor, marginRight: '30px' }}>
										<span style={{ fontSize: '30px' }}>
											{feedCount >= 0 ? feedCount : 0}
										</span>
										{' '}
										stories
									</strong>
									{/*<span style={{fontSize:'30px'}}>101</span> Upvotes*/}
								</TextLine>
								<EmptyStory
									title="Start your first story!"
									description="You haven’t write any stories right now."
								/>
							</Main>
						: <Main>

								<TextLine className="sans-font">
									<strong
										style={{ color: theme.primaryColor, marginRight: '30px' }}>
										<span style={{ fontSize: '30px' }}>
											{feedCount >= 0 ? feedCount : 0}
										</span>
										{' '}
										stories
									</strong>
									{/*<span style={{fontSize:'30px'}}>101</span> Upvotes*/}
								</TextLine>

								{loading ?  this.onload() : 
									<div>
										{feed && currentPage >= 0 &&
											feed.map((item, index) => (
												<ArticleBox final={index == feed.length -1 ? true:false} detail={item} key={index} />
											))}
									</div> 
								}

								<Page>
									{totalPages > 0 && ((totalPages > currentPage && currentPage >= 0) ?
										<Pagination
											hideFirstAndLastPageLinks={utils.isMobile() ? false : true}
											hidePreviousAndNextPageLinks={utils.isMobile() ? true : false}
											boundaryPagesRange={utils.isMobile() ? 0 : 1}
											currentPage={currentPage + 1}
											totalPages={totalPages}
											onChange={this.changePage}
										/>
										:
										<EmptyStory
											title="No More Story"
											description={
												<div>
													There are no more stories in this page. Go back to
													<Link
														to={user.url+"?page=1"}
														style={{
															color: theme.accentColor,
															padding: '0 0.5em 0 0.5em'
														}}>
														first page
													</Link>
													?
												</div>
											}
											hideButton={true}
										/>)
									}
								</Page>
							</Main>}
				</Content>
				<BackToTop scrollStepInPx="200" delayInMs="16.66" showOnTop="600" />
				<Footer />
			</Wrapper>
		)
	}
}

export default UserStory
