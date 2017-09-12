import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'

import { Dropdown } from '../../../components'

const DropdownMenu = styled.div`
`

const Line = styled.div`
	background: #C4C4C4;
	width: 162px;
	height: 1px;
	margin: auto;
`

const arrowDown = {
	color: '#FFFFFF',
	fontSize: '16px',
	marginLeft: '8px',
	cursor: 'pointer',
	marginTop: '6px'
}

const labelStyle = {
	fontFamily: "'Nunito', 'Mitr'",
	fontWeight: 'bold',
	fontSize: '14px',
	color: '#222222',
	textTransform: 'none'
}

class EditorDropdown extends React.Component {
	static contextTypes = {
		setting: PropTypes.object
	}

	constructor(props) {
		super(props)

		this.state = {}
	}

	render() {
		const { unpublishStory, deleteStory } = this.props

		const buttonDropdown = (
			<FontIcon className="material-icons" style={arrowDown}>
				keyboard_arrow_down
			</FontIcon>
		)

		return (
			<Dropdown
				button={buttonDropdown}
				margin="16px 0px 0px -150px"
				boxShadow={true}
			>
				<DropdownMenu>
					<FlatButton
						label="Unpublished"
						labelStyle={labelStyle}
						style={{
							width: '186px',
							textAlign: 'left',
							display: 'inline-block',
							marginTop: '8px'
						}}
						onClick={unpublishStory}
					/>
					<Line />
					<FlatButton
						label="Delete the story"
						labelStyle={labelStyle}
						style={{
							width: '186px',
							textAlign: 'left',
							display: 'inline-block',
							marginBottom: '8px'
						}}
						onClick={deleteStory}
					/>
				</DropdownMenu>
			</Dropdown>
		)
	}
}

export default EditorDropdown
