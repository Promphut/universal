import React from 'react'
import styled from 'styled-components'
import {
	ContactAndAboutContainer,
	ShareButton,
	TwtShareButton,
	FbShareButton
} from 'components'
import { Helmet } from 'react-helmet'
import api from 'components/api'
import config from '../../../config'
import moment from 'moment'

const Wrapper = styled.div`

`

const Head = styled.h1`
  font-size: 36px;
  font-Weight: bold;
  color: ${props => props.theme.primaryColor};
  @media (max-width: 480px) {
    font-size: 24px;
  }
`

const Article = styled.div`
  font-size:20px;
  margin-top:40px;
  clear:both;
	overflow:hidden;
  ul > li {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin:10px 0 10px 0;
  }
  p {
    font-family: 'cs_prajad','PT Sans', sans-serif;
    font-size: 18px;
    margin:8px 0 8px 0;
    line-height:1.5;
    font-weight:normal;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  h2 {
    font-size: 28px;
    font-weight:bold;
    color:#222;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  h3 {
    font-size: 20px;
    font-weight:normal;
    color:#bfbfbf;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  blockquote {
    font-size: 20px;
    font-family: 'PT Serif', 'Mitr';
    font-weight:normal;
    color:#222;
    border-left: 3px solid ${props => props.theme.accentColor};
    padding-left:20px;
    display:inline-block;
    white-space: pre-wrap;      /* Webkit */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap;     /* Opera <7 */
    white-space: -o-pre-wrap;   /* Opera 7 */
    word-wrap: break-word;      /* IE */
  }
  @media (max-width:480px){
    font-size:16px;
    margin-top:15px;
  }
`

const HiddenMobile = styled.div`
  @media (max-width: 480px){
    display: none;
  }
`

class AboutPage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			aboutUs: '',
			fb: 0,
			twt: 0
		}
	}

	componentDidMount() {
		api.getPublisherAboutUs().then(aboutUs => {
			this.setState({
				aboutUs: aboutUs
			})
		})

		var pid = config.PID
		const from = config.FROMDATE
		const to = moment().utcOffset('+07:00').format('YYYYMMDD')
		api
			.getPublisherInsight(pid, 'share', 'share_fb', null, from, to)
			.then(ins => {
				this.setState({ fb: ins.summary.total })
			})

		api
			.getPublisherInsight(pid, 'share', 'share_twt', null, from, to)
			.then(ins => {
				this.setState({ twt: ins.summary.total })
			})
	}

	render() {
		const { fb, twt } = this.state
		return (
			<ContactAndAboutContainer onLoading={this.props.onLoading}>
				<Helmet>
					<link
						rel="stylesheet"
						href="/css/medium-editor.css"
						type="text/css"
					/>
					<link rel="stylesheet" href="/css/tim.css" type="text/css" />
					<link
						rel="stylesheet"
						href="/css/medium-editor-insert-plugin.css"
						type="text/css"
					/>
				</Helmet>
				<Wrapper>
					<Head className="title-font">About Us</Head>
					<Article
						className="content-font"
						dangerouslySetInnerHTML={{ __html: this.state.aboutUs }}
					/>
					<HiddenMobile>
						<FbShareButton
							button={
								<ShareButton
									className="fa fa-facebook"
									number={fb}
									color="58,88,155"
								/>
							}
						/>
						<TwtShareButton
							button={
								<ShareButton
									className="fa fa-twitter"
									number={twt}
									color="96,170,222"
									style={{ marginLeft: '15px' }}
								/>
							}
						/>
					</HiddenMobile>
				</Wrapper>
			</ContactAndAboutContainer>
		)
	}
}
export default AboutPage
