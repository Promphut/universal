import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import { withRouter } from 'react-router'

import { LogoLink, LeftMenu, RightMenu, BGImg } from '../../../components'

// Imported Utils
import auth from '../../../services/auth'
import utils from '../../../services/utils'
import api from '../../../services/api'

const Wrapper = styled.div`
`

const Container = styled.div`
    display: flex;
    position: absolute;
    margin: 0;
    padding: 0;
    background: ${props => (props.theme.barTone == 'light' ? 'white' : props.theme.primaryColor)};
    color: ${props => (props.theme.barTone == 'light' ? '#222' : 'white')};
    border-bottom: ${props => (props.theme.barTone == 'light' ? '1px solid #e2e2e2' : 'none')};
    height: 60px;
    width: 100%;
	transition: .1s;
	z-index: 10;

    flex-flow: row nowrap;
    justify-content: space-between;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`

const Left = styled.div`
	display: flex;
    justify-content: flex-start;
`

const Right = styled.div`
	display: flex;
    justify-content: flex-end;
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

const Logo = styled(BGImg)`
	height: 60px;
	width: 60px;
    margin-right: 12px;
`

const LogoName = styled.img`
    height: 60px;
	cursor: pointer;
`

const AvatarWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-right: 15px;
	cursor: pointer;
`

class TopBarEditor extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			alertLeft: false,
			alertRight: false,
			status: 'UNLOGGEDIN',
			menu: null,
			user: null
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentDidMount() {
		let token =
			utils.querystring('token', this.props.location) || auth.getToken()

		api.getCookieAndToken(token).then(result => {
			auth.setCookieAndToken(result)

			const { menu, user } = result

			const status = user && token ? 'LOGGEDIN' : 'UNLOGGEDIN'
			this.setState({ status, menu, user })
		})
	}

	open = (side, open) => {
		if (side === 'left') {
			this.setState({ alertLeft: open })
		} else if (side === 'right') {
			this.setState({ alertRight: open })
		}
	}

	close = (e, to, side) => {
		e.preventDefault()

		if (side === 'left') {
			this.setState({ alertLeft: false })
		} else if (side === 'right') {
			this.setState({ alertRight: false })
		}

		if (this.props.location.pathname != to) this.props.history.push(to)
	}

	render() {
		const { theme } = this.context.setting.publisher
		const { left, right } = this.props
		const { alertLeft, alertRight, status, menu, user } = this.state

		return (
			<Wrapper>
				<Container className={'menu-font'}>
					<Left>
						<HamburgerWrapper onClick={() => this.open('left', true)}>
							<Hamburger className="material-icons" style={{ color: '#FFF' }}>
								menu
							</Hamburger>
						</HamburgerWrapper>
						<LogoWrapper>
							<Link to="/"><Logo src={theme.slogo} /> </Link>
							<Link to="/"><LogoName src={theme.logo} /></Link>
						</LogoWrapper>
						{left}
					</Left>

					{status === 'LOGGEDIN' &&
						<Right>
							{right}
							<AvatarWrapper>
								<Avatar
									src={user.pic.medium}
									size={30}
									onClick={() => this.open('right', true)}
								/>
							</AvatarWrapper>
						</Right>}
				</Container>

				<LeftMenu
					menu={menu}
					open={alertLeft}
					close={() => this.open('left', false)}
					closeAndLink={(e, to) => this.close(e, to, 'left')}
				/>

				{status === 'LOGGEDIN' &&
					<RightMenu
						user={user}
						open={alertRight}
						close={() => this.open('right', false)}
					/>}
			</Wrapper>
		)
	}
}

export default withRouter(TopBarEditor)
