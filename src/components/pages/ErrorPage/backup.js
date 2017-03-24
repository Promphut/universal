import React from 'react'
import { NotFoundPage } from 'components'

const ErrorPage = React.createClass({
	getInitialState(){
		return {}
	},

	render() {
		//let err = this.props.error || this.props.params.error
		let {location, error} = this.props
		let err = location.state && location.state.error ? location.state.error : error
		//console.log('ERR', err, this)
		if(err && err.statusCode == 404){
			return (<NotFoundPage error={{err}}/>)
		} else {
			return (
				<div>
					<h1>Error</h1>
					<div>{err && err.message ? err.message : ''}</div>
				</div>
			)
		}
	}
})

export default ErrorPage;
