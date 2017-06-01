import React from 'react'
import PropTypes from 'prop-types'
import {
	BGImg,
	TopStory,
	TopVideo,
	TopNewsHome,
	TwtShareButton,
	FbShareButton
} from 'components'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import api from 'components/api'

const LargeBox = styled(Link)`
  display:flex;
	flex:${props => (props.large ? 3 : 2)};
	height:222px;
`
const MiniBox = styled(BGImg)`
	height:222px;
  transition: all 0.3s;
  transform: ${props => (props.hover ? 'scale(1.15)' : 'scale(1)')};
  z-index:-1;
`
const Box1 = styled.div`
  flex:${props => (props.large ? 2 : 1)};
	height:222px;
  overflow: hidden;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
`
const MiniBoxDark = styled.div`
	flex:1;
	height:222px;
	background-color:${props => props.theme.primaryColor};
	display:flex;
  align-items: center;
  justify-content: center;
`
const MiniBoxLight = styled.div`
	flex:1;
	height:222px;
	background-color:white;
`
const ArrowLeft = styled.div`
	position:relative;
	left:-15px;
	top:96px;
	width:0;
	height:0;
	z-index:10;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left:15px solid ${props => props.theme.primaryColor};
`
const Line = styled.div`
	background:${props => props.theme.accentColor};
	width:100%;
	height:4px;
	margin:20px 0 20px 0;
`
const ArrowRight = styled.div`
	position:relative;
	left:-15px;
	top:96px;
	width:0;
	height:0;
	z-index:10;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right:15px solid ${props => props.theme.primaryColor};
`
const NewsBox = styled.div`
	flex:2;
	height:444px;
`
const SName = styled(Link)`
	font-size:18px;
  transition: all 0.3s;
  color:${props => (props.hover ? props.theme.accentColor : '#222')};
  &:hover{
    color:${props => props.theme.accentColor};
  }
`
const HName = styled.div`
	text-transform: uppercase;
	color:#C4C4C4;
	font-size:14px;
	font-weight:bold;
  margin-bottom:8px;
`
const Feed = styled.div`
	flex: 12 1120px;
	max-width: 1120px;
	display:flex;
	@media (max-width:480px) {
    display:block;
		max-width: 100%;
		padding:0 15px 0 15px;
  }
`
const Content = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	padding: 100px 0 60px 0;
  background:#F4F4F4;
	@media (max-width:480px) {
		padding: 70px 0 0 0;
    background:${props => props.theme.primaryColor};
  }

	@media (min-width: 481px) {
		min-height: 480px;
	}
`
const Share = styled.span`
  color:white;
  transition: .3s;

  &:hover{
    cursor:pointer;
    color:${props => props.theme.accentColor};
    > i{
      color:${props => props.theme.accentColor};
    }
  }
`

class TopHome extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}
	state = {
		hover: false,
		trendingStories: []
	}

	getFeed = () => {
		// - Fetching latestStories
		api
			.getFeed('article', { status: 1 }, 'trending', null, 0, 6)
			.then(result => {
				if (result) {
					this.setState({
						trendingStories: result.feed
					})
				}
			})
	}
	hover = () => {
		this.setState({ hover: true })
	}
	leave = () => {
		this.setState({ hover: false })
	}

	componentDidMount() {
		this.getFeed()
	}

	render() {
		var { style, swift, className, large } = this.props
		var { hover, trendingStories } = this.state
		//console.log(trendingStories)
		if(1){return(<div style={{height:70}}></div>)	}
		else{
		return (
			<Content>
				<Feed>
					{trendingStories.length != 0 &&
						<TopStory head={true} swift={true} detail={trendingStories[0]} />}
					{trendingStories.length != 0 &&
						<TopStory swift={true} large={true} detail={trendingStories[1]} />}
					{/*<TopVideo large={true}></TopVideo>*/}
				</Feed>
				<Feed>
					{trendingStories.length != 0 &&
						<TopStory detail={trendingStories[2]} />}
					{trendingStories.length != 0 &&
						<TopStory detail={trendingStories[3]} large={true} />}
					{/*<TopVideo large={true} swift={true}></TopVideo>*/}
				</Feed>
				<Feed>
					<div style={{ flex: 3 }}>
						<div style={{ display: 'flex' }}>
							{trendingStories.length != 0 &&
								<TopStory
									detail={trendingStories[4]}
									swift={true}
									large={true}
								/>}
						</div>
						<div style={{ display: 'flex' }}>
							{trendingStories.length != 0 &&
								<TopStory detail={trendingStories[5]} />}
							<MiniBoxDark className="hidden-mob">
								<div style={{ width: 30 }}>
									<FbShareButton
										button={
											<Share>
												<i
													className="fa fa-facebook"
													style={{
														margin: '5px',
														fontSize: '30px',
														display: 'block'
													}}
													aria-hidden="true"
												/>
											</Share>
										}
									/>
									<Line />
									<TwtShareButton
										button={
											<Share>
												<i
													className="fa fa-twitter"
													style={{ fontSize: '30px', display: 'block' }}
													aria-hidden="true"
												/>
											</Share>
										}
									/>
								</div>
							</MiniBoxDark>
						</div>
					</div>
					<div className="hidden-mob" style={{ flex: 2, display: 'flex' }}>
						<TopNewsHome />
					</div>
				</Feed>
			</Content>
		)
		}
	}
}

export default TopHome
