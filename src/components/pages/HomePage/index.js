// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import PropTypes from 'prop-types'

// const HomePage = () => {
//   return (
//     <h2>Hello World</h2>
//   )
// }
class HomePage extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)
	}

	render(){
		let setting = this.context.setting
		//console.log('setting', setting)
		
		return (
			<h2>Hello World</h2>
		)
	}
}

export default HomePage
