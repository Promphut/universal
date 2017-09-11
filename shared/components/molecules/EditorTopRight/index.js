import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import RaisedButton from 'material-ui/RaisedButton'
import api from '../../../services/api'
import config from '../../../config'

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
		// let s = {
		// 	publisher: parseInt(config.PID),
		// 	title,
		// 	highlight,
		// 	html,
		// 	focusWord,
		// 	format: columnList.find(col => col._id == column).name == 'news' ||
		// 		columnList.find(col => col._id == column).name == 'News'
		// 		? 'NEWS'
		// 		: 'ARTICLE',
		// 	meta: story.meta,
		// }
		// if (story.status == 0) {
		// 	s.status = 1
		// }
		// if (column) s.column = column
		// s.contentType = contentType
		// api
		// 	.updateStory(sid, s)
		// 	.then(story => {
		// 		this.props.history.push(story.url)
		// 	})
		// 	.catch(err => {
		// 		this.setState({
		// 			publishStatus: err.message,
		// 			open: false
		// 		})
		// 	})
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

export default EditorTopRight
