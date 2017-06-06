import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import {
	LogoLink,
	PrimaryButton,
	SecondaryButton,
	LeftMenu,
	RightMenu,
	BGImg
} from 'components'
import auth from 'components/auth'
import FontIcon from 'material-ui/FontIcon'
import RaisedButton from 'material-ui/RaisedButton'
import utils from '../../../services/utils'
import { withRouter } from 'react-router'

const Wrapper = styled.div`
	.transparent {
		background: none;
		border: none;
	}

	.hide {
		opacity: ${props => props.scroll};
		overflow: hidden;
	}
	@media (max-width: 480px) {
		.signin{
			font-size:12px;
		}
	}

`
const rot = keyframes`
	from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const rot2 = keyframes`

`
const Rotate = styled.div`
	width:50px;
	height:50px;
	background:red;
	animation: ${props => (props.open ? rot : rot2)}  1s forwards;
`

const Container = styled.div`
	margin: 0;
	padding: 0;
  background: ${props => (props.theme.barTone == 'light' ? 'white' : props.theme.primaryColor)};
	color: ${props => (props.theme.barTone == 'light' ? '#222' : 'white')};
  height: 60px;
  border-bottom: ${props => (props.theme.barTone == 'light' ? '1px solid #e2e2e2' : 'none')};
	width: 100%;
	transition: .1s;
	position: absolute;

	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;

	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`

const Left = styled.div`
	justify-content: flex-start;
	display: inline-block;
	z-index:10;
`

const HamburgerWrapper = styled.a`
	display: inline-block;
  float: left;
  text-align: center;
  color: ${props => (props.theme.barTone == 'light' ? '#222' : 'white')};
  padding: 11px 22px 13px;
  cursor: pointer;
`

const Hamburger = styled.i`
	color: ${props => (props.theme.barTone == 'light' ? '#222' : 'white')};
	padding-top:5px;
	transition: .2s;

	&:hover {
		color: ${props => props.theme.accentColor}
	}
`

const LogoWrapper = styled.div`
	display: flex;
	float: left;
	height: 60px;
`

const Logo = styled.img`
	height: 60px;
	width: 60px;
	cursor: pointer
`

const Center = styled.div`
	max-width: 40%;
	white-space: nowrap;

	@media (max-width: 960px) {
		display: none;
	}
`

const Right = styled.div`
	justify-content: flex-end;
	padding:0 20px;
	z-index:10;
	display:flex;
	align-items:center;
	@media (max-width: 480px) {
		padding:0 15px;
	}
`

const HideOnTablet = styled.div`
	float: left;

	@media (max-width: 640px) {
		display: none;
	}
`

const NotLogin = styled.div`
	width: 96px;

`

const Edit = styled(Link)`
	font-size:18px;
	float:left;
	text-decoration:underline;
	padding:7px;
	margin:0 20px 0 0;
	&:hover{
		cursor:pointer;
	}
`
const LogoGif = styled(BGImg)`
	width:60px;
	height:60px;
	margin-right:12px;
	animation:${props => (props.onLoading ? fadeOut : fadeIn)} 1.25s linear;
`
const ContainerCenter = styled.div`
	position:absolute;
	width:100%;
	height:100%;
	display:flex;
	justify-content: center;
`
const fadeOut = keyframes`
  0% {
    opacity:1;
  }
	100%{
		opacity:0;
	}
`
const fadeIn = keyframes`
	0% {
    opacity:0;
  }
	100%{
		opacity:1;
	}
`

let logoStyleBase = {
	display: 'inline-block',
	float: 'left',
	margin: 'auto'
}
let buttonStyle = {
	display: 'inline-block',
	float: 'left',
	boxShadow: 'none',
	verticalAlign: 'middle',
	height: '30px',
	lineHeight: '30px'
}
let avatarStyle = {
	display: 'inline-block',
	float: 'left',
	textAlign: 'center',
	margin: '0 0 0 13px',
	cursor: 'pointer'
}

class TopBar extends React.Component {
	static propTypes = {
		onScroll: PropTypes.func,
		scrolling: PropTypes.bool,
		status: PropTypes.string,
		editButton: PropTypes.string,
		title: PropTypes.string,

		menu: PropTypes.object,
		user: PropTypes.object
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {
			alertLeft: false,
			alertRight: false,
			scroll: 0,
			lock: false
		}
	}

	componentWillMount() {
		this.role = auth.hasRoles(['ADMIN', 'EDITOR', 'WRITER'])
	}

	componentWillUnmount() {
		if (this.props.onScroll)
			window.removeEventListener('scroll', this.handleScroll)
	}

	componentDidMount() {
		if (this.props.onScroll)
			window.addEventListener('scroll', this.handleScroll)

		//console.log(this.role)
	}

	handleScroll = e => {
		this.props.onScroll(e)

		let top = e.srcElement.body.scrollTop / 500
		this.setState({ scroll: top })
	}

	openPop = side => {
		if (side === 'left') {
			this.setState({ alertLeft: true })
		} else if (side === 'right') {
			this.setState({ alertRight: true })
		}
	}

	handleRequestClose = side => {
		if (side === 'left') {
			this.setState({ alertLeft: false })
		} else if (side === 'right') {
			this.setState({ alertRight: false })
		}
	}

	close = (e, to, side) => {
		e.preventDefault()
		//console.log(e,to,side)
		if (side === 'left') {
			this.setState({ alertLeft: false })
		} else if (side === 'right') {
			this.setState({ alertRight: false })
		}
		if (this.props.location.pathname != to) this.props.history.push(to)
	}

	signup = () => {
		this.props.history.push('/signin')
	}

	render() {
		let { theme } = this.context.setting.publisher
		let { alertLeft, alertRight, scroll } = this.state
		let status = this.props.status || 'UNLOGGEDIN',
			{ scrolling, user, menu, transparent, editButton, hasCover } = this.props

		let logoStyle = utils.isMobile()
			? {
					...logoStyleBase,
					display: 'none'
				}
			: {
					...logoStyleBase
				}
		let logoStyleMobile = utils.isMobile()
			? {
					...logoStyleBase
				}
			: {
					...logoStyleBase,
					margin: 'auto 12px auto auto'
				}

		//console.log(this.props.onLoading)
		//console.log(theme, theme.slogoGif)
		return (
			<Wrapper scroll={scroll}>
				<Container
					className={
						'menu-font ' +
							(!scrolling && transparent && hasCover ? 'transparent' : '')
					}>
					<Left>
						<HamburgerWrapper onClick={() => this.openPop('left')}>
							<Hamburger
								className="material-icons"
								style={
									!scrolling && transparent && hasCover
										? { color: 'white' }
										: {}
								}>
								menu
							</Hamburger>
						</HamburgerWrapper>
						<LogoWrapper>
							<Link to="/">
								<LogoGif
									onLoading={this.props.onLoading}
									src={this.props.onLoading ? theme.slogoGif : theme.slogo}
									opacity={-1}
								/>
							</Link>

							<LogoLink
								to="/"
								src={theme.logo}
								title={this.props.title}
								style={{...logoStyle}}
								id={'logo'}
								fill={!scrolling && hasCover ? '#FFF' : ''}
							/>
						</LogoWrapper>
					</Left>

					<ContainerCenter>
						<Center className={transparent ? 'hide' : ''}>
							{this.props.children}
						</Center>
					</ContainerCenter>

					{status == 'LOGGEDIN' &&
						<Right>
							{this.role &&
								editButton &&
								<Edit
									className="nunito-font"
									style={{
										color: (!scrolling && transparent && hasCover) ||
											theme.barTone != 'light'
											? '#FFF'
											: '#222'
									}}
									to={editButton}>
									Edit Story
								</Edit>}

							{this.role &&
								<HideOnTablet>
									<Link to="/me/stories/new">
										<PrimaryButton
											label="Story"
											labelStyle={{ textTransform: 'none' }}
											iconName="add"
											style={buttonStyle}
										/>
									</Link>
								</HideOnTablet>}

							<Avatar
								src={user.pic.medium}
								size={30}
								style={avatarStyle}
								onClick={() => this.openPop('right')}
							/>
						</Right>}
					{status == 'UNLOGGEDIN' &&
						<Right>
							<NotLogin>
								<RaisedButton
									label=" Sign In"
									labelColor={theme.accentColor}
									labelStyle={{top:'-2px'}}
									onClick={this.signup}
									style={{display:'block',borderRadius:'20px',boxShadow:'none',background:'none'}}
									buttonStyle={{background:'none',border:'2px solid '+theme.accentColor,borderRadius:'20px'}}
								/>
							</NotLogin>
						</Right>}
				</Container>

				<LeftMenu
					menu={menu}
					open={alertLeft}
					close={() => this.handleRequestClose('left')}
					closeAndLink={(e, to) => this.close(e, to, 'left')}
				/>
				{status == 'LOGGEDIN' &&
					<RightMenu
						open={alertRight}
						user={user}
						close={() => this.handleRequestClose('right')}
					/>}
			</Wrapper>
		)
	}
}

export default withRouter(TopBar)
