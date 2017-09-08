import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import FontIcon from 'material-ui/FontIcon'
import {
	CollapseBlock,
	EditorAdvanced,
	EditorContent,
	EditorCover,
	EditorTags
} from '../../../components'

const Container = styled.div`
`

class EditorCollapse extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			select: -1,
			block: []
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentWillMount() {
		const { theme } = this.props
		let block = []

		block[0] = {
			header: {
				title: 'Content Setting',
				desc: null
			},
			body: <EditorContent theme={theme} />
		}

		block[1] = {
			header: {
				title: 'Cover Picture',
				desc: null
			},
			body: <EditorCover theme={theme} />
		}

		block[2] = {
			header: {
				title: 'Tags & Focus Keywords',
				desc: null
			},
			body: <EditorTags theme={theme} />
		}

		block[3] = {
			header: {
				title: 'Advanced Settings',
				desc: null
			},
			body: <EditorAdvanced theme={theme} />
		}

		this.setState({ block })
	}

	selectBlock = index => {
		let { select } = this.state
		select = select !== index ? index : -1

		this.setState({ select })
	}

	render() {
		const { select, block } = this.state

		return (
			<Container className="nunito-font">
				{block.map((val, index) => (
					<CollapseBlock
						key={index}
						header={val.header}
						select={() => this.selectBlock(index)}
						open={select === index ? true : false}
					>
						{val.body}
					</CollapseBlock>
				))}
			</Container>
		)
	}
}

export default EditorCollapse
