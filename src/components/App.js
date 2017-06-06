import React from 'react'
import PropTypes, { instanceOf } from 'prop-types'
import { injectGlobal, ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'
import api from 'components/api'
import differenceWith from 'lodash/differenceWith'
import isEqual from 'lodash/isEqual'
import { withRouter } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import LinearProgress from 'material-ui/LinearProgress'
import { withCookies, Cookies } from 'react-cookie'
import config from '../config'
import utils from '../services/utils'
//import theme from './themes/default'

injectGlobal`
  body {
    color:#222;
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    box-sizing: border-box;
  }

  h3{
    font-size:19px;
    font-weight:bold;
    color:#222;
  }

  a {
    color: #8f8f8f;
    text-decoration: none;
  }
  a:hover{
    color: #222;
    text-decoration: none;
  }
`

injectTapEventPlugin()

class App extends React.Component {
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired,
		children: PropTypes.any,
		cookies: instanceOf(Cookies).isRequired
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props, context) {
		super(props)

		this.state = {
			completed: 0
		}
	}

	genHash = nextProps => {
		//console.log('HASHED')
		let hash =
			new Date().valueOf().toString(36) + Math.round(Math.random() * 100)
		let { match, location, history } = nextProps

		// 1. Create hash
		// 1.1 For story URL
		// count dark social if story countView is true
		if (match.params.countView) api.createHash(hash, match.params.story._id)
		else
			// 1.2 For non-story URL
			api.createHash(hash)

		// 2. Append #hash to url
		//history.replace(location.pathname+'#'+hash)
		//console.log(location)
		history.replace({ hash: '#' + hash })
		// this.props.router.replace({
		//   ...nextProps.location,
		//   hash:'#'+hash
		// })
	}

	progress = completed => {
		if (completed > 100) {
			this.setState({ completed: 100 })
		} else {
			this.setState({ completed })
			const diff = Math.random() * 30
			this.timer = setTimeout(() => this.progress(completed + diff), 100)
		}
	}

	componentWillMount() {
		//console.log('COOK', this.props.cookies)
		global.cookies = this.props.cookies
	}

	componentDidMount() {
		//this.timer = setTimeout(() => this.progress(10), 100);
		//console.log('MOUNTED', this.props.location)
		// key'll be null if enter for the first time
		// for page refresh or re-enter on url bar, key'll have value
		if (this.props.location.hash && !this.props.location.key) {
			// direct enter with hash, mean dark social traffic
			// if have hash, send to dark social service
			//console.log('CASE 1', this.props.location)
			//console.log('nextState', nextState, nextProps)
			api.checkHash(this.props.location.hash.substring(1))
			return this.genHash(this.props)
		} else {
			// first time but no hash presented or have key, gen hash
			//console.log('CASE 2', this.props.location)
			return this.genHash(this.props)
		}
	}

	componentWillReceiveProps(nextProps) {
		//console.log("RECEIVE1", /*nextProps.location.pathname, this.props.location.pathname, */nextProps.location.action, nextProps.location.key, this.props.location.key)
		//console.log("RECEIVE2", nextProps.location.hash, nextProps.location.action)
		//console.log('componentWillReceiveProps', nextProps.history, nextProps.location, this.props.location)
		//let isFirstTime = !nextProps.location.key && !this.props.location.key
		//console.log(nextProps.location.pathname)

		if (nextProps.history.action === 'PUSH') {
			//this.timer = setTimeout(() => this.progress(10), 100); //loading
			// if pushing for the next path, gen hash
			//console.log('CASE 3')
			if (nextProps.location.pathname !== this.props.location.pathname)
				return this.genHash(nextProps)
			// if reclick the same url
			// if(this.props.location.hash && !nextProps.location.hash) {

			//   nextProps.location.hash = this.props.location.hash
			//   console.log('XXX', this.props.location.hash, 'ZZ', nextProps.location.hash)
			// }
		}
		// for case POP i.e. reenter url with hash
		//console.log('CASE 4', nextProps.location, this.props.location)
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (differenceWith(nextProps.children, this.props.children, isEqual)) {
			this.timer = setTimeout(() => this.progress(10), 100)
		}
		//console.log('UPDATE0', (nextProps.location.action === 'REPLACE' && !!nextProps.location.hash), nextProps.location.hash, this.props.location.hash)
		if (nextProps.location.pathname != this.props.location.pathname) {
			document.body.scrollTop = document.documentElement.scrollTop = 0
		}
		// If intention is to change hash, no need to update component
		if (
			nextProps.history.action === 'REPLACE' &&
			nextProps.location.hash !== this.props.location.hash
		) {
			return false
		}
		//console.log('-- Component Updated --')
		return true
	}

	componentDidUpdate(prevProps, prevState) {
		clearTimeout(this.timer)
		//this.setState({completed:120})
		//this.progress(200)
		//console.log(this.timer)
	}

	render() {
		let {
			name,
			desc,
			tagline,
			keywords,
			analytic,
			channels,
			cover,
			theme
		} = this.context.setting.publisher
		//console.log('SETTING', this.context.setting.publisher)
		if (!analytic) analytic = {}
		let coverMedium
		if (cover) coverMedium = cover.medium
		let title = (name || '') + (tagline ? ' | ' + tagline : '')

		let { completed } = this.state
		//let {theme} = this.context.setting.publisher

		//console.log('AGENT', navigator.userAgent)
		let context = {
			appBar: {
				height: 60
			},
			menuItem: {
				hoverTextColor: '#FFF',
				selectedTextColor: '#FFF'
			},
			textField: {
				floatingLabelColor: theme.accentColor,
				focusColor: theme.accentColor
			},
			flatButton: {},
			raisedButton: {},
			tabs: {
				selectedTextColor: '#FFF'
			}
		}
		if (navigator.userAgent) context.userAgent = navigator.userAgent
		let muiTheme = getMuiTheme(context)

		return (
			<div>
				<Helmet
					title={title}
					meta={[
						{ name: 'title', content: title },
						{ name: 'keywords', content: keywords },
						{ name: 'description', content: desc },

						{ property: 'og:site_name', content: name },
						{
							property: 'og:url',
							content: config.FRONTURL + this.props.location.pathname
						},
						{ property: 'og:title', content: title },
						{ property: 'og:type', content: 'article' },
						{ property: 'og:image', content: coverMedium },
						{ property: 'og:keywords', content: keywords },
						{ property: 'og:description', content: desc },
						{ property: 'twitter:card', content: 'summary_large_image' },
						{ property: 'twitter:image:alt', content: title },
						{ property: 'fb:app_id', content: config.ANALYTIC.FBAPPID }
						// { property: 'og:image:type', content: 'image/png' },
						// { property: 'og:image:width', content: '1200' },
						// { property: 'og:image:height', content: '630' },
					]}
					link={[
						{
							rel: 'shortcut icon',
							type: 'image/ico',
							href: config.BACKURL + '/publishers/' + config.PID + '/favicon'
						},
						channels && channels.fb
							? { rel: 'author', href: utils.getFbUrl(channels.fb) }
							: {},
						{
							rel: 'canonical',
							href: config.FRONTURL + this.props.location.pathname
						},
						{ rel: 'stylesheet', href: '/css/main.css' },
						{ rel: 'stylesheet', href: '/fonts/stylesheet.css' },
						{
							rel: 'stylesheet',
							href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
						},
						{
							rel: 'stylesheet',
							href: 'https://cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css'
						},
						{
							rel: 'stylesheet',
							href: 'https://fonts.googleapis.com/css?family=Mitr|Nunito|PT+Sans|PT+Serif:400,700,700i|Roboto|Roboto+Slab'
						}
					]}
					script={[{ src: 'https://use.fontawesome.com/3df470c471.js' }]}
				/>
				<ThemeProvider theme={theme}>
					<MuiThemeProvider muiTheme={muiTheme}>
						<div>
							{completed < 100 &&
								<LinearProgress
									mode="determinate"
									value={completed}
									color={theme.accentColor}
									style={{ position: 'absolute' }}
								/>}
							{React.Children.map(this.props.children, child => {
								return React.cloneElement(child, {
									onLoading: completed < 100 ? true : false
								})
							})}
						</div>
					</MuiThemeProvider>
				</ThemeProvider>
			</div>
		)
	}
}

export default withRouter(withCookies(App))
