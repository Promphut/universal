var React = require('react'),
	{ Router, browserHistory, applyRouterMiddleware } = require('react-router'),
	{ useScroll } = require('react-router-scroll'),
	api = require('components/api'),
	{ ThemeProvider } = require('styled-components')


var RenderApp = React.createClass({
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

	componentDidMount(){
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
 				<Router history={browserHistory} routes={this.props.routes} render={applyRouterMiddleware(useScroll())} />
 			</ThemeProvider>
		)
	}
})

RenderApp.childContextTypes = {
  setting: React.PropTypes.object
};

module.exports = RenderApp