import React from 'react'
import styled from 'styled-components'
import {Link, browserHistory} from 'react-router'
import Avatar from 'material-ui/Avatar'
import {Logo, PrimaryButton, SecondaryButton, LeftMenu, RightMenu} from 'components'

const Wrapper = styled.div`
`

const Container = styled.div`
	margin: 0;
	padding: 0;
  background-color: white;
  height: 60px;
  border-bottom: 1px solid #e2e2e2;
	width: 100%;

	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
`

const Left = styled.div`
	float: left
`

const HamburgerWrapper = styled.a`
	display: inline-block;
  float: left;
  text-align: center;
  color: #8f8f8f;
  background-color: white;
  padding: 22px 20px;
  cursor: pointer;
`

const Hamburger = styled.div`
	content: '';
	height: 2px;
	width: 20px;
	background: #8d8d8d;
	box-shadow: 0 6px 0 #8d8d8d, 0 12px 0 #8d8d8d;
  marginBottom: 11px;
`

const Center = styled.div`
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
	margin: 9px 5px;

	& * {
		color: #8f8f8f;
	}

	& a:hover {
		text-decoration: underline;
	}
`

const TopBar = React.createClass({
	getInitialState(){
		return {
			alertLeft: false,
			alertRight: false
		}
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
		let {alertLeft, alertRight} = this.state
		let status = this.props.status || 'UNLOGGEDIN',
			user = this.props.user,
			menu = this.props.menu

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
	    <Wrapper>
				<Container className="menu-font">
					<Left>
			      <HamburgerWrapper onClick={() => this.openPop('left')}>
			        <Hamburger/>
			      </HamburgerWrapper>
			      <Link
			        to="/"
			        title={this.props.title}
			        style={logoStyle}
			      ><Logo fill={'#00B2B4'}/>
			      </Link>
					</Left>

					<Center>
   					{this.props.children}
					</Center>

					{status == 'LOGGEDIN' &&
						<Right>
				      <HideOnTablet>
				        <PrimaryButton
				          label="Story"
				          iconName="add"
				          style={buttonStyle}
				        />
				      </HideOnTablet>

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

export default TopBar;
