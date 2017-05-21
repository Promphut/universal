import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import api from 'components/api'
import auth from 'components/auth'
import App from 'components/App'
import { HomePage2, NewsPage, AllColumn, AboutPage, ContactPage, TagPage, ColumnPage, StoryPage, ForgetPasswordPage, SignInPage, SignUpPage, UserStory, PublisherEditor } from 'components'

const NotFound = ({ location }) => (
	<Status code={404}>
		<div>
			<h3>No match for <code>{location.pathname}</code></h3>
		</div>
	</Status>
)

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
  	//console.log('staticContext', staticContext)
    if (staticContext)
      staticContext.status = code
    return children
  }}/>
)

class AppRoutes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			setting: {
				publisher:{
					theme: {}
				},
				menu: {}
			}
		}
	}

	componentDidMount(){
		//console.log('APPROUTES DIDMOUNT')
		api.getPublisherSetting()
		.then(setting => {
			//console.log('componentWillMount', setting)
			this.setState({
				setting: setting
			})
		})
	}

	getChildContext() {
		return {setting: this.state.setting};
	}

	render() {
		let {publisher} = this.state.setting

		return (
		  <App>
			<Switch>
				<Route exact path='/' component={HomePage2}/>
				<Route exact path='/stories/news' component={NewsPage} />
				<Route exact path='/stories/columns' component={AllColumn}/>
				<Route exact path='/stories/:columnSlug' component={ColumnPage}/>
				{/* STORY 1: FORMAT is 'NEWS' */ }
				<Route exact path='/stories/news/:storySlug/:sid' render={props => <StoryPage {...props} countView={true}/>} />
				{/* STORY 2: HAVE COLUMN */ }
				<Route exact path='/stories/:columnSlug/:storySlug/:sid' render={props => <StoryPage {...props} countView={true}/>} />

				<Route exact path='/about' component={AboutPage} />
				<Route exact path='/contact' component={ContactPage} />

				<Route exact path='/tags/:tagSlug' component={TagPage} />

				<Route exact path='/forget' component={ForgetPasswordPage} />
				<Route exact path='/signin' render={props => <SignInPage {...props} visible={true}/> } />
    			<Route exact path='/signup' render={props => <SignUpPage {...props} visible={true}/> } />
    			<Route exact path='/logout' render={props => {
    				auth.logout()
    				return <Redirect to={{
						pathname: '/'
					}} />
    			}} />

    			<Route path='/editor' component={PublisherEditor}/>

    			<Route exact path='/u/:uid' render={props => <UserStory {...props} uid={props.match.params.uid}/>} />
				{/* STORY 4 NO COLUMN AND NO USERNAME */ }
    			<Route exact path='/u/:uid/stories/:storySlug/:sid' render={props => <StoryPage {...props} countView={true}/>} />
				
				<Route exact path='/@:username' render={props => <UserStory {...props} username={props.match.params.username}/>}/>
				{/* STORY 3 NO COLUMN */ }
    			<Route exact path='/@:username/stories/:storySlug/:sid' render={props => <StoryPage {...props} countView={true}/>} />

				{/* <Route exact path='error' component={ErrorPage}/>
				<Route exact path='404' component={NotFoundPage}/>*/}
				<Route component={NotFound}/>
			</Switch>
	  	  </App>
	  	)
	}
}

AppRoutes.childContextTypes = {
  setting: PropTypes.object
};

export default AppRoutes
