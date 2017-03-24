import React from 'react'
import {ErrorAndNotFound} from 'components'

const NotFoundPage = React.createClass({
  render() {
    return (
    	<ErrorAndNotFound
				errorNumber="404"
			>
				Sorry, we couldn’t find the page you’re looking for.
    	</ErrorAndNotFound>
		)
  }
})

export default NotFoundPage;
