import React from 'react'
import {ErrorAndNotFound} from 'components'
import {Link} from 'react-router'

const NotFoundPage = React.createClass({
  render() {
    return (
    	<ErrorAndNotFound
				errorNumber="Something went wrong"
        smallSize={true}
			>
				We have an internal server error. <Link to="/">Try again?</Link>
    	</ErrorAndNotFound>
		)
  }
})

export default NotFoundPage;
