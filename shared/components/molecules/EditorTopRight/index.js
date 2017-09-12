import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import api from '../../../services/api'
import config from '../../../config'
import { withRouter } from 'react-router'

import { PrimaryButton, EditorDropdown } from '../../../components'

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
			platform: 'desktop'
		}
	}

	static contextTypes = {
		setting: PropTypes.object
	}

	publishStory = () => {
		let { story, content, setting, menu, notification } = this.props
		let s = {}

		s.publisher = story.publisher
		s.title = content.title ? content.title : story.title
		s.highlight = content.highlight ? content.highlight : story.highlight
		s.html = content.html ? content.html : story.html
		s.focusWord = setting.focusWord ? setting.focusWord : story.focusWord
		s.format = setting.format ? setting.format : story.format
		s.status = story.status === 0 ? 1 : story.status

		s.meta = { title: '', desc: '' }
		if (setting && setting.title) s.meta.title = setting.title
		else if (story.meta && story.meta.title) s.meta.title = story.meta.title
		else s.meta.title = ''

		if (setting && setting.desc) s.meta.desc = setting.desc
		else if (story.meta && story.meta.desc) s.meta.desc = story.meta.desc
		else s.meta.desc = ''

		if (s.format === 'NEWS') {
			s.column = menu.columns.find(col => col.name === 'news')._id
			s.contentType = 'NEWS'
		} else {
			s.column = setting.column ? setting.column : null
			s.contentType = setting.type ? setting.type : null
			s.contentType = s.contentType !== 'OTHER' ? s.contentType : null
		}

		if (!s.title || s.title === '') {
			notification('Story must have title before publishing.')
		} else if (!s.column) {
			notification('Story must have column before publishing.')
		} else {
			api
				.updateStory(story._id, s)
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

	toEditor = () => {
		this.setState({ mode: 'editor' })
	}

	toPreview = () => {
		this.setState({ mode: 'preview' })
	}

	changePlatform = platform => {
		this.setState({ platform })
	}

	render() {
		const { mode, platform } = this.state

		return (
			<Container>
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
							<EditorDropdown />
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
