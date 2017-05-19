import React, { PropTypes } from 'react'
import styled,{keyframes} from 'styled-components'
import { Link, browserHistory } from 'react-router'
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
//import utils from 'components/utils'
import FontIcon from 'material-ui/FontIcon'
const Wrapper = styled.div`
	.transparent {
		background: none;
		border: none;
	}

	.hide {
		opacity: ${props => props.scroll};
		overflow: hidden;
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
	animation: ${props=> props.open?rot:rot2}  1s forwards;
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
	display: inline-block;
	z-index:10;
`

const HideOnTablet = styled.div`
	float: left;

	@media (max-width: 640px) {
		display: none;
	}
`

const NotLogin = styled.div`
	width: 100px;
	display: inline-block;
	font-size: 15px;
	margin: 9px 20px;

	& * {
		color: ${props => (props.theme.barTone == 'light' ? '#222' : 'white')};
	}

	& a:hover {
		text-decoration: underline;
	}
`

const Edit = styled(Link)`
	font-size:18px;
	float:left;
	text-decoration:underline;
	padding:7px;
	margin:10px 20px 0 0;
	&:hover{
		cursor:pointer;
	}
`
const LogoGif = styled(BGImg)`
	width:60px;
	height:60px;
	margin-right:12px;
`
const ContainerCenter = styled.div`
	position:absolute;
	width:100vw;
	height:100%;
	display:flex;
	justify-content: center;
`

const TopBar = React.createClass({
	getInitialState() {
		return {
			alertLeft: false,
			alertRight: false,
			scroll: 0,
			lock: false
		}
	},

	componentWillMount() {
		this.role = auth.hasRoles(['ADMIN', 'EDITOR', 'WRITER'])
	},

	componentWillUnmount() {
		if (this.props.onScroll)
			window.removeEventListener('scroll', this.handleScroll)
	},

	componentDidMount() {
		if (this.props.onScroll)
			window.addEventListener('scroll', this.handleScroll)

		//console.log(this.role)
	},

	handleScroll(e) {
		this.props.onScroll(e)

		let top = e.srcElement.body.scrollTop / 500
		this.setState({ scroll: top })
	},

	openPop(side) {
		if (side === 'left') {
			this.setState({ alertLeft: true })
		} else if (side === 'right') {
			this.setState({ alertRight: true })
		}
	},

	handleRequestClose(side) {
		if (side === 'left') {
			this.setState({ alertLeft: false })
		} else if (side === 'right') {
			this.setState({ alertRight: false })
		}
	},

	close(e, to, side) {
		e.preventDefault()
		//console.log(e,to,side)
		if (side === 'left') {
			this.setState({ alertLeft: false })
		} else if (side === 'right') {
			this.setState({ alertRight: false })
		}
		if (window.location.pathname != to) browserHistory.push(to)
	},

	// signup() {
		
	// },

	render() {
		var { theme } = this.context.setting.publisher
		let { alertLeft, alertRight, scroll } = this.state
		let status = this.props.status || 'UNLOGGEDIN',
			{ scrolling, user, menu, transparent, editButton, hasCover } = this.props

		const logoStyleBase = {
			display: 'inline-block',
			float: 'left',
			margin: 'auto'
		}
		const logoStyle = window.isMobile()
			? {
					...logoStyleBase,
					display: 'none'
				}
			: {
					...logoStyleBase
				}
		const logoStyleMobile = window.isMobile()
			? {
					...logoStyleBase
				}
			: {
					...logoStyleBase,
					margin: 'auto 12px auto auto'
				}

		const buttonStyle = {
			display: 'inline-block',
			float: 'left',
			boxShadow: 'none',
			verticalAlign: 'middle',
			marginTop: '9px'
		}

		const avatarStyle = {
			display: 'inline-block',
			float: 'left',
			textAlign: 'center',
			margin: '13px 20px 13px 13px',
			cursor: 'pointer'
		}
		//console.log(this.props.onLoading)
		//console.log(theme, theme.barTone, theme.primaryColor)
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
						{this.props.onLoading?<LogoGif src={theme.slogoGif} opacity={-1}></LogoGif>:
						<LogoLink
							to="/"
							src={theme.slogo}
							title={this.props.title}
							style={logoStyleMobile}
							id={'slogo'}
						/>}
							
							<LogoLink
								to="/"
								src={theme.logo}
								title={this.props.title}
								style={logoStyle}
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
								<SecondaryButton
									label="Sign In"
									onClick={()=>{browserHistory.push('/signin')}}
									style={{ verticalAlign: 'middle' }}
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
})

TopBar.propTypes = {
	onScroll: PropTypes.func,
	scrolling: PropTypes.bool,
	status: PropTypes.string,
	editButton: PropTypes.string,
	title: PropTypes.string,

	menu: PropTypes.object,
	user: PropTypes.object
}

TopBar.contextTypes = {
	setting: React.PropTypes.object
}

export default TopBar
