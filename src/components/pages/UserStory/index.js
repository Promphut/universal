import React from 'react'
import PropTypes from 'prop-types'
import {
	TopBarWithNavigation,
	ArticleBox,
	BGImg,
	StoryMenu,
	Footer,
	BackToTop,
	Pagination,
	UserSocialBar,
} from 'components'
import { findDOMNode as dom } from 'react-dom'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
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
import auth from '../../../services/auth'

const Wrapper = styled.div `
	display: flex;
	flex-direction: column;
`

const Onload = styled.div`
	width:100%;
	height:70px;
	margin:50px 0 50px 0;
`

const NoArticleHeader = styled.h2 `
	font-family: 'Mitr';
	font-size: 16px;
	color: #222222;
	font-weight: normal;
	margin: auto;

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

const UserAvatarContainer = styled.div `
	text-align: center;
	margin-bottom: 0;
`

const UserInfoContainer = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding-top: 56px;
	margin-top: 0px;
	margin-bottom: 0px;
`

const UserInfoPrimaryText = styled.h1 `
	margin-top: 16px;
	margin-bottom: 0px;
	color: white;
	font-weight: bold;
	font-size: 18px;
	font-family: 'Roboto';
`

const UserInfoSecondaryText = styled.h2 `
	color: white;
	font-weight: lighter;
	font-size: 14px;
	font-family: PT Sans;
	margin-top: 11px;
	margin-bottom: 0;
`

const EditorProfilePictureSection = styled.div `
	background-image: url(${props => props.userProfileImage});
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100%;
	height: 250px;
	width: 100%;
`

const UserProfileSection = EditorProfilePictureSection.extend `
	background-color: ${props => props.theme.primaryColor};
	height: auto;
	padding-bottom: 20px;
`

const UserInfoSection = styled.div `
	width: 100%;
	background-color: ${props => props.role === 'admin' ? '#fafafa' : 'white' };
	padding-bottom: 24px;
`

const SeeMoreDescriptionSection = UserInfoSection.extend `
	height: 100%;
	padding-top: 0;
	padding-bottom: 10px;
	display:flex;
	justify-content: center;
	align-content: center;
`

const ArticleSection = styled.div `
	background-color: white;
	padding: 16px 16px 16px 16px;
`

const TopBarContainer = styled.div `
	position: relative;
	top:8px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%
`

const TopBarItem = styled.div `
	flex: 0;
`

const TopBarLeftItem = TopBarItem.extend `
	align-self: flex-start;
	margin-left: 8px;
	font-size: 16px;
`

const TopBarRightItem = TopBarItem.extend `
	align-self: flex-end;
	margin-right: 8px;
	font-size: 20px;
`

const Card = styled.div `
	width: 90%;
	z-index: 3;
	margin: -16px auto 0 auto;
	padding: 20px 16px 24px 16px;
	box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	background: #FFFFFF;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const CardTitle = styled.h1 `
	font-family: Roboto;
	font-weight: bold;
	font-size: 18px;
	color: #000000;
	margin: 0;
`

const CardSubtitle = styled.h2 `
	font-family: Roboto;
	font-weight: normal;
	font-size: 14px;
	color: #8E8E8E;
	margin-top: 11px;
	margin-bottom: 0px;
	text-align: center;
`

const Dash = styled.div`
  margin-top: ${props => props.MarginTop};
  width:30px;
  height:4px;
  background-color:${props=>props.theme.accentColor};
`

const SocialButtonContainer = styled.div `
	margin-top: 20px;
	margin-bottom: 0px;
`

const ProfileDescription = styled.p `
	width: 90%;
	margin: 20px auto 0 auto;
	text-align: center;
	color: #222222;
	font-weight: lighter;
	font-family: 'CS PraJad';
	font-size: 16px;
	height: ${props => props.showDescription? 'auto' : '30%'};
	display: block;
`

const Blur = styled.div`
	display: ${props => props.showDescription ? 'none' : 'flex'};
	justify-content: center;
	background: rgba(255,255,255,0);
	background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(250,250,250,1) 95%, rgba(250,250,250,1) 100%);
	background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(250,250,250,0)), color-stop(95%, rgba(250,250,250,1)), color-stop(100%, rgba(255,255,255,1)));
	background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(250,250,250,1) 95%, rgba(250,250,250,1) 100%);
	background: -o-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(250,250,250,1) 95%, rgba(250,250,250,1) 100%);
	background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(250,250,250,1) 95%, rgba(250,250,250,1) 100%);
	background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(250,250,250,1) 95%, rgba(250,250,250,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ffffff', GradientType=0 );
	position:relative;
	width:100%;
	min-height:170px;
	opacity: ${props => props.showDescription ? 0 : 1};
	margin-top:-280px;
	@media (min-width: 768px) and (max-width: 992px) {
		margin-top:-70px;
		height:70px;
  }
`

const ProfileDescriptionSeeMore = styled.button `
	font-family: Mitr;
	border: 0.5px solid #C4C4C4;
	background-color: #fafafa;
	border-radius: 100px;
	font-size: 12px;
	z-index: 10;
	padding: 2px 32px 2px 32px;
	margin-top:10px;
	align-self: flex-end;
`

const ArticleHeader = styled.div `
	margin: 0 auto 6px auto;
	color: #222222;
	font-weight: bold;
	font-size: 18px;
`

const ArticleCount = styled.span `
	color: #222222;
	font-size: 25px;
`

const ArticleWrapper = styled.div `
`

const Page = styled.div`
	display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding:20px 0 0 0;
`

const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 0px 0 20px 0;
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



export default class UserStory extends React.Component {

	FEED_LIMIT = utils.isMobile() ? config.FEED_LIMIT_MOBILE*2 : config.FEED_LIMIT;

	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {
			user: null,
			isMobile: false,

			currentPage: utils.querystring('page',this.props.location) ? utils.querystring('page',this.props.location) - 1 : 0,
			feedCount: 0,
			feed: [],
			totalPages: 0,
			isEmpty: false,

			loading: false,

			showDescription: false,
		}
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
		if (this.state.user._id == null) return
		// ensure this method is called only once at a time
		if (this.state.loading === true) return
		
		this.state.loading = true

		let currentPage = this.state.currentPage
		let uid = this.state.user._id

		api.getFeed('story', { writer: uid, status: 1 }, 'latest', null, currentPage, this.FEED_LIMIT)
			.then(result => {
				this.setState(
					{
						feed: result.feed,
						feedCount: result.count['1'] ? result.count['1'] : 0,
						totalPages: result.count['1'] ? utils.getTotalPages(this.FEED_LIMIT, result.count['1']) : 0,
						isEmpty: result.count['total']==0 || (!result.count['1'])
					},
					() => {
						this.setState({loading : false})
					}
				)
			})
	}

	getUserFromUsername = (username, done = () => {}) => {
		if (!username) utils.notFound(this.props.history)

		api.getUserFromUsername(username)
			.then(user => {
				this.setState({ user: user}, done)
			})
			.catch(err => {
				utils.notFound(this.props.history, err)
			})
	}

	getUserFromUid = (uid, done = () => {}) => {
		if (uid == null) utils.notFound(this.props.history)

		api.getUserFromUserId(uid)
			.then(user => {
				this.setState({ user: user}, done)
			})
			.catch(err => {
				utils.notFound(this.props.history, err)
			})
	}

	changePage = e => {
		this.props.history.push({ search: "?page=" + e })
	}

	checkBack = e => {
		e.preventDefault()

		if (window.history.length <= 2) {
			this.props.history.push('/')
		} else {
			this.props.history.goBack()
		}
	}

	showFullDescription = () => {
		this.setState({
			showDescription: true
		})
	}

	componentDidMount() {
		let username, uid
		if ((username = this.props.match.params.username)) {
			this.getUserFromUsername(username, this.loadFeed)
		} else if ((uid = this.props.match.params.uid)) {
			this.getUserFromUid(uid, this.loadFeed)
		}

		this.setState({
			isMobile: utils.isMobile()
		})

		let token = utils.querystring('token', this.props.location) || auth.getToken()

		api.getCookieAndToken(token)
		.then(result => {
			this.setState({
				loggedUser : result.user,
				roles : result.roles,
			})
		})
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.username != this.props.match.params.username) {
			this.setState({
				currentPage : utils.querystring('page',nextProps.location) ? utils.querystring('page',nextProps.location) - 1 : 0,
				feed : [],
			},()=>{
				this.getUserFromUsername(nextProps.match.params.username, this.loadFeed)
			})
		} else if (nextProps.match.params.uid != this.props.match.params.uid) {
			this.setState({
				currentPage : utils.querystring('page',nextProps.location) ? utils.querystring('page',nextProps.location) - 1 : 0,
				feed : [],
			},()=>{
				this.getUserFromUid(nextProps.match.params.uid, this.loadFeed)
			})
		} else if(nextProps.location.search != this.props.location.search){
			this.setState({
				currentPage : utils.querystring('page',nextProps.location) ? utils.querystring('page',nextProps.location) - 1 : 0,
				feed : [],
			},()=>{
				document.body.scrollTop = document.documentElement.scrollTop = 0
				this.loadFeed()
			})
		}
	}

	render () {
		if (!isEmpty(this.state.user)) {
			let { theme } = this.context.setting.publisher
			let { user, isMobile, feedCount, feed, currentPage, totalPages, loading, showDescription, isEmpty } = this.state
			let FeedPack = currentPage < 0 ? "" : "Loading"

			if (feed && currentPage >= 0) {
				FeedPack = []
				feed.map((item, index) => (
					FeedPack.push(<ArticleBox final={index == feed.length -1 ? true:false} detail={item} key={index}/>)
				))
			}

			return (
				<Wrapper>
					{!utils.isMobile() && <TopBarWithNavigation className="hidden-mob" />}
					{auth.hasRoles(['ADMIN', 'EDITOR']) ?
						// Admin
						<EditorProfilePictureSection userProfileImage = {user.pic.medium}>
							<TopBarContainer>

								<TopBarLeftItem>
									<FontIcon onClick={this.checkBack} style = {{color:'white', textShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}} className="material-icons hidden-des">
										chevron_left
									</FontIcon>
								</TopBarLeftItem>

								<TopBarRightItem>
									<Link to = "/me/settings">
										<FontIcon style = {{color:'white', textShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}} className="material-icons hidden-des">
											border_color
										</FontIcon>
									</Link>
								</TopBarRightItem>

							</TopBarContainer>
						</EditorProfilePictureSection>

					:
						// Registered User
						<UserProfileSection>
							<TopBarContainer>

								<TopBarLeftItem>
									<FontIcon onClick={this.checkBack} style = {{color:'white', textShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}} className="material-icons hidden-des">
										chevron_left
									</FontIcon>
								</TopBarLeftItem>

								<TopBarRightItem>
									<Link to ="/me/settings">
										<FontIcon style = {{color:'white', textShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'}} className="material-icons hidden-des">
											border_color
										</FontIcon>
									</Link>
								</TopBarRightItem>

							</TopBarContainer>

							<UserInfoContainer>

								<UserAvatarContainer>
									<UserAvatar src={user.pic.medium} size={95} />
								</UserAvatarContainer>

								<UserInfoPrimaryText>{user.display}</UserInfoPrimaryText>
								<UserInfoSecondaryText>{user.intro}</UserInfoSecondaryText>

								<SocialButtonContainer>
									<UserSocialBar colorPack={"light"} channels={{}}/>
								</SocialButtonContainer>

							</UserInfoContainer>
						</UserProfileSection>
					}

					<UserInfoSection role={auth.hasRoles(['ADMIN', 'EDITOR'])? 'admin' : 'user'}>
						{auth.hasRoles(['ADMIN', 'EDITOR']) &&
							<Card>
								<CardTitle>{user.display}</CardTitle>
								<CardSubtitle>{user.intro}</CardSubtitle>

								<Dash MarginTop="16px"/>

								<SocialButtonContainer>
									<UserSocialBar ColorPack="dark" channels={{}}/>
								</SocialButtonContainer>

							</Card>
						}

						<ProfileDescription showDescription={showDescription}>
							{/* <Blur showDescription={showDescription}/> */}
							{user.shortDesc}
						</ProfileDescription>


					</UserInfoSection>

					{/* {!showDescription &&
						<SeeMoreDescriptionSection showDescription={showDescription}>
							<ProfileDescriptionSeeMore onClick={this.showFullDescription}>อ่านต่อ</ProfileDescriptionSeeMore>
						</SeeMoreDescriptionSection>
					} */}

					{auth.hasRoles(['ADMIN', 'EDITOR']) &&
						<ArticleSection>

							<ArticleHeader>
								<ArticleCount>{feedCount} </ArticleCount>
								{feedCount > 1 ? 'STORIES' : 'STORY'}
							</ArticleHeader>

							<Dash MarginTop="6px"/>

						</ArticleSection>
					}

					{auth.hasRoles(['ADMIN', 'EDITOR']) &&
						<ArticleWrapper>
							<Content>
								<Main>
									{loading ? this.onload() :
										<div>
											{FeedPack}
											{ (isEmpty) &&
												<NoArticleHeader>ยังไม่มีบทความ</NoArticleHeader>
											}
											{(!isEmpty && !(totalPages > currentPage && currentPage >= 0)) &&
												<NoArticleHeader>ไม่มีข้อมูลในหน้านี้ กลับไปยัง
													<Link
														to={user.url+"?page=1"}
														style={{
															color: theme.accentColor,
															padding: '0 0.5em 0 0.5em'
														}}>
														หน้าแรก
													</Link>
												</NoArticleHeader>
											}
											<Page>
												{ (totalPages > currentPage && currentPage >= 0) &&
													<Pagination
														hideFirstAndLastPageLinks={utils.isMobile() ? false : true}
														hidePreviousAndNextPageLinks={utils.isMobile() ? true : false}
														boundaryPagesRange={utils.isMobile() ? 0 : 1}
														currentPage={currentPage + 1}
														totalPages={totalPages}
														onChange={this.changePage}
													/>
												}
											</Page>
										</div>
									}
								</Main>
							</Content>
						</ArticleWrapper>
					}
					<Footer/>
				</Wrapper>
			)
		}
		else {
			return (<Wrapper></Wrapper>)
		}
	}
}
