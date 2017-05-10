import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Link } from 'react-router-dom'
import api from 'components/api'
import App from 'components/App'
import { HomePage2, NewsPage, AllColumn, AboutPage, ContactPage } from 'components'

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

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)


// const AppRoutes = () => (
//   <App>
//     <Switch>
//       <Route exact path="/" component={HomePage}/>
//       <Route component={NoMatch}/>
//     </Switch>
//   </App>
// )

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

	  	      <Route exact path='/about' component={AboutPage} />
	  	      <Route exact path='/contact' component={ContactPage} />

	  	      <Route path='/topics' component={Topics}/>
	  	      <Route component={NotFound}/>
	  	    </Switch>
	  	  </App>
	  	)
		// return (
		//   <App>
		//   	<div>
		// 	  	<ul>
		// 			<li><Link to="/">Home</Link></li>
		// 			<li><Link to="/topics">Topics</Link></li>
		// 			<li><Link to="/nomatch">NoMatch</Link></li>
		// 		</ul>

		// 		<hr/>

		//   	    <Switch>
		//   	      <Route exact path="/" component={HomePage}/>
		//   	      <Route path="/topics" component={Topics}/>
		//   	      <Route component={NotFound}/>
		//   	    </Switch>
		//   	</div>
	 //  	  </App>
	 //  	)
	}
}

AppRoutes.childContextTypes = {
  setting: PropTypes.object
};

export default AppRoutes
