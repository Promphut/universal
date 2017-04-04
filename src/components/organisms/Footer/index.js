import React from 'react'
import styled from 'styled-components'
import {Link, browserHistory} from 'react-router'
import {LogoLink} from 'components'
import FontIcon from 'material-ui/FontIcon';
import auth from 'components/auth'
import api from 'components/api'

const Container = styled.div`
	margin: 0px;
	padding: 0px;
  background: ${props => props.theme.barTone == 'light' ? '#F4F4F4' : props.theme.primaryColor};
	color: ${props => props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF'};
  height: 96px;
	width: 100%;
`

const LinkAndShare = styled.div`
  margin: auto;
	padding-top: 24px;
  width: 315px;
  display: flex;
  justify-content: space-between;
	flex-flow: row wrap;

	@media (max-width: 480px) {
		padding-top: 14px;
	}
`

const Item = styled(Link)`
  font-size: 14px;
  color: ${props => props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF'};
	text-align: center;
	flex: 1;

  &:hover {
	  color: ${props => props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF'};
    textDecoration: underline;
  }

	@media (max-width: 480px) {
		flex: 1 1 49%;
	}
`

const Share = styled.div`
	flex: 1;
	text-align: center;

	@media (max-width: 480px) {
  	margin: 8px auto 0px;
	}
`

const Copyright = styled.div`
  margin: 15px auto;
  width: 315px;
  fontSize: 11px;
	text-align: center;
  color: ${props => props.theme.barTone == 'light' ? '#C4C4C4' : '#FFF'};
  opacity: ${props => props.theme.barTone == 'light' ? '1' : '.5'};

	@media (max-width: 480px) {
  	margin: 10px auto 0px;
	}
`

const VerticalLine = styled.div`
  border: ${props => props.theme.barTone == 'light' ? '1px solid #8E8E8E' : '1px solid #FFF'};
  opacity: .4;
`

const Footer = React.createClass({
  componentDidMount(){
    // Get from cookie, else get from query
    let token = browserHistory.getCurrentLocation().query.token || auth.getToken()

    // 1. Fetch menu, user, and roles information
    api.getCookieAndToken(token)
    .then(result => {
      //console.log('TopBarWithNavigation', result)
      // 2. Update newly fetch cookie
      auth.setCookieAndToken(result)

      // 3. Set the state to "loggedin" or "unloggedin"
      this.menu = result.menu
    })
  },

	render() {
    var {theme} = this.context.setting.publisher
		const isMobile = window.isMobile()

    const logoStyleBase = {
    	display: 'flex',
      justifyContent: 'center',
      margin: 'auto'
    }
		let logoStyle
		if (isMobile) {
			logoStyle = {
				...logoStyleBase,
	      height: '40px',
	      width: '157px',
	      padding: '28px 0px'
			}
		} else {
			logoStyle = {
				...logoStyleBase,
	      height: '45px',
	      width: '315px',
	      padding: '45px 0px'
			}
		}

    const iconStyle = {
      color: (theme.barTone == 'light') ? '#8E8E8E' : '#FFF',
      fontSize: '14px',
      margin: '0px 12px',
      cursor: 'pointer'
    }

    return (
      <Container className="sans-font">
        {/*<LogoLink to="/" src={theme.logo} style={logoStyle} fill={(theme.barTone == 'light') ? '' : '#FFF'}/>*/}
        <LinkAndShare>
          <Item to="/about">About</Item>
          <VerticalLine/>
          <Item to="/contact">Contact</Item>
          {isMobile || <VerticalLine/>}
          <Share>
            <div onClick={api.shareFB} style={{display: 'inline-block'}}><i className="fa fa-facebook" aria-hidden="true" style={iconStyle}></i></div>
            <a href={config.TWT} style={{display: 'inline-block'}}><i className="fa fa-twitter" aria-hidden="true" style={iconStyle}></i></a>
          </Share>
        </LinkAndShare>
        <Copyright>&copy; 2017 LikeMe Co., Ltd. All Right Reserved.</Copyright>
      </Container>
    )
  }
})

Footer.contextTypes = {
	setting: React.PropTypes.object
}

export default Footer
