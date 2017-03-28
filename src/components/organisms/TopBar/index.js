import React, {PropTypes} from 'react'
import styled from 'styled-components'
import {Link, browserHistory} from 'react-router'
import Avatar from 'material-ui/Avatar'
import {LogoLink, PrimaryButton, SecondaryButton, LeftMenu, RightMenu} from 'components'
import auth from 'components/auth'
//import utils from 'components/utils'

const Wrapper = styled.div`
	.transparent {
		background: none;
		border: none;
	}
	@media (max-width:480px){
		#logo{
			display:none;
		}
	}
	.hide {
		opacity: ${props => props.scroll};
	}
`

const Container = styled.div`
	margin: 0;
	padding: 0;
  background: white;
  height: 60px;
  border-bottom: 1px solid #e2e2e2;
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
	float: left
`

const HamburgerWrapper = styled.a`
	display: inline-block;
  float: left;
  text-align: center;
  color: #8f8f8f;
  padding: 22px 20px;
  cursor: pointer;
`

const Hamburger = styled.div`
	content: '';
	height: 2px;
	width: 20px;
	background: ${props => props.white ? 'white' : '#8d8d8d'};
	box-shadow: ${props => props.white ?
		'0 6px 0 white, 0 12px 0 white' : '0 6px 0 #8d8d8d, 0 12px 0 #8d8d8d'};
  marginBottom: 11px;
`

const Center = styled.div`
	opacity: 1;
	transparent .1s;
	cursor: default;
	@media (max-width: 960px) {
		display: none;
	}
`

const Right = styled.div`
	float: right
`

const HideOnTablet = styled.div`
	float: left;

	@media (max-width: 640px) {
		display: none;
	}
`

const NotLogin = styled.div`
	width: 180px;
	display: inline-block;
	font-size: 15px;
	margin: 9px 20px;

	& * {
		color: #8f8f8f;
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

const TopBar = React.createClass({
	getInitialState(){
		return {
			alertLeft: false,
			alertRight: false,
			scroll: 0,
			lock: false
		}
	},

	componentWillMount(){
		this.role = auth.hasRoles(["ADMIN","EDITOR","WRITER"])
	},

	componentWillUnmount() {
		if(this.props.onScroll) window.removeEventListener('scroll', this.handleScroll)

	},

	componentDidMount() {
		if(this.props.onScroll)window.addEventListener('scroll', this.handleScroll)
			//console.log(this.role)
	},

	handleScroll(e) {
		this.props.onScroll(e)

		let top = e.srcElement.body.scrollTop / 1000
		this.setState({scroll: top})
	},

	openPop(side){
		if (side === 'left') {
			this.setState({alertLeft: true})
		} else if (side === 'right') {
			this.setState({alertRight: true})
		}
	},

	handleRequestClose(side){
		if (side === 'left') {
			this.setState({alertLeft: false})
		} else if (side === 'right') {
			this.setState({alertRight: false})
		}
	},

	signup(){
		browserHistory.push('/signup')
	},

	render () {
		let {alertLeft, alertRight, scroll} = this.state
		let status = this.props.status || 'UNLOGGEDIN',
			{scrolling, user, menu, transparent,editButton}  = this.props

	  const logoStyle = {
	    display: 'inline-block',
	    float: 'left',
	    marginTop: '3px',
	    padding: '17px 5px'
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

	  return (
	    <Wrapper scroll={scroll}>
				<Container className={'menu-font '
					+ ((!scrolling && transparent) ? 'transparent' : '')}>
					<Left>
				      <HamburgerWrapper onClick={() => this.openPop('left')}>
				        <Hamburger white={(!scrolling && transparent)}/>
				      </HamburgerWrapper>

				      <LogoLink to="/" title={this.props.title} style={logoStyle} fill={!scrolling && transparent ? 'white' : ''} id="logo"/>
					</Left>

					<Center className={transparent ? 'hide': ''}>
   					{this.props.children}
					</Center>

					{status == 'LOGGEDIN' &&
						<Right>
							{ this.role && editButton && <Edit className='nunito-font' style={{color:(!scrolling && transparent) ? 'white' : '#8f8f8f'}} to={editButton}>Edit Story</Edit>}

				      {this.role && <HideOnTablet>
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
								size={30} style={avatarStyle}
								onClick={() => this.openPop('right')}
							/>
						</Right>
					}
					{status == 'UNLOGGEDIN' &&
						<Right>
							<NotLogin>
								<SecondaryButton
									label="Sign Up"
									onClick={this.signup}
									style={{verticalAlign: 'middle'}}
								/>
								<span>&nbsp; or </span>
								<Link to="/signin" style={{fontWeight:'bold'}}>
									Sign In
								</Link>
							</NotLogin>
						</Right>
					}
				</Container>

				<LeftMenu
					menu={menu}
					open={alertLeft}
					close={() => this.handleRequestClose('left')}
				/>
				{status=='LOGGEDIN' &&
					<RightMenu
						open={alertRight}
						user={user}
						close={() => this.handleRequestClose('right')}
					/>
				}
	    </Wrapper>
	  )
	}
})

TopBar.propTypes = {
  onScroll: PropTypes.func,
  scrolling: PropTypes.bool,
  status: PropTypes.string,
  editButton:PropTypes.string,
  title: PropTypes.string,

  menu: PropTypes.object,
  user: PropTypes.object
}

export default TopBar;
