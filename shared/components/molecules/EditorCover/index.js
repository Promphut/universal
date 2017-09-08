import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { UploadPicture } from '../../../components'

const Container = styled.div`
`

const Text = styled.div`
	font-size: 12px;
	color: #8E8E8E;
	margin-top: 8px;
`

class EditorCover extends React.Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	render() {
		return (
			<Container>
				<Text>
					สามารถอัพโหลดได้ทั้งสำหรับ website และ mobile
				</Text>
			</Container>
		)
	}
}

export default EditorCover
