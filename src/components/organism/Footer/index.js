import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {LogoLink} from 'components'
import FontIcon from 'material-ui/FontIcon';
import auth from 'components/auth'
import api from 'components/api'
import utils from '../../../services/utils'
import { withRouter } from 'react-router'

const Container = styled.div`
	padding: 40px 0px 40px 0px;
  background: ${props => props.theme.barTone == 'light' ? '#F4F4F4' : props.theme.primaryColor};
	color: ${props => props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF'};
	width: 100%;
`

const Content = styled.div`
	display: flex;
	width:90%;
	margin: auto;
`

const Column = styled.div `
  font-size: 14px;
  color: ${props => props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF'};
	text-align: left;
	flex: ${props => props.width};
`

const ColumnHeader = styled.div `
	color: ${props => props.theme.barTone == 'light' ? '#6e6b6b' : '#FFF'};
	font-weight: bold;
	margin-bottom: 6px;
	font-size: 14px;
`

const ColumnItemContainer = styled.div `
	padding-top:10px;
`

const ColumnItem = styled.h5 `
	margin-top: 6px;
	margin-bottom:15px;
	font-size: 14px;
`

const SocialContent = styled.ul `
	display: inline;
	list-style-type: none;
	padding-left: 0px;
`

const SocialContentItem = styled.li `
	display: inline;
	margin-left: 15px;
	margin-right: 0px;

	&:first-child {
		margin-left: 0px;
	}
`

const SiteLogoImage = styled.img `
	height: 24px;
	width: auto;
`

const InnerLink = styled(Link) `
	color: ${props => props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF'} !important;
	transition: .2s;

	&:hover {
		color: ${props => props.theme.accentColor} !important;
	}
`;

const SocialLink = styled.a `
	color: ${props => props.theme.barTone == 'light' ? '#8E8E8E' : '#FFF'} !important;
	transition: .2s;

	&:hover {
		color: ${props => props.theme.accentColor} !important;
	}
`

const SocialIcon = styled.i `
	height: 14px;
	width:auto;
	padding: 0;
	margin: 0;
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
    let token = utils.querystring('token', this.props.location) || auth.getToken()
    // let query = parse(this.props.location.search)
    // let token = query && query.token ? query.token : auth.getToken()

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

    return (
      <Container className="sans-font">
				<Content>
						<Column width = {1.5}>
							<ColumnHeader>MENU</ColumnHeader>
							<ColumnItemContainer>
								<ColumnItem><InnerLink to = "/">Home</InnerLink></ColumnItem>
								<ColumnItem><InnerLink to = "/about">About Us</InnerLink></ColumnItem>
								<ColumnItem><InnerLink to = "/stories/news">News</InnerLink></ColumnItem>
							</ColumnItemContainer>
						</Column>

						<Column width = {1.5}>
							<ColumnHeader>STORIES</ColumnHeader>
							<ColumnItemContainer>
								<ColumnItem><InnerLink to = "/stories/transform">Transform</InnerLink></ColumnItem>
								<ColumnItem><InnerLink to = "/stories/next-big-thing">Next Big Thing</InnerLink></ColumnItem>
								<ColumnItem><InnerLink to = "/stories/next-business">Next Business</InnerLink></ColumnItem>
								<ColumnItem><InnerLink to = "/stories/thought-leader">Thought Leader</InnerLink></ColumnItem>
							</ColumnItemContainer>
						</Column>

						<Column width = {2}>
							<ColumnHeader>SUBSCRIBE</ColumnHeader>
							<ColumnItemContainer>
								{channels && <SocialContent>
									{channels.fb && <SocialContentItem><SocialLink href={utils.getFbUrl(channels.fb)} target="_blank"><SocialIcon className="fa fa-facebook fa-2x" aria-hidden="true"></SocialIcon></SocialLink></SocialContentItem>}
									{channels.twt && <SocialContentItem><SocialLink href={utils.getFbUrl(channels.twt)} target="_blank"><SocialIcon className="fa fa-twitter fa-2x" aria-hidden="true"></SocialIcon></SocialLink></SocialContentItem>}
									{channels.yt && <SocialContentItem><SocialLink href={utils.getFbUrl(channels.yt)} target="_blank"><SocialIcon className="fa fa-youtube-play fa-2x" aria-hidden="true"></SocialIcon></SocialLink></SocialContentItem>}
									{channels.ig && <SocialContentItem><SocialLink href={utils.getFbUrl(channels.ig)} target="_blank"><SocialIcon className="fa fa-instagram fa-2x" aria-hidden="true"></SocialIcon></SocialLink></SocialContentItem>}

								</SocialContent>}
							</ColumnItemContainer>
						</Column>

						<Column width = {6} style={{display:'flex', justifyContent:'flex-end'}}>
								<ColumnItemContainer>
									<ColumnItem style = {{marginTop:'0px', marginBottom:'25px'}}>
										<SiteLogoImage src = {theme.slogo} />
										<SiteLogoImage src = {theme.llogo} />
									</ColumnItem>
									<ColumnItem>
										<SiteLogoImage src = {'/pic/poweredby_black.svg'}/>
									</ColumnItem>
									<ColumnItem style = {{fontSize:'12px', marginTop:'-10px'}}>© 2017 LikeMe Co., Ltd. All Right Reserved.</ColumnItem>
								</ColumnItemContainer>
						</Column>

        	{/* <Copyright>&copy; 2017 LikeMe Co., Ltd. All Right Reserved.</Copyright> */}
				</Content>
      </Container>
    )
  }
}

export default withRouter(Footer)
