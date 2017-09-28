import React from 'react'
import PropTypes from 'prop-types'
import { TopBarWithNavigation, StoryDetail, BGImg } from '../../../components'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import api from '../../../services/api'
import config from '../../../config'
import utils from '../../../services/utils'
import auth from '../../../services/auth'
import isEmpty from 'lodash/isEmpty'
import 'froala-editor/css/froala_style.min.css'

const Wrapper = styled.div`

`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding-top: ${props => props.paddingTop}
`
const Share = styled.div`
	flex: 1 120px;
	position:relative;
	max-width: 120px;
	margin:150px 0 0 0;
	@media (max-width: 850px) {
		display:none;
	}
`
const LikeBoxContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto 24px auto;
`
const Main = styled.div`
	flex: 8 730px;
	max-width: 730px;
	margin-top: 40px;
	min-height: calc(100vh - ${props => (props.isMobile ? '261px' : '261px')});
	@media (max-width: 480px) {
		margin-top: 10px;
		flex:0 100%;
		max-width: 100%;
		padding:0 15px 0 15px;
	}
`
const Aside = styled.div`
	flex: 3 385px;
	position:relative;
	max-width: 385px;
	padding:0 0 0 60px;
	margin:60px 0 0 0;
	@media (max-width: 1280px) {
		display:none;
	}
`
const BG = styled(BGImg)`
	width: 100%;
	height: 85vh;
	background-position-y: bottom;
	@media (min-width: 768px) and (max-width: 992px) {
		height: 384px;
  }
`
const Cover = styled.div`
	position:relative;
	top:0;
	left:0;
	width:100%;
	height:100%;
	background: rgba(34,34,34,0.64);
	background: -moz-linear-gradient(top, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
	background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(34,34,34,0.64)), color-stop(0%, rgba(0,0,0,0.64)), color-stop(20%, rgba(0,0,0,0)));
	background: -webkit-linear-gradient(top, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
	background: -o-linear-gradient(top, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
	background: -ms-linear-gradient(top, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
	background: linear-gradient(to bottom, rgba(34,34,34,0.64) 0%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0) 20%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#222222', endColorstr='#000000', GradientType=0 );
`
class PreviewMobile extends React.Component {
	state = {
		showTopbarTitle: false,
		canEditStory: false,
		story: {}
	}
	static contextTypes = {
		setting: PropTypes.object
	}
	constructor(props) {
		super(props)
	}

	getStoryFromSid = sid => {
		if (sid == null) utils.notFound(this.props.history)
		api
			.getStoryFromSid(sid, auth.getToken(), this.props.countView)
			.then(result => {
				this.setState({
					canEditStory: result.canEditStory,
					story: result.story
				})
			})
			.catch(err => {
				utils.toError(this.props.history, err)
			})
	}
	toggleMobileStatus = () => {
		console.log('isMobile', !this.state.isMobile)
		this.setState({ isMobile: !this.state.isMobile })
	}

	componentDidMount() {
		if (!this.props.story) {
			this.getStoryFromSid(this.props.match.params.sid)
		}
	}

	render() {
		const isMobile = true
		let { keywords, channels } = this.context.setting.publisher
		let { showTopbarTitle, canEditStory, story } = this.state

		let hasCover = true
		// const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;
		if (isEmpty(story)) {
			return <div ref="TT" />
		} else {
			// else if(story&&isMobile) {return (<PreviewMobile story={story}/>)}
			return (
				<Wrapper>
					<BGImg
						style={{ position: 'relative', width: '100%', height: '420px' }}
						src={
							(story.coverMobile && story.coverMobile.large) ||
								'/pic/fbthumbnail.jpg'
						}
						alt={story.title}
					>
						<Cover />
					</BGImg>

					<Content paddingTop={hasCover ? '0px' : '60px'}>
						<Share />

						<Main>
							<StoryDetail
								share={story.shares && story.shares}
								story={this.props.story || story}
								isMobile={isMobile}
								preview={true}
							/>
						</Main>

						<Aside />
					</Content>

				</Wrapper>
			)
		}
	}
}

export default PreviewMobile
