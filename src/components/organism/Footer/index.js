import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {LogoLink} from 'components'
import FontIcon from 'material-ui/FontIcon';
import auth from 'components/auth'
import api from 'components/api'
import { parse } from 'query-string'
import utils from '../../../services/clientUtils'
import { withRouter } from 'react-router'

const Container = styled.div`
	margin: 30px 0px 0px;
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
	flex: 2;
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

class Footer extends React.Component {
  static contextTypes = {
    setting: PropTypes.object
  }

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    // Get from cookie, else get from query
    let query = parse(this.props.location.search)
    let token = query ? query.token : auth.getToken()

    // 1. Fetch menu, user, and roles information
    api.getCookieAndToken(token)
    .then(result => {
      //console.log('TopBarWithNavigation', result)
      // 2. Update newly fetch cookie
      auth.setCookieAndToken(result)

      // 3. Set the state to "loggedin" or "unloggedin"
      this.menu = result.menu
    })
  }

  render() {
    let {theme, channels} = this.context.setting.publisher
    //console.log('publisher', this.context.setting.publisher)
    const isMobile = utils.isMobile()

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
          {isMobile || channels && <VerticalLine/>}

          {channels && <Share>
            {channels.fb && <a href={utils.getFbUrl(channels.fb)} target="_blank" style={{display: 'inline-block'}}><i className="fa fa-facebook fa-2x" aria-hidden="true" style={iconStyle}></i></a>}
            {channels.twt && <a href={utils.getTwtUrl(channels.twt)} target="_blank" style={{display: 'inline-block'}}><i className="fa fa-twitter fa-2x" aria-hidden="true" style={iconStyle}></i></a>}
            {channels.yt && <a href={utils.getYtUrl(channels.yt)} target="_blank" style={{display: 'inline-block'}}><i className="fa fa-youtube-play fa-2x" aria-hidden="true" style={iconStyle}></i></a>}
            {channels.ig && <a href={utils.getIgUrl(channels.ig)} target="_blank" style={{display: 'inline-block'}}><i className="fa fa-instagram fa-2x" aria-hidden="true" style={iconStyle}></i></a>}
          </Share>}

        </LinkAndShare>
        <Copyright>&copy; 2017 LikeMe Co., Ltd. All Right Reserved.</Copyright>
      </Container>
    )
  }
}

export default withRouter(Footer)
