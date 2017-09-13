import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import api from '../../../services/api'
import config from '../../../config'
import { withRouter } from 'react-router'

import {
	PrimaryButton,
	EditorDropdown,
	ConfirmDialog
} from '../../../components'

const Container = styled.div`
    display: flex;
`

const Block = styled.div`
    display: inherit;
    align-items: center;
`

const Line = styled.div`
    display: inherit;
    align-items: center;
    background: #FFFFFF;
    height: 16px;
    width: 1px;
    margin: auto 20px;
`

const Preview = styled.div`
    font-weight: normal;
    cursor: pointer;
`

const PreviewText = styled.div`
    font-weight: normal;
    margin-right: 8px;
`

const PlatformText = styled.div`
    cursor: pointer;
    width: 100px;
    text-align: center;
    font-weight: normal;
`

const buttonStyle = {
	height: '30px',
	width: '130px',
	boxShadow: 'none',
	lineHeight: '30px'
}

const platformStyle = {
	height: '30px',
	width: '100px',
	boxShadow: 'none',
	lineHeight: '30px',
	cursor: 'pointer'
}

const labelStyle = {
	textTransform: 'none',
	fontWeight: 'normal',
	fontSize: '16px'
}

class EditorTopRight extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			mode: 'editor',
			platform: 'desktop',
			dialog: false
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	publishStory = () => {
		let { story, prevStory, menu, notification } = this.props

		story.status = story.status === 0 ? 1 : story.status

		const newsCol = menu.columns.find(col => col.name === 'news')._id
		if (story.format === 'NEWS') {
			story.column = newsCol
			story.contentType = 'NEWS'
		} else {
			if (
				story.column === newsCol ||
				(story.column && story.column._id === newsCol)
			)
				story.column = null
			story.contentType = story.contentType !== 'OTHER'
				? story.contentType
				: null
		}

		if (!story.meta.title) story.meta.title = prevStory.title
		if (!story.meta.desc) story.meta.desc = prevStory.desc

		if (!story.title || story.title === '') {
			notification('Story must have title before publishing.')
		} else if (!story.column || story.column === null) {
			notification('Story must have column before publishing.')
		} else {
			api
				.updateStory(story._id, story)
				.then(story => {
					this.props.history.push(story.url)
				})
				.catch(err => {
					notification(err.message)
				})
		}
	}

	unpublishStory = () => {
		const { story, saveStatus } = this.props

		api
			.updateStory(story._id, { status: 0 })
			.then(story => {
				saveStatus('Story has been unpublished.')
			})
			.catch(err => {
				notification(err.message)
			})
	}

	deleteStory = () => {
		const { story, saveStatus } = this.props

		api.deleteStory(story._id).then(() => {
			this.props.history.push('/me/stories')
		})
	}

	toEditor = () => {
		const { preview } = this.props

		this.setState({ mode: 'editor' }, () => {
			preview('editor')
		})
	}

	toPreview = () => {
		const { story, menu, saving, preview, notification } = this.props

		const newsCol = menu.columns.find(col => col.name === 'news')._id

		if (!story.title || story.title === '') {
			notification('Story must have title before preview.')
		} else if (
			!story.column ||
			story.column === null ||
			(story.format === 'ARTICLE' && story.column === newsCol)
		) {
			notification('Story must have column before preview.')
		} else if (saving) {
			notification('Saving...')
		} else {
			this.setState({ mode: 'preview' }, () => {
				preview('preview')
			})
		}
	}

	openDialog = () => {
		let { dialog } = this.state

		this.setState({ dialog: !dialog })
	}

	changePlatform = platform => {
		const { preview } = this.props

		this.setState({ platform }, () => {
			preview(null, platform)
		})
	}

	render() {
		const { mode, platform, dialog } = this.state

		return (
			<Container>
				<ConfirmDialog
					title="Delete this story?"
					description="Are you sure you want to delete this story?"
					onRequestClose={this.openDialog}
					open={dialog}
					action={this.deleteStory}
				/>

				<Block>
					{mode === 'editor'
						? <Preview onClick={mode === 'editor' ? this.toPreview : null}>
								Preview
							</Preview>
						: <PreviewText>
								Preview:
							</PreviewText>}
				</Block>

				{mode === 'editor'
					? null
					: platform === 'desktop'
							? <Block>
									<PrimaryButton
										label="Desktop"
										labelStyle={labelStyle}
										style={platformStyle}
									/>
									<PlatformText onClick={() => this.changePlatform('mobile')}>
										Mobile
									</PlatformText>
								</Block>
							: <Block>
									<PlatformText onClick={() => this.changePlatform('desktop')}>
										Desktop
									</PlatformText>
									<PrimaryButton
										label="Mobile"
										labelStyle={labelStyle}
										style={platformStyle}
									/>
								</Block>}
				<Line />

				{mode === 'editor'
					? <Block>
							<PrimaryButton
								label="Publish"
								labelStyle={{ textTransform: 'none' }}
								style={buttonStyle}
								onClick={this.publishStory}
							/>
							<EditorDropdown
								unpublishStory={this.unpublishStory}
								deleteStory={this.openDialog}
							/>
						</Block>
					: <Block>
							<RaisedButton
								label="Back to Editor"
								labelColor={'#FFFFFF'}
								labelStyle={{ textTransform: 'none' }}
								onClick={this.toEditor}
								style={{
									background: 'none'
								}}
								buttonStyle={{
									height: '30px',
									width: '153px',
									lineHeight: '26px',
									background: 'none',
									border: '1px solid #FFFFFF',
									borderRadius: '20px'
								}}
							/>
						</Block>}
				<Line />
			</Container>
		)
	}
}

export default withRouter(EditorTopRight)
