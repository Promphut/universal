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
	position: fixed;
`

class EditorCollapse extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			select: -1
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	selectBlock = index => {
		let { select } = this.state
		select = select !== index ? index : -1

		this.setState({ select })
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
		const { select } = this.state

		return (
			<Container className="nunito-font">
				<CollapseBlock
					title="Content Setting"
					desc={null}
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
					desc={null}
					select={() => this.selectBlock(2)}
					open={select === 2 ? true : false}
				>
					<EditorTags story={story} changeFocusWord={changeFocusWord} />
				</CollapseBlock>

				<CollapseBlock
					title="Advanced Settings"
					desc={null}
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

export default EditorCollapse
