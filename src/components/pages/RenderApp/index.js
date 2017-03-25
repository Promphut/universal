import React from 'react'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'
import api from 'components/api'
import { ThemeProvider } from 'styled-components';
import { AppContainer } from 'react-hot-loader'
import routes from 'routes'

const RenderApp = React.createClass({
	getInitialState(){
		return {
			setting: {
				publisher:{
					theme: {}
				},
				menu: {}
			}
		}
	},

	componentWillMount(){
		// Get the setting from server ..
		api.getPublisherSetting()
		.then(setting => {
			//console.log('componentWillMount', setting)
			this.setState({
				setting: setting
			})
		})
	},

	getChildContext() {
		return {setting: this.state.setting};
	},

	render() {
		let {publisher} = this.state.setting
		//console.log('setting publisher', publisher)

		return (
			<ThemeProvider theme={publisher.theme}>
				<AppContainer>
					<Router history={browserHistory} routes={routes} render={applyRouterMiddleware(useScroll())} />
				</AppContainer>
			</ThemeProvider>
		)
	}
})

RenderApp.childContextTypes = {
  setting: React.PropTypes.object
};

export default RenderApp;
