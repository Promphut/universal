import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import capitalize from 'lodash/capitalize'
import FontIcon from 'material-ui/FontIcon'
import api from '../../../services/api'
import { withRouter } from 'react-router'

import {
	CollapseBlock,
	EditorAdvanced,
	EditorContent,
	EditorCover,
	EditorTags
} from '../../../components'

const Container = styled.div`
	position: fixed;
`

class EditorCollapse extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			select: -1,
			showTags: null
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	componentDidMount() {
		const sid = this.props.match.params.sid ? this.props.match.params.sid : null

		if (sid) {
			api.getStoryTags(sid).then(tags => {
				let arrayTags = []

				tags.forEach(tag => {
					arrayTags.push(tag.name)
				})

				this.setShowTags(arrayTags)
			})
		}
	}

	selectBlock = index => {
		let { select } = this.state
		select = select !== index ? index : -1

		this.setState({ select })
	}

	setTags = tags => {
		let arrayTags = []

		tags.forEach(tag => {
			arrayTags.push(tag.text)
		})

		this.setShowTags(arrayTags)
	}

	setShowTags = tags => {
		let showTags = ''
		let index = 0

		tags.forEach(tag => {
			if (index !== 0) showTags += ', '
			showTags += tag

			index++
		})

		this.setState({ showTags })
	}

	render() {
		const {
			story,
			prevStory,
			menu,
			changeFormat,
			changeColumn,
			changeType,
			changeFocusWord,
			changeSlug,
			changeMetaTitle,
			changeMetaDesc
		} = this.props
		const { select, showTags } = this.state

		return (
			<Container className="nunito-font">
				<CollapseBlock
					title="Content Setting"
					desc={story.format ? capitalize(story.format) : null}
					select={() => this.selectBlock(0)}
					open={select === 0 ? true : false}
				>
					<EditorContent
						story={story}
						menu={menu}
						changeFormat={changeFormat}
						changeColumn={changeColumn}
						changeType={changeType}
					/>
				</CollapseBlock>

				<CollapseBlock
					title="Cover Picture"
					desc={null}
					select={() => this.selectBlock(1)}
					open={select === 1 ? true : false}
				>
					<EditorCover story={story} />
				</CollapseBlock>

				<CollapseBlock
					title="Tags & Focus Keywords"
					desc={showTags}
					select={() => this.selectBlock(2)}
					open={select === 2 ? true : false}
				>
					<EditorTags
						story={story}
						setTags={this.setTags}
						changeFocusWord={changeFocusWord}
					/>
				</CollapseBlock>

				<CollapseBlock
					title="Advanced Settings"
					desc={story.slug ? story.slug : null}
					select={() => this.selectBlock(3)}
					open={select === 3 ? true : false}
				>
					<EditorAdvanced
						story={story}
						prevStory={prevStory}
						changeSlug={changeSlug}
						changeMetaTitle={changeMetaTitle}
						changeMetaDesc={changeMetaDesc}
					/>
				</CollapseBlock>
			</Container>
		)
	}
}

export default withRouter(EditorCollapse)
